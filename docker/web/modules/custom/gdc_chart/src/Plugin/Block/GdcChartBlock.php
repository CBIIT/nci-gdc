<?php

namespace Drupal\gdc_chart\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a custom block.
 *
 * @Block(
 *   id = "gdc_chart_block",
 *   admin_label = @Translation("GDC Chart"),
 * )
 */
class GdcChartBlock extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#theme' => 'chart_block',
      '#data' => ['age' => '31', 'DOB' => '2 May 2000'],
    ];
  }
}
