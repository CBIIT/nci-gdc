<?php declare(strict_types = 1);

namespace Drupal\gdc_chart\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Returns responses for gdc_chart routes.
 */
final class GdcChartController extends ControllerBase {

  /**
   * Builds the response.
   */
  public function __invoke(): array {
    //$build['#attached']['library'][] = 'gdc_chart/chartjs';
    $build['content'] = [
      '#type' => 'item',
      '#markup' => $this->t('It works!'),
      '#theme' => 'gdc_chart',
    ];

    return $build;
  }

}
