
document.addEventListener('DOMContentLoaded', function() {

    var homepage = document.getElementById('homepage');
    var banner = document.getElementById('banner');
    var testo1 = document.getElementById('testo1');

    document.addEventListener('scroll', function(e) {
        var homepageBounding = homepage.getBoundingClientRect();
        var bannerBounding = banner.getBoundingClientRect();


        if(bannerBounding.top <= 0) {
            testo1.style.animation = "fadeIn 2s forwards";
        }
    
    });
});