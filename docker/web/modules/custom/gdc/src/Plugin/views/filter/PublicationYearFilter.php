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
class PublicationYearFilter extends InOperator
{
    /**
     * {@inheritdoc}
     */
    public function query()
    {
        // Ensure that the filter is not using the default operator.
        $configuration = [
            "table" => "node__field_date",
            "field" => "entity_id",
            "left_table" => "node_field_data",
            "left_field" => "nid",
            "operator" => "=",
        ];
        $this->ensureMyTable();
        $table_alias = "node__field_date";
        $join = Views::pluginManager("join")->createInstance(
            "standard",
            $configuration
        );
        $this->query->addRelationship(
            "node__field_date",
            $join,
            "node_field_data"
        );
        $years = $this->value;
        $years = array_map(function ($value) {
            return "'" . $value . "'";
        }, $years);
        $years = implode(",", $years);

        //$this->query->addWhere('AND', 'FROM_UNIXTIME(node__field_date.field_date_value),"%Y")', $this->value, 'IN');
        $this->query->addWhereExpression(
            $this->options["group"],
            "DATE_FORMAT(FROM_UNIXTIME($table_alias.field_date_value), '%Y') IN ($years)"
        );
    }

    /**
     * Get the value options for the dropdown.
     */
    public function getValueOptions()
    {
        // Get the value of the 'field_date' filter from the request.
        $this->valueOptions = [];
        $query =
            "SELECT DISTINCT(DATE_FORMAT(FROM_UNIXTIME(field_date_value),'%Y')) as publication_year FROM node__field_date where bundle='publication' order by publication_year desc";
        //$query = "SELECT DISTINCT(field_bob_value) as publication_year FROM node__field_bob where bundle='publication' order by publication_year desc";

        $result = \Drupal::database()->query($query);
        $years = [];

        foreach ($result as $row) {
            $year = $row->publication_year;

            $this->valueOptions[$year] = $year;
        }
        return $this->valueOptions;
    }

    public function buildExposeForm(&$form, FormStateInterface $form_state) {
        parent::buildExposeForm($form, $form_state);
        $form['expose']['identifier'] = [
            '#type' => 'textfield',
            '#default_value' => 'field_date',
            '#title' => $this->t('Filter identifier'),
            '#size' => 40,
            '#description' => $this->t('This will appear in the URL after the ? to identify this filter. Cannot be blank. Only letters, digits and the dot ("."), hyphen ("-"), underscore ("_"), and tilde ("~") characters are allowed.'),
        ];
    }
}

