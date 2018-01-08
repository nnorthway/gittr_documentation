$(document).ready(function() {
  var base_url = "http://localhost:8888/gittr_documentation";
  $(".sidenav").sidenav();
  $(".collapsible").collapsible();
  $("a[href^='#']").on('click', function() {
    var target = $(this).attr('href');
    var os = $(target).offset().top;
    var calc = os - 75;
    $("html, body").animate({
      scrollTop: calc
    })
  })
  $.each($("section"), function() {
    if ($(this).isInViewport()) {
      $("#section-title").text($(this).data('title'));
      var id = "#" + $(this).prop('id');
      $(".sidenav a").removeClass('active');
      $(".sidenav a[href='" + id + "']").addClass('active');
    }
  })
  $(window).on('scroll', function() {
    $.each($("section"), function() {
      if ($(this).isInViewport()) {
        $("#section-title").text($(this).data('title'));
        var id = "#" + $(this).prop('id');
        $(".sidenav a").parent().removeClass('active');
        $(".sidenav a[href='" + id + "']").parent().addClass('active');
      }
    })
  })
  $("#search").on('submit', function(e) {
    e.preventDefault();
    search();
  })
  $('.section-header').on('mouseover', function() {
    var after = "<i class='material-icons right'>link</i>";
    $(this).append(after);
  })
  $('.section-header').on('mouseleave', function() {
    $(this).find('i').remove();
  })
  var clip = new Clipboard('.section-header');
  clip.on('success', function() {
    M.toast({html: 'Link copied to clipboard'});
  })
  clip.on('error', function(e) {
    M.toast({html: e});
  })
  $('.section-header').on('click', function() {
    var target = $(this).parent().attr('id');
    var link = base_url + "#" + target;
    $(this).attr('data-clipboard-text', link);
  })

})

$.fn.isInViewport = function() {
  var elTop = $(this).offset().top;
  var elBottom = elTop + $(this).outerHeight() + ($(this).outerHeight() / 2);
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height() - ($(window).height() / 2);
  return elBottom > viewportTop && elTop < viewportBottom;
}

function search() {
  var term = $("#search_field").val();
  var h = new Hilitor("content");
  h.apply(term);
}
