/**
* @file
* Placeholder file for custom sub-theme behaviors.
*
*/

(function ($, Drupal) {
  // Function to initialize SumoSelect for multiple selects
  function initializeSumoSelectForMultipleSelects() {
    $('select').each(function (index, select) {
        var id = $(select).attr('id');
        var label = $(select).prev('label');
        var labelText = $(label).text();
        // $(label).hide();
        // $('#' + id).SumoSelect({ placeholder: '-- Select a ' + labelText + ' --' });
      });
  }

  // Function to handle click event on select elements
  function handleSelectClick(e) {
    var selected = [];
    if (e.currentTarget.multiple) {
      options = e.currentTarget.options;
      $(options).each(function (index, option) {
        if (option.selected) {
          selected.push(option.value);
        }
      });
    }
  }

  // Function to add record count to form //
  function addRecordCountToForm() {
    console.log('test');
    $('#publicationRecordCount')[0].innerHTML=$('.publicationRecordCount').text();
  }

  // Function to modify publication group elements
  function modifyPublicationGroups() {
    var url = window.location.origin + window.location.pathname + '?field_pub_cat_tags_target_id[]=';
    var ul_list = $('.accordion.publication');
    var publication_groups = $('.publicationGroupTitle');
    publication_groups.each(function (index, group) {
      var $group = $(group);
      var publicationGroupCategory = $(ul_list[index]).find('li div div div.publicationGroupCategory')[0];
      var category = publicationGroupCategory.textContent.replaceAll('\n', '').split('|');
      var link = encodeURI(url + category[0]);
      group.innerHTML = '<div class="publicationCategoryTag"><a href="' + link + '">' + category[1] + '</a></div>' + group.innerHTML;
    });
  }

  // Function to change form to grid //
  function changeFormToGrid() {
    $('#views-exposed-form-publication-group-page-1').css(
        {"display":"grid"},
        {'grid-template-areas':'"header header header" "keywords keywords keywords" "programfilter projectfilter yearfilter" "buttons buttons buttons" "recordcount summary sort";"'},
        {"grid-template-column":"33% 33% 33%"},
        {"border":"1px solid #000"},
        {"padding":"10px"}
    );
    $('#views-exposed-form-publication-group-page-1').show();
  }

  $(document).ready(function () {
    // Initialize SumoSelect for multiple selects
    initializeSumoSelectForMultipleSelects();
    changeFormToGrid();
    // Show specific form
    addRecordCountToForm();
    // Handle click event on select elements
    $('select').click(handleSelectClick);
    
    // check if url has key keys //
    keyValue=location.search.indexOf('keys');
    if (keyValue>-1) {
      targetElement=$('#scrollTop');
      $('html, body').animate({
          scrollTop: targetElement.offset().top
        }, 1000);
      };
    // Modify publication group elements
    modifyPublicationGroups();
  });

})(jQuery, Drupal);

