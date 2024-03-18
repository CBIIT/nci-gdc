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
	$.addGDCAppListener();
    	})      
     }
  }

$.setActiveTabOnMainMenu = function(e) {
  var activeMenu = $("#breadcrumbs").data("active-menu");
}

$.addGDCAppListener = function() {
  $(document).ready(function () {
  $(".pullout").click(function () {
    $(".panel.callout").toggle();
    $(".panel.callout").css('display','grid');
    event.stopPropagation();
  });
  $("html").click(function () {
    $(".panel.callout").hide();
  });
  $(".panel").click(function () {
    event.stopPropagation();
  });
  });
}


})(jQuery, Drupal);
