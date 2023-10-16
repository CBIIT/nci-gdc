/**
* @file
* Placeholder file for custom sub-theme behaviors.
*
*/

(function ($, Drupal) {
  // Function to add record count to form //
  function addRecordCountToForm() {
    $('#communityToolRecordCount')[0].innerHTML=$('.communityToolRecordCount').text();
  }


  // Function to change form to grid //
  function changeFormToGrid() {
    $('#views-exposed-form-community-tools-page-1').css(
        {"display":"grid"}
    );   
    $('#views-exposed-form-community-tools-page-1').show();
  }

  $(document).ready(function () {
    changeFormToGrid();
    // Show specific form
    addRecordCountToForm();
  });

})(jQuery, Drupal);

