<?php

namespace Drupal\gdc\Plugin\views\filter;

use Drupal\Core\Form\FormStateInterface;
use Drupal\views\Plugin\views\filter\InOperator;
use Drupal\views\Views;
use Drupal\views\ViewExecutable;

use Drupal\views\Plugin\views\display\DisplayPluginBase;

/**
 * Filter to display unique publication years in a dropdown.
 *
 * @ingroup views_filter_handlers
 *
 * @ViewsFilter("publication_year_filter")
 */
class PublicationYearFilter extends InOperator {

/**
 * {@inheritdoc}
 */

public function query() {
  // Ensure that the filter is not using the default operator.
  if (!$this->value || $this->operator == 'empty') {
    return;
  }

  // Get the selected year from the filter.
  $selected_year = $this->value;

  // Set the correct table alias.
  $table_alias = $this->tableAlias ?: $this->table;

  // Add the condition to the View's query with the correct table alias.
  $this->ensureMyTable();

  // Modify the addWhere statement to use DATE_FORMAT.
  $this->query->addWhere('AND', "DATE_FORMAT(FROM_UNIXTIME($table_alias.field_date_value), '%Y')", $selected_year, '=');
}
  public function getValueOptions() {
                                                   
  // Get the value of the 'field_date' filter from the request.
    $this->valueOptions = [];
    $query = "SELECT DISTINCT(DATE_FORMAT(FROM_UNIXTIME(field_date_value),'%Y')) as publication_year FROM node__field_date where bundle='publication' order by publication_year desc";
    //$query = "SELECT DISTINCT(field_bob_value) as publication_year FROM node__field_bob where bundle='publication' order by publication_year desc";

    $result = \Drupal::database()->query($query);
    $years = [];
    
    foreach($result as $row) {
      $year = $row->publication_year;

      $this->valueOptions[$year] = $year;

    }
    return $this->valueOptions;
  }



}
