const numFrames = 32;
let lastScrollTop = 0;
let scrollDirection = 0;

document.addEventListener('DOMContentLoaded', function () {

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
    createFramesBanner(insiemeFramesBanner)

    menu.style.opacity = "0";

    //si attiva quando si ricarica la pagina
    window.onload = function () {
        viewportWidth = window.innerWidth;
        bannerContainer.style.height = (numFrames - 2) * window.screen.width - viewportWidth + "px";
        birdContainer.style.width = window.screen.width + "px";
        menuAnimation(bird.getBoundingClientRect().top, menu, viewportHeight)
    }
    //si attiva quando si modifica la dimensione della finestra
    window.onresize = function () {
        viewportWidth = window.innerWidth;
        var vh = Math.abs(viewportHeight - window.innerHeight); // calcolo differenza tra viewportHeight vecchio e quello nuovo
        // window.alert();
        bannerContainer.style.height = (numFrames - 2) * window.screen.width - viewportWidth + vh + "px";
        birdContainer.style.width = window.screen.width + "px";
        banner.style.top = "50%";
            banner.style.transform = "translateY(-50%)";

    }


    document.addEventListener('scroll', function (e) {
        var homepageBounding = homepage.getBoundingClientRect();
        var bannerBounding = banner.getBoundingClientRect();
        var bannerContainerBounding = bannerContainer.getBoundingClientRect();
        var birdBounding = bird.getBoundingClientRect();
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        scrollDirection = scrollTop > lastScrollTop ? 1 : -1;

        //animazione del testo da correggere
        if (isInTheViewport(testo1) && !testo1.style.animation.includes("fadeIn")) {
            testo1.style.animation = "none";
            setTimeout(function () {
                testo1.style.animation = "fadeIn 1s forwards";
            }, 0);
        }

        if (testo1.getBoundingClientRect().bottom >= viewportHeight && !testo1.style.animation.includes("fadeOut")) {
            testo1.style.animation = "none";
            setTimeout(function () {
                testo1.style.animation = "fadeOut 1s forwards";
            }, 0);
        }



        if (birdBounding.top <= viewportHeight / 2) {
            if(banner.style.position != "fixed")
                banner.style.left = "0";
            
            banner.style.position = "fixed";
            
            banner.style.top = "50%";
            banner.style.transform = "translateY(-50%)";


            if (bannerContainerBounding.top >= 0) {
                banner.style.position = "relative";
                banner.style.left = "0";
                banner.style.top = "0";
                banner.style.transform = "translateY(0)";
            }

        }


        menuAnimation(birdBounding.top, menu, viewportHeight);

            horizontalScroll(bannerContainerBounding, banner, viewportHeight)

    });
});




function isInTheViewport(element) {
    return element.getBoundingClientRect().top >= 0 && element.getBoundingClientRect().bottom <= window.innerHeight;
}

function menuAnimation(birdBoundingT, menu, viewportHeight) {


    if (birdBoundingT > viewportHeight / 2 && menu.style.left >= 0) {
        menu.style.animation = "slide-out 1s forwards";
    } else {
        menu.style.opacity = "1";
        menu.style.animation = "slide-in 1s forwards";
    }
}

function createFramesBanner(insiemeFramesBanner) {
    for (var i = 2; i < numFrames; i++) {
        insiemeFramesBanner.innerHTML += "<div class='frameBanner'><img draggable='false' src='images/framesBanner/frame-" + i + ".png' /></div>";
    }
}

function horizontalScroll(bannerContainerBounding, banner, viewportHeight) {
    if (bannerContainerBounding.bottom >= viewportHeight && banner.style.position == "fixed") {
        banner.style.left = (bannerContainerBounding.top / (bannerContainer.offsetHeight - viewportHeight) * bannerContainer.offsetHeight) + "px";
        if(Math.abs(banner.style.left) >= bannerContainer.offsetHeight) {
            banner.style.left = bannerContainer.offsetHeight + "px";
        }
    }
}