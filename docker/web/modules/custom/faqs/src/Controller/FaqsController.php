<?php

namespace Drupal\faqs\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;

class FaqsController extends ControllerBase {

  protected $entityTypeManager;

  public function __construct(EntityTypeManagerInterface $entityTypeManager) {
    $this->entityTypeManager = $entityTypeManager;
  }

  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('entity_type.manager')
    );
  }

  public function faqPage() {
    // Query for the FAQ content type.
    $query = $this->entityTypeManager->getStorage('node')
      ->getQuery()
      ->condition('type', 'faq')
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

    // Load the FAQ nodes.
    $nodes = $this->entityTypeManager->getStorage('node')->loadMultiple($nids);

    // Create a render array using the custom Twig template.
    $output = [
      '#theme' => 'faqs_page',
      '#nodes' => $nodes,
      '#subject_tags' => $subject_tags,
    ];

    return $output;
  }
}

