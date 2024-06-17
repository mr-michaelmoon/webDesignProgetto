const numFrames = 33;
let lastScrollTop = 0;
var controllo = false;

document.addEventListener('DOMContentLoaded', function () {

    var homepage = document.getElementById('homepage');
    var banner = document.getElementById('banner');
    var bannerContainer = document.getElementById('bannerContainer');
    var insiemeFramesBanner = document.getElementById('insiemeFramesBanner');
    var frameBanner = document.getElementsByClassName('frameBanner');
    var sittingBirdContainer = document.getElementById('sittingBirdContainer');
    var sittingBirdEndContainer = document.getElementById('sittingBirdEndContainer');

    var sittingBird = document.getElementById('uccelloSeduto');
    var birdContainer = document.getElementById('birdContainer');
    var birdImgStory = document.getElementById('birdImgStory');
    // var testo1 = document.getElementById('testo1');
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
        bannerContainer.style.height = (numFrames - 2) * window.screen.width - viewportWidth - window.screen.width/3 + "px";
        sittingBirdContainer.style.width = window.screen.width + "px";
        sittingBirdEndContainer.style.width = window.screen.width + "px";

        menuAnimation(sittingBird.getBoundingClientRect().top, menu, viewportHeight);
        banner.style.width = bannerContainer.offsetHeight + viewportWidth + "px";
        
        window.requestAnimationFrame(() => {
            var bannerBounding = document.getElementById('banner').getBoundingClientRect();
            birdAnimation(bannerBounding.left, sittingBird, birdContainer, birdImgStory, viewportWidth)
        });
    }
    //si attiva quando si modifica la dimensione della finestra
    window.onresize = function () {
        viewportWidth = window.innerWidth;
        var vh = Math.abs(viewportHeight - window.innerHeight); // calcolo differenza tra viewportHeight vecchio e quello nuovo
        bannerContainer.style.height = (numFrames - 2) * window.screen.width - viewportWidth + vh - window.screen.width/3 + "px";
        sittingBirdContainer.style.width = window.screen.width + "px";
        sittingBirdEndContainer.style.width = window.screen.width + "px";
        banner.style.top = "50%";
        banner.style.transform = "translateY(-50%)";
        banner.style.width = bannerContainer.offsetHeight + viewportWidth + "px";

    }


    document.addEventListener('scroll', function (e) {
        var homepageBounding = homepage.getBoundingClientRect();
        var bannerBounding = banner.getBoundingClientRect();
        var bannerContainerBounding = bannerContainer.getBoundingClientRect();
        var sittingBirdBounding = sittingBird.getBoundingClientRect();
        

        //animazione del testo da correggere
        // if (isInTheViewport(testo1) && !testo1.style.animation.includes("fadeIn")) {
        //     testo1.style.animation = "none";
        //     setTimeout(function () {
        //         testo1.style.animation = "fadeIn 1s forwards";
        //     }, 0);
        // }

        // if (testo1.getBoundingClientRect().bottom >= viewportHeight && !testo1.style.animation.includes("fadeOut")) {
        //     testo1.style.animation = "none";
        //     setTimeout(function () {
        //         testo1.style.animation = "fadeOut 1s forwards";
        //     }, 0);
        // }


        if(bannerContainerBounding.top <= viewportHeight && bannerContainerBounding.bottom >= viewportHeight) {
            if (sittingBirdBounding.top <= viewportHeight / 2) {
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

            birdAnimation(bannerBounding.left, sittingBird, birdContainer, birdImgStory, viewportWidth);

        }

        menuAnimation(sittingBirdBounding.top, menu, viewportHeight);

        horizontalScroll(bannerContainerBounding, banner, viewportHeight)

    });
});



// funzioni -------------------------------------------------------
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

function birdAnimation(bannerBoundingLeft, sittingBird, birdContainer, birdImgStory, viewportWidth) {
    let halfViewportWidth = viewportWidth / 2;
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var birdImgStoryBounding = birdImgStory.getBoundingClientRect();
    var sittingBirdBounding = sittingBird.getBoundingClientRect();
    var bannerContainerBounding = document.getElementById('bannerContainer').getBoundingClientRect();
    if(sittingBird.getBoundingClientRect().left + (sittingBird.offsetWidth/2) < halfViewportWidth && bannerContainerBounding.bottom >= 0) {
        sittingBird.style.opacity = "0";
        birdContainer.style.display = "block";
        const value = 70; // quantita di scroll per cambiare uccello
        let bannerContainerDividedValue = bannerContainer.offsetHeight / value;

        //quando si ha scrollato per un tot di quantita e il primo tot non conta
        if( birdImgStoryBounding.right - birdImgStory.offsetWidth/2 <= birdContainer.offsetWidth/2 + birdContainer.offsetWidth/4) {
            birdImgStory.src = "images/rondine/rondineWebp/rondineAlzata.webp";
            controllo = true;
        } else {
            if(controllo) {
            birdImgStory.src = "images/rondine/rondineWebp/rondineAliSu.webp";
            controllo = false;
            }

            if(Math.abs(scrollTop - lastScrollTop) >= bannerContainerDividedValue ) {
            
                if(birdImgStory.src.includes("AliSu") || birdImgStory.src.includes("Alzata")) {
                    birdImgStory.src = "images/rondine/rondineWebp/rondineAliGiu.webp";
                } else {
                        birdImgStory.src = "images/rondine/rondineWebp/rondineAliSu.webp";
                }
                lastScrollTop = scrollTop;
            
            }

            let frames = document.getElementById('insiemeFramesBanner').querySelectorAll('img');
            let lastFrame = frames[frames.length - 1];
            let sittingBirdEndContainerBounding = document.getElementById('sittingBirdEndContainer').getBoundingClientRect();
            var sittingBirdEnd = document.getElementById('uccelloSedutoFine');
            var sittingBirdEndBounding = sittingBirdEnd.getBoundingClientRect();
            // if( birdImgStoryBounding.left <= sittingBirdEndBounding.left /*birdImgStoryBounding.right - birdImgStory.offsetWidth/2 >= lastFrame.getBoundingClientRect().left*/ ) {
            //     // birdImgStory.src = "images/rondine/rondineWebp/rondineSeduta.webp";
            //     birdImgStory.style.display = "none";
            //     sittingBirdEnd.style.opacity = "1";
            // } else {
            //     sittingBirdEnd.style.opacity = "0";
            //     birdImgStory.style.display = "block";
            // }
        }
        
    } else {
        sittingBird.style.opacity = "1";
        birdContainer.style.display = "none";
    }
}