<?php

namespace Drupal\gdc\Plugin\views\filter;

use Drupal\views\Plugin\views\filter\InOperator;

/**
 * @ViewsFilter("ai_marketplace_year_filter")
 */
class AiMarketplaceYearFilter extends InOperator {

  public function getValueOptions() {

    if (isset($this->valueOptions)) {
      return $this->valueOptions;
    }

    $this->valueOptions = [];

    $query = \Drupal::database()->select('node__field_year', 'fy');
    $query->addField('fy', 'field_year_value', 'year');
    $query->condition('fy.bundle', 'ai_marketplace_item');
    $query->distinct();
    $query->orderBy('year', 'DESC');

    foreach ($query->execute() as $row) {
      $this->valueOptions[$row->year] = $row->year;
    }

    return $this->valueOptions;
  }

}
