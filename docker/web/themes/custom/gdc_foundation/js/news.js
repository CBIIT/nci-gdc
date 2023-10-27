/**
* @file
* Placeholder file for custom sub-theme behaviors.
*
*/

(function ($, Drupal) {
  function initializeSumoSelectForMultipleSelects() {
    $('select').each(function (index, select) {
        var id = $(select).attr('id');
        var label = $(select).prev('label');
        var labelText = $(label).text();
        $(label).hide();
        $('#' + id).SumoSelect({ placeholder: '-- Select a ' + labelText + ' --' });
      });
  }

  $(document).ready(function () {
    //initializeSumoSelectForMultipleSelects();
});
})(jQuery, Drupal);

