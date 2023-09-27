<?php

namespace Drupal\gdc\Plugin\views\field;

use Drupal\views\Plugin\views\field\FieldPluginBase;
use Drupal\views\ResultRow;
use Drupal\Core\Datetime\DrupalDateTime;

/**
 * A blank plugin used as a starting place for a live demo.
 *
 * @ViewsField("publication_year_field")
 */
class PublicationYearField extends FieldPluginBase {
  public function query() { }

  public function render(ResultRow $values) {
  $entity = $values->_entity;
  $field = 'field_date';
  if(!$entity->hasField($field) || $entity->get($field)->isEmpty()) {
      return 'something';
    }
  $date_field = $entity->get($field)->getString();           
  $datetime = new DrupalDateTime();
  $datetime->setTimestamp($date_field);

  $year = $datetime->format('Y');
  return $year;

  }
}
