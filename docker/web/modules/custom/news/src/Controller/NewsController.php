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
    // Query for the News content type.
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
        $subject_tags[] = [
          'label' => $term->name,
          'target_id' => $term->tid,
        ];
      }
    }

    // Load the News nodes.
    $nodes = $this->entityTypeManager->getStorage('node')->loadMultiple($nids);

    // Create a render array using the custom Twig template.
    $output = [
      '#theme' => 'news_page',
      '#nodes' => $nodes,
      '#subject_tags' => $subject_tags,
    ];

    return $output;
  }
}

