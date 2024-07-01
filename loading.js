
$('body').append('<div style="" id="loadingDiv"><div class="loading"><img id="loadingBird" src="" /><h3 id="loadingText">Caricamento...</h3></div></div>');
$(document).ready(function () { 
	$('html').attr('style', 'overflow-y: hidden;');

	var images = ['images/loading/rondineGiu_.webp', 'images/loading/rondineSu_.webp'];
	var currentIndex = 0;
	$('#loadingBird').load('images/loading/rondineGiu_.webp #loadingBird');
	$('#loadingBird').load('images/loading/rondineSu_.webp #loadingBird');

	// Imposta l'intervallo per alternare le immagini ogni 3 secondi (3000 millisecondi)
	const intervId = setInterval(function () {
		$('#loadingBird').attr('src', images[currentIndex]);
		currentIndex = (currentIndex + 1) % images.length;

		if (document.readyState === 'complete')
			clearInterval(intervId);
	}, 600);
});
$(window).on('load', function(){
	$('#loadingDiv').hide();
	$('html').attr('style', 'overflow-y: scroll;');
});
function removeLoader(){
	$("#loadingDiv").fadeOut(500, function() {
	// fadeOut complete. Remove the loading div
	$("#loadingDiv").remove(); //makes page more lightweight 
});
}