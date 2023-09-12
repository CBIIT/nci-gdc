<?php

namespace Drupal\news\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;

class NewsController extends ControllerBase {

  protected $entityTypeManager;

  public function __construct(EntityTypeManagerInterface $entityTypeManager) {
    $this->entityTypeManager = $entityTypeManager;
  }

  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager')
    );
  }

  public function newsPage() {
    // Query for the FAQ content type.
    $query = $this->entityTypeManager->getStorage('node')
      ->getQuery()
      ->condition('type', 'page_news')
      ->sort('created', 'DESC')
      ->accessCheck(FALSE); // Disable access checking.

    $nids = $query->execute();

    // Load the vocabulary and subject tags.
    $vocabulary = $this->entityTypeManager->getStorage('taxonomy_vocabulary')->load('subject_tag');
    $subject_tags = [];

    if ($vocabulary) {
      // Load all terms from the 'subject_tag' vocabulary.
      $terms = $this->entityTypeManager->getStorage('taxonomy_term')->loadTree($vocabulary->id());

      // Extract the label and target_id for each term.
      foreach ($terms as $term) {
        $subject_tags[$term->tid] = [
          'label' => $term->name,
          'target_id' => $term->tid,
        ];
      }
    }

    // Load the FAQ nodes.
    $nodes = $this->entityTypeManager->getStorage('node')->loadMultiple($nids);
    $temp_terms = [];

    // Create an array to keep track of which tags are used.
    $used_tags = [];

    // Loop through nodes and collect their subject tags.
    foreach ($nodes as $node) {
      // Load subject tags (assuming the field name is 'field_subject_tag').
      $subject_tags_for_node = $node->field_subject_tag->referencedEntities();

      // Loop through subject tags for the current node.
      foreach ($subject_tags_for_node as $subject_tag) {
        $tid = $subject_tag->id();
        $used_tags[$tid] = true; // Mark the tag as used.
      }
    }

    // Filter out unused subject tags.
    $subject_tags = array_intersect_key($subject_tags, $used_tags);

    // Create a render array using the custom Twig template.
    $output = [
      '#theme' => 'news_page',
      '#nodes' => $nodes,
      '#subject_tags' => $subject_tags,
      '#temp_tags' => $subject_tags,
    ];

    return $output;
  }
}

