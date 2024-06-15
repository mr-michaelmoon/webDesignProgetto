const numFrames = 32;
document.addEventListener('DOMContentLoaded', function() {

    var homepage = document.getElementById('homepage');
    var banner = document.getElementById('banner');
    var bannerAltezza = document.getElementById('bannerAltezza');
    var insiemeFramesBanner = document.getElementById('insiemeFramesBanner');
    var frameBanner = document.getElementsByClassName('frameBanner');
    var birdContainer = document.getElementById('birdContainer');
    var bird = document.getElementById('uccelloSeduto');
    var testo1 = document.getElementById('testo1');
    var menu = document.getElementById('menu');
    var viewportHeight = window.innerHeight;
    var viewportWidth = window.innerWidth;
    banner.style.height = window.screen.height + "px";
    banner.style.width = window.screen.width + "px";
    homepage.style.width = window.screen.width + "px";

    // creazione frame delle immagini del banner 
    for(var i = 2; i< numFrames; i++) {
        insiemeFramesBanner.innerHTML += "<div class='frameBanner'><img draggable='false' src='images/framesBanner/frame-" + i + ".png' /></div>";
        
    }
    

    window.onload = function() {
        var bannerWidth = banner.offsetWidth;
        bannerAltezza.style.height = numFrames * viewportWidth  + "px";
        birdContainer.style.width = window.screen.width + "px";
    }

    window.onresize = function() {
        var bannerWidth = banner.offsetWidth;
        bannerAltezza.style.height = bannerWidth + "px";
    }


    
    document.addEventListener('scroll', function(e) {
        var homepageBounding = homepage.getBoundingClientRect();
        var bannerBounding = banner.getBoundingClientRect();


        if(isInTheViewport(testo1) && !testo1.style.animation.includes("fadeIn")) {
            testo1.style.animation = "none";
            setTimeout(function() {
                testo1.style.animation = "fadeIn 2s forwards";
            }, 0);
        }

        if(testo1.getBoundingClientRect().bottom >= viewportHeight && !testo1.style.animation.includes("fadeOut")) {
            testo1.style.animation = "none";
            setTimeout(function() {
                testo1.style.animation = "fadeOut 2s forwards";
            }, 0);
        }


    
    });
});

function isInTheViewport(element) {
    return element.getBoundingClientRect().top >= 0 && element.getBoundingClientRect().bottom <= window.innerHeight;
}