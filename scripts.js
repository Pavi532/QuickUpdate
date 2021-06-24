
function disableTile(activeTiles){ // Disables last tile
    $(".owl-item.active").eq(activeTiles-1).find('.quick-update-tile').addClass('tile-disabled');
}

$(document).ready(function(){
    var qpTiles = $("#qpTiles");
    qpTiles.on('initialized.owl.carousel').find(".quick-update-tile").eq(0).addClass("current-tile");
    $('.owl-carousel').owlCarousel({
        loop:false,
        items: 20,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        nav:true,
        navText : ['<i class="bi bi-arrow-left-circle-fill" aria-hidden="true"></i>','<i class="bi bi-arrow-right-circle-fill" aria-hidden="true"></i>'],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:4
            },
            1000:{
                items:8
            }
        }
    });

    $(function() {  
        $(".card-div").niceScroll({horizrailenabled: false});
    });

    var grid = $('.qpCard-main').masonry({
        itemSelector: '.card',
        columnWidth: 650,
        gutter: 1,
        horizontalOrder: true
    });



});

window.onload = function(){
    var activeTiles = $(".owl-item.active").length;
    var totalTiles = $(".owl-item").length;

    if(activeTiles != totalTiles){
        disableTile(activeTiles);
    }
    $(".owl-next").on('click', function(){
        if($(".tile-disabled").length){
            $(".owl-item.active").each(function(){
                if($(this).children('.quick-update-tile').hasClass('tile-disabled')){
                    $(this).children('.quick-update-tile').removeClass('tile-disabled');
                    disableTile(1);// Disable 1st Tile
                }
                if(!$('.owl-next').hasClass('disabled')){
                    disableTile(activeTiles);
                }
                
            });
        }
    });

    $(".owl-prev").on('click', function(){
        if($(".tile-disabled").length){
            $(".owl-item.active").each(function(){
                if($(this).children('.quick-update-tile').hasClass('tile-disabled')){
                    $(this).children('.quick-update-tile').removeClass('tile-disabled');
                }
                disableTile(activeTiles);
            });
        }
    });
}

