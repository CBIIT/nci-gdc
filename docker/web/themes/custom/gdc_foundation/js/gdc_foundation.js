/**
 * @file
 * Placeholder file for custom sub-theme behaviors.
 *
 */
(function ($, Drupal) {

  /**
   * Use this behavior as a template for custom Javascript.
   */
  Drupal.behaviors.gdc_foundationBehavior = {
    attach: function (context, settings) {
    	once('gdc_foundationBehavior', 'html').forEach(function (element) {
      	$.setActiveTabOnMainMenu(element);
    	})      
     }
  }

$.setActiveTabOnMainMenu = function(e) {
  console.log("Read Breadcrumb and search titles on main menu");
  var activeMenu = $("#breadcrumbs").data("active-menu");
  console.dir(activeMenu);
  console.log("active-menu: ".activeMenu);
}
})(jQuery, Drupal);
