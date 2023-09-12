(function ($) {
  // Wait for the document to be ready
  $(document).ready(function () {
 console.log('test');
    // Function to parse URL parameters and check corresponding checkboxes
    function checkCheckboxesFromURLParam(paramName) {
      var urlParams = new URLSearchParams(window.location.search);
      var paramValues = urlParams.getAll(paramName);

      if (paramValues.length > 0) {
        paramValues.forEach(function (paramValue) {
          // Check the checkboxes with matching values
          $('input.term-filter[data-term="' + paramValue + '"]').prop('checked', true);

          // Trigger the change event for each checked checkbox
          $('input.term-filter[data-term="' + paramValue + '"]').trigger('change');
        });
      }
    }

    // Function to filter News based on selected checkboxes
    function filterNews() {
      // Get the values (data-term) of the selected checkboxes as integers
      var selectedValues = $('input.term-filter:checked').map(function () {
        return parseInt($(this).data('term'));
      }).get();
      console.log(selectedValues)
      // Hide all News items
      $('.news-container').hide();

      // Show News items that match any of the selected values
      if (selectedValues.length > 0) {
        $('.news-container').each(function () {
          var item = $(this);
          var tempTags = item.data('tags').toString();
          var tags = tempTags.split(',').map(function (tag) {
            return parseInt(tag.trim());
          });
          var match = false;
          for (var i = 0; i < tags.length; i++) {
            if (selectedValues.indexOf(tags[i]) !== -1) {
              match = true;
              break;
            }
          }
          if (match) {
            item.show();
          }
        });
      } else {
        // If no checkboxes are selected, show all News items
        $('.news-container').show();
      }
    }

    // Attach a change event handler to the checkboxes
    $('input.term-filter').on('change', filterNews);

    // Initial filtering when the page loads (if needed)
    filterNews();

    // Check checkboxes based on the 'subject_tag' URL parameter
    checkCheckboxesFromURLParam('subject_tag');
  });
})(jQuery);

