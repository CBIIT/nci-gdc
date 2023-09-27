/**
 * @file
 * Placeholder file for custom sub-theme behaviors.
 *
 */
(function ($, Drupal) {
$(document).ready
(           
  function()
  {
        console.log('test');
        var url = window.location.origin+window.location.pathname+'?field_pub_cat_tags_target_id[]=';                     
        var processedElements = {}; // Create an empty object to track processed elements.
        var ul_list = $('.accordion.publication');           
        var publication_groups = $('.publicationGroupTitle');
        publication_groups.each(function(index, group) {                                                         
              var $group = $(group);                                                                             
              var publicationGroupCategory = $(ul_list[index]).find('li div div div.publicationGroupCategory')[0]
              var category = publicationGroupCategory.textContent.replaceAll('\n','').split('|');
        link = encodeURI(url+category[0]);
        group.innerHTML = '<div class="publicationCategoryTag"><a href="'+link+'">'+category[1]+'</a></div>'+group.innerHTML
     
});
});
                   
})(jQuery, Drupal);
