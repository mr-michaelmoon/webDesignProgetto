
document.addEventListener('DOMContentLoaded', function() {

    var homepage = document.getElementById('homepage');
    var banner = document.getElementById('banner');
    var testo1 = document.getElementById('testo1');
    var menu = document.getElementById('menu');
    var viewportHeight = window.innerHeight;
    
    document.addEventListener('scroll', function(e) {
        var homepageBounding = homepage.getBoundingClientRect();
        var bannerBounding = banner.getBoundingClientRect();


        if(isInTheViewport(testo1)) {
            testo1.style.animation = "fadeIn 3s forwards";
        }
        if(testo1.getBoundingClientRect().bottom >= viewportHeight) {
            testo1.style.animation = "fadeOut 3s forwards";
        }


    
    });
});

function isInTheViewport(element) {
    return element.getBoundingClientRect().top >= 0 && element.getBoundingClientRect().bottom <= window.innerHeight;
}