<?php declare(strict_types = 1);

namespace Drupal\gdc_chart\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
/**
 * Returns responses for gdc_chart routes.
 */
final class GdcChartDataController extends ControllerBase {

  public function getDiseaseData() {
    // Load the current user's configuration.
    $config = $this->config('gdc_chart.settings');

    // Get the value of the textarea field.
    $diseaseData = $config->get('diseasedata');

    // Decode the JSON string.
    $decodedData = json_decode($diseaseData, true);

    // Return the decoded data as JSON.
    return new JsonResponse($decodedData);
  }

}
