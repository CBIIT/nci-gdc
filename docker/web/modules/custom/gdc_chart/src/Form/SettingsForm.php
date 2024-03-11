<?php declare(strict_types = 1);

namespace Drupal\gdc_chart\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Configure gdc_chart settings for this site.
 */
final class SettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'gdc_chart_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames(): array {
    return ['gdc_chart.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state): array {
    $form['diseasedata'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Disease Data (JSON)'),
      '#default_value' => $this->config('gdc_chart.settings')->get('diseasedata'),
    ];
    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state): void {
    parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $this->config('gdc_chart.settings')
      ->set('diseasedata', $form_state->getValue('diseasedata'))
      ->save();
    parent::submitForm($form, $form_state);
  }

}
