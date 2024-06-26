const numFrames = 33;
let lastScrollTop = 0;
var controllo = false;
var firstTime = false;

document.addEventListener('DOMContentLoaded', function () {

    var homepage = document.getElementById('homepage');
    var banner = document.getElementById('banner');
    var bannerContainer = document.getElementById('bannerContainer');
    var insiemeFramesBanner = document.getElementById('insiemeFramesBanner');
    var sittingBirdContainer = document.getElementById('sittingBirdContainer');
    var sittingBirdEndContainer = document.getElementById('sittingBirdEndContainer');
    var sittingBird = document.getElementById('uccelloSeduto');
    var sittingBirdEnd = document.getElementById('uccelloSedutoFine');
    var birdContainer = document.getElementById('birdContainer');
    var birdImgStory = document.getElementById('birdImgStory');
    var menu = document.getElementById('menu');
    var viewportHeight = window.innerHeight;
    var viewportWidth = window.innerWidth;

    homepage.style.width = window.screen.width + "px";
    banner.style.width = window.screen.width + "px";
    banner.style.height = homepage.offsetHeight / 1.5 + "px";

    // creazione frame delle immagini del banner 
    createFramesBanner(insiemeFramesBanner);
    insertTextsFrame();
    menu.style.opacity = "0";


    //se in verticale mette width dell'immagine homepage a auto 
    homepage.querySelector('img').style.width = viewportHeight > viewportWidth ? "auto" : "100%";
    
    bannerContainer.style.height = calcTotalWidthFrames() - viewportWidth + "px";

    //si attiva quando si ricarica la pagina
    window.onload = function () {
        menuAnimation(sittingBird.getBoundingClientRect().top, menu, viewportHeight);
        birdAnimation(sittingBird, birdContainer, birdImgStory, viewportWidth);

        //richiama funzione onresize()
        window.onresize();
    }

    //si attiva quando si modifica la dimensione della finestra
    window.onresize = function () {
        viewportWidth = window.innerWidth;
        var vh = Math.abs(viewportHeight - window.innerHeight); // calcolo differenza tra viewportHeight vecchio e quello nuovo
        bannerContainer.style.height = calcTotalWidthFrames() - viewportWidth + vh + "px";
        var firstEl = insiemeFramesBanner.children[0].offsetWidth;
        sittingBirdContainer.style.width = firstEl + "px";
        sittingBirdEndContainer.style.width = firstEl + "px";
        banner.style.width = bannerContainer.offsetHeight + viewportWidth + "px";
        banner.style.height = homepage.offsetHeight / 1.5 + "px";
        birdImgStory.style.width = sittingBird.offsetWidth + "px";
        homepage.style.width = window.screen.width + "px";
    }

    document.addEventListener('scroll', function (e) {
        var bannerContainerBounding = bannerContainer.getBoundingClientRect();
        var sittingBirdBounding = sittingBird.getBoundingClientRect();
        var birdImgStoryBounding = birdImgStory.getBoundingClientRect();
        var sittingBirdEndBounding = sittingBirdEnd.getBoundingClientRect();

        //se si è nella storia (in bannerContainer)
        if (bannerContainerBounding.top <= viewportHeight && bannerContainerBounding.bottom >= viewportHeight) {

            if (sittingBirdBounding.top <= viewportHeight / 2) {
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
            
            birdAnimation(sittingBird, birdContainer, birdImgStory, viewportWidth);
        }
        if(bannerContainerBounding.bottom <= viewportHeight) {
            banner.style.position = "relative";
            banner.style.top = "100%";
            banner.style.transform = "translateY(-100%)";
        }


        let controlloBird = birdImgStoryBounding.left >= sittingBirdEndBounding.left || parseInt(bannerContainerBounding.bottom) <= window.innerHeight;
        birdImgStory.style.opacity = controlloBird ? "0" : "1";
        sittingBirdEnd.style.opacity = controlloBird ? "1" : "0";
            
        menuAnimation(sittingBirdBounding.top, menu, viewportHeight);
        horizontalScroll(bannerContainerBounding, banner, viewportHeight)

    });
});

// funzioni -------------------------------------------------------

function menuAnimation(birdBoundingT, menu, viewportHeight) {
    let ris = birdBoundingT > viewportHeight / 2 && menu.style.left >= 0;
    menu.style.animation = ris ? "slide-out 1s forwards" : "slide-in 1s forwards";
    menu.style.opacity = ris ? "" : "1";
}

function createFramesBanner(insiemeFramesBanner) {
    for (var i = 2; i < numFrames; i++)
        insiemeFramesBanner.innerHTML += "<div class='frameBanner'><img draggable='false' src='images/framesBanner/frame-" + i + ".png' alt='immagine di una parte dello sfondo della storia della rondine'></div>";
}

// inserisce i testi nei frame
function insertTextsFrame() {
    var frames = document.getElementById('insiemeFramesBanner').querySelectorAll('div');
    var texts = allTexts();
    addTexts(frames, texts);

}

function horizontalScroll(bannerContainerBounding, banner, viewportHeight) {
    if (bannerContainerBounding.bottom >= viewportHeight && banner.style.position == "fixed") {
        banner.style.left = (bannerContainerBounding.top / (bannerContainer.offsetHeight - viewportHeight) * bannerContainer.offsetHeight) + "px";
        if (Math.abs(banner.style.left) >= bannerContainer.offsetHeight) {
            banner.style.left = bannerContainer.offsetHeight + "px";
        }
    }
}
//animazione testo
function animationText(text, fadeType) {
    text.style.animation = fadeType + " 1s forwards";
}

function birdAnimation(sittingBird, birdContainer, birdImgStory, viewportWidth) {
    let halfViewportWidth = viewportWidth / 2;
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var birdImgStoryBounding = birdImgStory.getBoundingClientRect();
    var bannerContainer = document.getElementById('bannerContainer')
    var bannerContainerBounding = bannerContainer.getBoundingClientRect();

    //se ci si trova tra la meta dell'uccello seduto all'inizio e la fine della storia
    if (sittingBird.getBoundingClientRect().left + (sittingBird.offsetWidth / 2) + 5 < halfViewportWidth && bannerContainerBounding.bottom >= 0 && firstTime) {
        sittingBird.style.opacity = "0";
        birdContainer.style.display = "block";
        const value = 70; // quantita di scroll per cambiare uccello
        let bannerContainerDividedValue = bannerContainer.offsetHeight / value;

        //se rondine prende il volo, allora alzata, altrimenti è in volo
        if (birdImgStoryBounding.right - birdImgStory.offsetWidth / 2 <= sittingBird.getBoundingClientRect().right - sittingBird.offsetWidth / 4) {
            birdImgStory.src = "images/rondine/rondineAlzata.webp";
            controllo = true;

            //animazione di testo1
            animationText(document.getElementById('testo1'), "fadeIn");
        } else {
            if (controllo) {
                birdImgStory.src = "images/rondine/rondineAliSu.webp";
                controllo = false;
            }

            //se si scrolla per una certa quantità si fa il cambio di immagine
            if (Math.abs(scrollTop - lastScrollTop) >= bannerContainerDividedValue) {
                birdImgStory.src = birdImgStory.src.includes("AliSu") || birdImgStory.src.includes("Alzata") ? "images/rondine/rondineAliGiu.webp" : "images/rondine/rondineAliSu.webp";
                lastScrollTop = scrollTop;
            }

            var sittingBirdEnd = document.getElementById('uccelloSedutoFine');
            var sittingBirdEndBounding = sittingBirdEnd.getBoundingClientRect();
            var bannerContainerBounding = document.getElementById('bannerContainer').getBoundingClientRect();

            //rondine seduta se si trova sopra a rondine seduta fine nascosta o la storia finisce
            let controlloBird = birdImgStoryBounding.left >= sittingBirdEndBounding.left || parseInt(bannerContainerBounding.bottom) <= window.innerHeight;
            birdImgStory.style.opacity = controlloBird ? "0" : "1";
            sittingBirdEnd.style.opacity = controlloBird ? "1" : "0";
        }

    } else {
        sittingBird.style.opacity = "1";
        birdContainer.style.display = "none";
        animationText(document.getElementById('testo1'), "fadeOut");
    }
    firstTime = true;
}

//calcola la larghezza totale di tutti i frame della storia
function calcTotalWidthFrames() {
    var totalFramesWidth = 0;
    var frames = document.getElementById('insiemeFramesBanner').querySelectorAll('img');
    frames.forEach(function (frame) {
        totalFramesWidth += frame.width;
    });
    return totalFramesWidth;
}

//restituisce array con i testi della storia
function allTexts() {
    return ["Una rondine viveva felice in un piccolo nido in Kenya. <br>Ogni giorno, volava libera sotto il cielo azzurro, <br>sorvolando le verdi savane e i fiumi scintillanti. <br>Ma con l\'arrivo dell\'autunno, la rondine sent<span class='charSpecial'>ì</span> <br>un forte desiderio di partire per un lungo viaggio, <br>un viaggio che l\'avrebbe portata fino all\'Italia.",
        "Un mattino presto, la rondine spieg<span class='charSpecial'>ò</span> le ali <br>e inizi<span class='charSpecial'>ò</span> il suo volo verso nord.",
        "Il primo tratto del viaggio fu <br>piacevole e pieno di avventure,<br>ma presto arriv<span class='charSpecial'>ò</span> davanti a<br>una sfida imponente…",
        "…Il deserto del Sahara.",
        "La vastità del deserto era infinita e il sole bruciava alto nel cielo.",
        "\"Oh, cara rondine spero che tu abbia abbastanza <br>forza per attraversare questo deserto spietato.\"",
        "La rondine vol<span class='charSpecial'>ò</span> senza sosta, <br>sentendo il calore ardente sotto le sue ali.<br>La sabbia sembrava non finire mai,<br>ma la piccola rondine non si arrese.",
        "Beveva dalle rare oasi che incontrava <br>e riposava sugli arbusti sparsi qua e là.",
        "Dopo giorni e giorni di volo, finalmente vide all'orizzonte qualcosa di diverso!",
        "Il blu scintillante del Mar Mediterraneo.",
        "<span class='charSpecial'>\“</span>Ben fatto! Hai superato il Sahara! Ora ti aspetta un'altra sfida:<br>lo Stretto di Gibilterra.<span class='charSpecial'>\”</span>",
        "Lo Stretto di Gibilterra era un passaggio stretto e ventoso <br>che separava l'Africa dall'Europa. Le correnti erano forti <br>e la rondine dovette lottare contro i venti impetuosi. <br>Attraversare lo Stretto era una delle parti pi<span class='charSpecial'>ù</span> difficili del suo viaggio, <br>ma la vista della terra dall<span class='charSpecial'>’</span>altra parte le dava la forza necessaria.",
        "Con grande determinazione, <br>raggiunse finalmente le coste spagnole.",
        "Dalla Spagna, la rondine vol<span class='charSpecial'>ò</span> verso i maestosi Monti Pirenei. Qui, i boschi erano <br>fitti e verdi, pieni di alberi alti e profumati. Era un luogo meraviglioso, ma il volo <br>tra le montagne non era semplice. Le correnti d'aria potevano <br>essere imprevedibili,<br>e a volte il cielo si copriva di nubi minacciose.",
        "<span class='charSpecial'>\“</span>Stai attenta, piccola rondine, <br>queste vette che separano <br>la Spagna dalla Francia <br>possono essere pericolose.<span class='charSpecial'>\”</span>",
        "Ma lei era una rondine coraggiosa. <br>Sapeva quando riposare sui rami <br>e quando riprendere il volo.",
        "Attravers<span class='charSpecial'>ò</span> i Pirenei con grazia e forza, <br>giungendo finalmente dall<span class='charSpecial'>’</span>altra parte.",
        "Incontr<span class='charSpecial'>ò</span> altri uccelli migratori lungo il viaggio <br>e insieme volarono facendosi compagnia gli uni all<span class='charSpecial'>’</span>altra.",
        "Finalmente, dopo molte settimane di viaggio, arriv<span class='charSpecial'>ò</span> in Italia.",
        "La rondine trov<span class='charSpecial'>ò</span> un bel paesino vicino a un lago, <br>dove decise di costruire il suo nuovo nido. <br>Qui, i cieli erano azzurri e l'aria fresca. <br>Ogni giorno, si nutriva di insetti e cinguettava felice.",
        "<span class='charSpecial'>\“</span>La rondine ha affrontato tanti pericoli e ha attraversato luoghi magnifici.<br>Ora è giunta sana e salva in Italia, pronta per una nuova avventura. <br>E chissà, forse un giorno volerà di nuovo verso il Kenya, <br>portando con sé i ricordi di questo meraviglioso viaggio.<span class='charSpecial'>\”</span>",
        "E cos<span class='charSpecial'>ì</span> termina il viaggio della rondine coraggiosa. <br>Il suo spirito avventuroso continuerà a ispirare <br>tutti coloro che amano esplorare il mondo."
    ];
}

//aggiunge i testi ai vari frame
function addTexts(frames, texts) {
    let positionTexts = [0, 1, 1, 2, 3, 4, 7, 7, 9, 11, 13, 14, 15, 16, 17, 20, 22, 23, 25, 27, 28, 30];
    for (let i = 0; i < positionTexts.length; i++) {
        frames[positionTexts[i]].insertAdjacentHTML("beforeend", "<p id='testo" + (i + 1) + "' class='testiStoria'>" + texts[i] + "</p>");
    }
}
