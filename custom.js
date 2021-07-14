$('.js-load-more').on('click', function(){
 var $this =$(this),
    totalPages = parseInt($('[data-all-pages]').val()),
    currentPage = parseInt($('[data-this-page]').val()),
    datacollurl = $('[data-coll-url]').val();;
 $this.attr('disabled', true);
 $this.find('[load-more-text]').addClass('hide');
 $this.find('[loader]').removeClass('hide');
 var nextUrl = $('[data-next-link]').val();
 var current_page_new = currentPage + 1;
 var next_coll = currentPage + 2;
 //alert(current_page_new)
 //return false;
 $.ajax({
  url: nextUrl,
  type: 'GET',
  dataType: 'html',
  success: function(responseHTML){
    $('[data-next-link]').val(datacollurl + "?page="+next_coll);
    $('[data-this-page]').val(current_page_new);
    $('.ProductList--removeMargin').append($(responseHTML).find('.ProductList--removeMargin').html());
  },
  complete: function() {
      if(current_page_new < totalPages) {
      $this.attr('disabled', false); $this.find('[load-more-text]').removeClass('hide'); $this.find('[loader]').addClass('hide');
      } 
      if(current_page_new >= totalPages) {
      $this.find('[load-more-text]').text('Products Finished').removeClass('hide'); $this.find('[loader]').addClass('hide');
      } 
    }
  })
});