
document.addEventListener('DOMContentLoaded', function() {

    var homepage = document.getElementById('homepage');
    var banner = document.getElementById('banner');
    var insiemeFramesBanner = document.getElementById('insiemeFramesBanner');
    var testo1 = document.getElementById('testo1');
    var menu = document.getElementById('menu');
    var viewportHeight = window.innerHeight;
    banner.style.height = window.screen.height + "px";
    banner.style.width = window.screen.width + "px";
    homepage.style.width = window.screen.width + "px";

    // creazione frame delle immagini del banner 
    for(var i = 2; i< 32; i++) {
        insiemeFramesBanner.innerHTML += "<div class='frameBanner'><img src='images/framesBanner/frame-" + i + ".png' /></div>";
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