const numFrames = 32;
let lastScrollTop = 0;
let scrollDirection = 0;

document.addEventListener('DOMContentLoaded', function() {

    var homepage = document.getElementById('homepage');
    var banner = document.getElementById('banner');
    var bannerContainer = document.getElementById('bannerContainer');
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
        bannerContainer.style.height = (numFrames-3) * viewportWidth  + "px"; 
        birdContainer.style.width = window.screen.width + "px";
    }

    window.onresize = function() {
        var bannerWidth = banner.offsetWidth;
        bannerContainer.style.height = numFrames * viewportWidth + "px";
        if(banner.style.position == "fixed") {

        }
    }

    
    document.addEventListener('scroll', function(e) {
        var homepageBounding = homepage.getBoundingClientRect();
        var bannerBounding = banner.getBoundingClientRect();
        var bannerContainerBounding = bannerContainer.getBoundingClientRect();
        var birdBounding = bird.getBoundingClientRect();
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        scrollDirection = scrollTop > lastScrollTop ? 1 : -1;


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
        
        if(birdBounding.top <= viewportHeight/2) {
            banner.style.position = "fixed";
            banner.style.top = "0";
            banner.style.left = "0";

            if(bannerContainerBounding.top >=0) {
                banner.style.position = "relative";
                banner.style.top = "0";
                banner.style.left = "0";
            }

            
        }
        
        if(bannerContainerBounding.bottom >= viewportHeight && banner.style.position == "fixed") {
            // banner.style.left = (bannerContainerBounding.top / (bannerContainer.offsetHeight - viewportHeight) * bannerContainer.offsetHeight) + "px";
            banner.style.left = (bannerContainerBounding.top / (bannerContainer.offsetHeight -viewportHeight) * bannerContainer.offsetHeight) + "px";
            // console.log(bannerContainerBounding.top + " " +  bannerContainer.offsetHeight +  " " + viewportHeight + " " + ((bannerContainerBounding.top / (bannerContainer.offsetHeight - viewportHeight)) * ((numFrames-2) * 100)));
        }
    
    });
});

function isInTheViewport(element) {
    return element.getBoundingClientRect().top >= 0 && element.getBoundingClientRect().bottom <= window.innerHeight;
}