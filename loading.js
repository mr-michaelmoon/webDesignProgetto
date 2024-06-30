
$('body').append('<div style="" id="loadingDiv"><div class="loading"><img id="loadingBird" src="" /><h3 id="loadingText">Caricamento...</h3></div></div>');
$(document).ready(function () { 
	var images = ['images/loading/rondineGiu_.webp', 'images/loading/rondineSu_.webp'];
	var currentIndex = 0;

	// Imposta l'intervallo per alternare le immagini ogni 3 secondi (3000 millisecondi)
	const intervId = setInterval(function () {
		$('#loadingBird').attr('src', images[currentIndex]);
		currentIndex = (currentIndex + 1) % images.length;

		if (document.readyState === 'complete')
			clearInterval(intervId);
	}, 300);
});
$(window).on('load', function(){
	$('#loadingDiv').hide();
});
function removeLoader(){
	$("#loadingDiv").fadeOut(500, function() {
	// fadeOut complete. Remove the loading div
	$("#loadingDiv").remove(); //makes page more lightweight 
});
}