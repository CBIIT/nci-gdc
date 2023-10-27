<?php declare(strict_types = 1);

namespace Drupal\gdc;

use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;
use Twig\TwigTest;

/**
 * Twig extension.
 */
final class GdcTwigExtension extends AbstractExtension {

  /**
   * {@inheritdoc}
   */
  public function getFunctions(): array {
    $functions[] = new TwigFunction(
      'view_url',
      static function (string $argument): string {
        $url = \Drupal::urlGenerator()->generate("view.$argument.page_1");
        return $url;
      },
    );
    return $functions;
  }

}

