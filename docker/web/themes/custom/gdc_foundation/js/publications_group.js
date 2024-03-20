/**
* @file
* Placeholder file for custom sub-theme behaviors.
*
*/

(function ($, Drupal) {
  
  function setControlledIcon() {
    // Find all elements containing the text "(Controlled)"
    var elementsWithTextControlled = $('*:contains("(Controlled)")');

    // Filter out elements that have no child elements
    var specificElements = elementsWithTextControlled.filter(function() {
      return $(this).children().length === 0;
    });

    // Iterate through specific elements and add <i class="fa-solid fa-lock"></i> after the text
    specificElements.each(function() {
      $(this).html(function(_, oldHtml) {
        return oldHtml.replace('(Controlled)', '(Controlled) <i class="fa-solid fa-lock"></i>');
      });
    });
  };
  $(document).ready(function () {
    setControlledIcon();
  });

})(jQuery, Drupal);

