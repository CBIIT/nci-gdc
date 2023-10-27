<?php

namespace Drupal\gdc\Plugin\views\filter;

use Drupal\Core\Form\FormStateInterface;
use Drupal\views\Plugin\views\filter\InOperator;
use Drupal\views\Views;
use Drupal\views\ViewExecutable;

use Drupal\views\Plugin\views\display\DisplayPluginBase;

/**
 * Filter to display community tool topis in a dropdown.
 *
 * @ingroup views_filter_handlers
 *
 * @ViewsFilter("community_tool_topic_filter")
 */
class CommunityToolTopicFilter extends InOperator
{
    /**
     * {@inheritdoc}
     */

     public function query()
     {
         // Ensure that the filter is not using the default operator.
         $configuration = [
             "table" => "node__field_topic_taxonomy",
             "field" => "entity_id",
             "left_table" => "node_field_data",
             "left_field" => "nid",
             "operator" => "=",
         ];
         $this->ensureMyTable();
         $table_alias = "node__field_topic_taxonomy";

         $join = Views::pluginManager("join")->createInstance(
             "standard",
             $configuration
         );
         $this->query->addRelationship(
             "node__field_topic_taxonomy",
             $join,
             "node_field_data"
         );
         $tags = $this->value;
         $tags = array_map(function ($value) {
             return "'" . $value . "'";
         }, $tags);
         $tags = implode(",", $tags);
         $this->query->addWhereExpression(
             $this->options["group"],
             "$table_alias.field_topic_taxonomy_target_id IN ($tags)"
         );
     }

    /**
     * Get the value options for the dropdown.
     */
    public function getValueOptions()
    {
        $query =
        "SELECT DISTINCT(a.field_topic_taxonomy_target_id),c.name
                FROM node__field_topic_taxonomy a,
					 node_field_data b,
					taxonomy_term_field_data c
				where a.entity_id=b.nid and b.status=1 and a.field_topic_taxonomy_target_id = c.tid
                order by c.name";

        $result = \Drupal::database()->query($query);
        $tags = [];

        foreach ($result as $row) {
            $id = $row->field_topic_taxonomy_target_id;
            $name = $row->name;
            $this->valueOptions[$id] = $name;
        }
        return $this->valueOptions;
    }

    public function buildExposeForm(&$form, FormStateInterface $form_state) {
        parent::buildExposeForm($form, $form_state);
        $form['expose']['identifier'] = [
            '#type' => 'textfield',
            '#default_value' => 'field_topic_taxonomy_id',
            '#title' => $this->t('Filter identifier'),
            '#size' => 40,
            '#description' => $this->t('This will appear in the URL after the ? to identify this filter. Cannot be blank. Only letters, digits and the dot ("."), hyphen ("-"), underscore ("_"), and tilde ("~") characters are allowed.'),
        ];

    }


}

