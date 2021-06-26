
function disableTile(activeTiles){ // Disables last tile
    $(".owl-item.active").eq(activeTiles-1).find('.quick-update-tile').addClass('tile-disabled');
}

function changeTrackStatusy(object, val, onTrackColour, monitorColour, offTrackColour ){
    if( val >= 50){     //  on track
        object.siblings('.rangeslider').children('.rangeslider__fill').css({'background-color': onTrackColour});
        object.parents('.card-body').find('.track-circle').removeClass('active');
        object.parents('.card-body').find('.green-circle').addClass('active');
    }else if(val >= 40){    //  monitor
        object.siblings('.rangeslider').children('.rangeslider__fill').css({'background-color': monitorColour});
        object.parents('.card-body').find('.track-circle').removeClass('active');
        object.parents('.card-body').find('.yellow-circle').addClass('active');
    } else{     //off track
        object.siblings('.rangeslider').children('.rangeslider__fill').css({'background-color': offTrackColour});
        object.parents('.card-body').find('.track-circle').removeClass('active');
        object.parents('.card-body').find('.red-circle').addClass('active');
    }
}

function expanCard(object, cardDivInitHieght, cardBodyDefaultHeight, cardBodyExpandedHeight){
    var cardDivNewHeight = $(window).height() * 0.99 - 259;
    if(object.attr('is-expanded') == "false"){
        object.addClass('card-toggle-rotate');
        object.parents('.card-header').siblings('.card-body').height(cardBodyExpandedHeight);
        $('.card-div').height(cardDivNewHeight);
        $(".card-div").getNiceScroll().resize();
        $(".qpCard-main").masonry('layout');
        object.attr('is-expanded','true');
    }else{
        object.removeClass('card-toggle-rotate');
        object.parents('.card-header').siblings('.card-body').height(cardBodyDefaultHeight);
        $('.card-div').height(cardDivNewHeight);
        $(".card-div").getNiceScroll().resize();
        $(".qpCard-main").masonry('layout');
        object.attr('is-expanded','false');
    }
}


$(document).ready(function(){

    let onTrackColour = getComputedStyle(document.documentElement,null).getPropertyValue('--green-circle');
    let monitorColour = getComputedStyle(document.documentElement,null).getPropertyValue('--yellow-circle');
    let offTrackColour = getComputedStyle(document.documentElement,null).getPropertyValue('--red-circle');

    var container= $('.qpCard-main');
    var cardDivInitHieght = $('.card-div').height();
    var cardBodyDefaultHeight = $('.card-body').height();
    var cardBodyExpandedHeight = 600;

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
    
    $('.card-toggle').on('click',function () {

        expanCard($(this), cardDivInitHieght, cardBodyDefaultHeight, cardBodyExpandedHeight);

        // if($(this).attr('is-expanded') == "false"){
        //     $(this).addClass('card-toggle-rotate');
        //     $(this).parents('.card-header').siblings('.card-body').height(cardBodyExpandedHeight);
        //     $('.card-div').height(cardDivInitHieght);
        //     $(".card-div").getNiceScroll().resize();
        //     $(".qpCard-main").masonry('layout');
        //     $(this).attr('is-expanded','true');
        // }else{
        //     $(this).removeClass('card-toggle-rotate');
        //     $(this).parents('.card-header').siblings('.card-body').height(cardBodyDefaultHeight);
        //     $('.card-div').height(cardDivInitHieght);
        //     $(".card-div").getNiceScroll().resize();
        //     $(".qpCard-main").masonry('layout');
        //     $(this).attr('is-expanded','false');
        // }
        
    });

    $('.track-slider').rangeslider({polyfill : false});

    $('.track-slider').on('input', function (e) {
        var targetValue = e.target.valueAsNumber;
        changeTrackStatusy($(this), targetValue, onTrackColour, monitorColour, offTrackColour);
        $(this).parent('.slider-div').siblings('.slider-value-div').children('.slider-value').val(targetValue);
    });

    $(".slider-value").on('input', function () {
        var targetValue = $(this).val();
        if(targetValue.length == 0){ //For Empty Inputs
            targetValue = 0;
        }
        if(Math.floor(targetValue) == targetValue && $.isNumeric(targetValue)) {
            changeTrackStatusy($(this), targetValue, onTrackColour, monitorColour, offTrackColour);
            $(this).parents('.card-body').find('.track-slider').val(targetValue).change();
        }
        
        
    });

    $('.date-input').datepicker({
        container: container
    });

    $('.comment-area').on('input',function(){
        var charCount = $(this).val().length;
        $(this).siblings('.char-counter').text(charCount);
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


