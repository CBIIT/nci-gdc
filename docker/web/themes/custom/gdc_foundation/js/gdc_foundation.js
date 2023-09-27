/**
 * @file
 * Placeholder file for custom sub-theme behaviors.
 *
 */
(function ($, Drupal) {

  /**
   * Use this behavior as a template for custom Javascript.
   */
  Drupal.behaviors.exampleBehavior = {
    attach: function (context, settings) {
      $.setActiveTabOnMainMenu();
    }
  };

$.setActiveTabOnMainMenu = function() {
  console.log("Read Breadcrumb and search titles on main menu");
  var activeMenu = $("#breadcrumbs").data("active-menu");
  console.log("active-menu: ".activeMenu);
}
})(jQuery, Drupal);
