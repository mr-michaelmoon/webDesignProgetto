const numFrames = 33;
let lastScrollTop = 0;
var controllo = false;

document.addEventListener('DOMContentLoaded', function () {

    var homepage = document.getElementById('homepage');
    var banner = document.getElementById('banner');
    var bannerContainer = document.getElementById('bannerContainer');
    var insiemeFramesBanner = document.getElementById('insiemeFramesBanner');
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
    createFramesBanner(insiemeFramesBanner);
    insertTextsFrame();
    menu.style.opacity = "0";

    //si attiva quando si ricarica la pagina
    window.onload = function () {

        viewportWidth = window.innerWidth;
        bannerContainer.style.height = calcTotalWidthFrames() - viewportWidth + "px";
        sittingBirdContainer.style.width = window.screen.width + "px";
        sittingBirdEndContainer.style.width = window.screen.width + "px";
        birdImgStory.style.width = sittingBird.offsetWidth + "px";
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
        bannerContainer.style.height = calcTotalWidthFrames() - viewportWidth + vh + "px";
        sittingBirdContainer.style.width = window.screen.width + "px";
        sittingBirdEndContainer.style.width = window.screen.width + "px";
        banner.style.top = "50%";
        banner.style.transform = "translateY(-50%)";
        banner.style.width = bannerContainer.offsetHeight + viewportWidth + "px";

    }


    document.addEventListener('scroll', function (e) {
        var bannerBounding = banner.getBoundingClientRect();
        var bannerContainerBounding = bannerContainer.getBoundingClientRect();
        var sittingBirdBounding = sittingBird.getBoundingClientRect();

        //se si è nella storia (in bannerContainer)
        if(bannerContainerBounding.top <= viewportHeight && bannerContainerBounding.bottom >= viewportHeight) {
            

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

            birdAnimation(bannerBounding.left, sittingBird, birdContainer, birdImgStory, viewportWidth);

        }

        menuAnimation(sittingBirdBounding.top, menu, viewportHeight);

        horizontalScroll(bannerContainerBounding, banner, viewportHeight)

    });
});


// funzioni -------------------------------------------------------

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
// inserisce i testi nei frame
function insertTextsFrame() {

    var frames = document.getElementById('insiemeFramesBanner').querySelectorAll('div');
    var texts = allTexts();
    addTexts(frames, texts);
    
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
    var bannerContainerBounding = document.getElementById('bannerContainer').getBoundingClientRect();
    
    //se ci si trova tra la meta dell'uccello seduto all'inizio e la fine della storia
    if(sittingBird.getBoundingClientRect().left + (sittingBird.offsetWidth/2) < halfViewportWidth && bannerContainerBounding.bottom >= 0) {
        sittingBird.style.opacity = "0";
        birdContainer.style.display = "block";
        const value = 70; // quantita di scroll per cambiare uccello
        let bannerContainerDividedValue = bannerContainer.offsetHeight / value;

        //se rondine prende il volo, allora alzata, altrimenti è in volo
        if( birdImgStoryBounding.right - birdImgStory.offsetWidth/2 <= sittingBird.getBoundingClientRect().right - sittingBird.offsetWidth/4) {
            birdImgStory.src = "images/rondine/rondineAlzata.webp";
            controllo = true;
        } else {
            if(controllo) {
            birdImgStory.src = "images/rondine/rondineAliSu.webp";
            controllo = false;
            }
            
            //se si scrolla per una certa quantità si fa il cambio di immagine
            if(Math.abs(scrollTop - lastScrollTop) >= bannerContainerDividedValue ) {
            
                if(birdImgStory.src.includes("AliSu") || birdImgStory.src.includes("Alzata")) {
                    birdImgStory.src = "images/rondine/rondineAliGiu.webp";
                } else {
                        birdImgStory.src = "images/rondine/rondineAliSu.webp";
                }
                lastScrollTop = scrollTop;
            
            }

            var sittingBirdEnd = document.getElementById('uccelloSedutoFine');
            var sittingBirdEndBounding = sittingBirdEnd.getBoundingClientRect();
            var bannerContainerBounding = document.getElementById('bannerContainer').getBoundingClientRect();
            
            //rondine seduta se si trova sopra a rondine seduta fine nascosta o la storia finisce
            if( birdImgStoryBounding.left >= sittingBirdEndBounding.left || parseInt(bannerContainerBounding.bottom) <= window.innerHeight) {

                birdImgStory.style.opacity = "0";
                sittingBirdEnd.style.opacity = "1";
            } else {
                sittingBirdEnd.style.opacity = "0";
                birdImgStory.style.opacity = "1";
            }
        }
        
    } else {
        sittingBird.style.opacity = "1";
        birdContainer.style.display = "none";
    }
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
    return ["Una rondine viveva felice in un piccolo nido in Kenya.<br> Ogni giorno, volava libera sotto il cielo azzurro, sorvolando le verdi savane e i fiumi scintillanti.<br>Ma con l\'arrivo dell\'autunno, la rondine sent<span class='charSpecial'>ì</span> un forte desiderio di partire per un lungo viaggio,<br>un viaggio che l\'avrebbe portata fino all\'Italia.",
            "Un mattino presto, la rondine spieg<span class='charSpecial'>ò</span> le ali e inizi<span class='charSpecial'>ò</span> il suo volo verso nord.",
            "Il primo tratto del viaggio fu piacevole e pieno di avventure, ma presto arriv<span class='charSpecial'>ò</span> davanti a una sfida imponente…",
            "…Il deserto del Sahara.",
            "La vastità del deserto era infinita e il sole bruciava alto nel cielo.",
            "\"Oh, cara rondine spero che tu abbia abbastanza forza per attraversare questo deserto spietato.\"",
            "La rondine vol<span class='charSpecial'>ò</span> senza sosta,<br>sentendo il calore ardente sotto le sue ali.<br>La sabbia sembrava non finire mai,<br>ma la piccola rondine non si arrese.",
            "Beveva dalle rare oasi che incontrava e riposava sugli arbusti sparsi qua e là.",
            "Dopo giorni e giorni di volo, finalmente vide all'orizzonte qualcosa di diverso!",
            "Il blu scintillante del Mar Mediterraneo.",
            "<span class='charSpecial'>\“</span>Ben fatto! Hai superato il Sahara! Ora ti aspetta un'altra sfida:<br>lo Stretto di Gibilterra.<span class='charSpecial'>\”</span>",
            "Lo Stretto di Gibilterra era un passaggio stretto e ventoso<br>che separava l'Africa dall'Europa. Le correnti erano forti<br>e la rondine dovette lottare contro i venti impetuosi.<br>Attraversare lo Stretto era una delle parti pi<span class='charSpecial'>ù</span> difficili del suo viaggio,<br>ma la vista della terra dall<span class='charSpecial'>’</span>altra parte le dava la forza necessaria.",
            "Con grande determinazione,<br>raggiunse finalmente le coste spagnole.",
            "Dalla Spagna, la rondine vol<span class='charSpecial'>ò</span> verso i maestosi Monti Pirenei. Qui, i boschi erano fitti e verdi, pieni di alberi alti e profumati. Era un luogo meraviglioso, ma il volo tra le montagne non era semplice. Le correnti d'aria potevano essere imprevedibili,<br>e a volte il cielo si copriva di nubi minacciose.",
            "<span class='charSpecial'>\“</span>Stai attenta, piccola rondine, queste vette che separano la Spagna dalla Francia possono essere pericolose.<span class='charSpecial'>\”</span>",
            "Ma lei era una rondine coraggiosa.<br>Sapeva quando riposare sui rami e quando riprendere il volo.",
            "Attravers<span class='charSpecial'>ò</span> i Pirenei con grazia e forza, giungendo finalmente dall<span class='charSpecial'>’</span>altra parte.",
            "Incontr<span class='charSpecial'>ò</span> altri uccelli migratori lungo il viaggio e insieme volarono facendosi compagnia gli uni all<span class='charSpecial'>’</span>altra.",
            "Finalmente, dopo molte settimane di viaggio, arriv<span class='charSpecial'>ò</span> in Italia.",
            "La rondine trov<span class='charSpecial'>ò</span> un bel paesino vicino a un lago, dove decise di costruire il suo nuovo nido. Qui, i cieli erano azzurri e l'aria fresca. Ogni giorno, si nutriva di insetti e cinguettava felice.",
            "<span class='charSpecial'>\“</span>La rondine ha affrontato tanti pericoli e ha attraversato luoghi magnifici.<br>Ora è giunta sana e salva in Italia, pronta per una nuova avventura. E chissà, forse un giorno volerà di nuovo verso il Kenya, portando con sé i ricordi di questo meraviglioso viaggio.<span class='charSpecial'>\”</span>",
            "E cos<span class='charSpecial'>ì</span> termina il viaggio della rondine coraggiosa. Il suo spirito avventuroso continuerà a ispirare tutti coloro che amano esplorare il mondo."
        ];
}

//aggiunge i testi ai vari frame
function addTexts(frames, texts) {
    frames[0].insertAdjacentHTML("beforeend", "<div id='testo1' class='testiStoria'><p>"+ texts[0] +"</p></div>");
    frames[1].insertAdjacentHTML("beforeend", "<div id='testo2' class='testiStoria'><p>"+ texts[1] +"</p></div>");
    frames[1].insertAdjacentHTML("beforeend", "<div id='testo3' class='testiStoria'><p>"+ texts[2] +"</p></div>");
    frames[2].insertAdjacentHTML("beforeend", "<div id='testo4' class='testiStoria'><p>"+ texts[3] +"</p></div>");
    frames[4].insertAdjacentHTML("beforeend", "<div id='testo5' class='testiStoria'><p>"+ texts[4] +"</p></div>");
    frames[5].insertAdjacentHTML("beforeend", "<div id='testo6' class='testiStoria'><p>"+ texts[5] +"</p></div>");
    frames[7].insertAdjacentHTML("beforeend", "<div id='testo7' class='testiStoria'><p>"+ texts[6] +"</p></div>");
    frames[7].insertAdjacentHTML("beforeend", "<div id='testo8' class='testiStoria'><p>"+ texts[7] +"</p></div>");
    frames[9].insertAdjacentHTML("beforeend", "<div id='testo9' class='testiStoria'><p>"+ texts[8] +"</p></div>");
    frames[11].insertAdjacentHTML("beforeend", "<div id='testo10' class='testiStoria'><p>"+ texts[9] +"</p></div>");
    frames[13].insertAdjacentHTML("beforeend", "<div id='testo11' class='testiStoria'><p>"+ texts[10] +"</p></div>");
    frames[14].insertAdjacentHTML("beforeend", "<div id='testo12' class='testiStoria'><p>"+ texts[11] +"</p></div>");
    frames[15].insertAdjacentHTML("beforeend", "<div id='testo13' class='testiStoria'><p>"+ texts[12] +"</p></div>");
    frames[16].insertAdjacentHTML("beforeend", "<div id='testo14' class='testiStoria'><p>"+ texts[13] +"</p></div>");
    frames[17].insertAdjacentHTML("beforeend", "<div id='testo15' class='testiStoria'><p>"+ texts[14] +"</p></div>");
    frames[20].insertAdjacentHTML("beforeend", "<div id='testo16' class='testiStoria'><p>"+ texts[15] +"</p></div>");
    frames[22].insertAdjacentHTML("beforeend", "<div id='testo17' class='testiStoria'><p>"+ texts[16] +"</p></div>");
    frames[23].insertAdjacentHTML("beforeend", "<div id='testo18' class='testiStoria'><p>"+ texts[17] +"</p></div>");
    frames[25].insertAdjacentHTML("beforeend", "<div id='testo19' class='testiStoria'><p>"+ texts[18] +"</p></div>");
    frames[27].insertAdjacentHTML("beforeend", "<div id='testo20' class='testiStoria'><p>"+ texts[19] +"</p></div>");
    frames[28].insertAdjacentHTML("beforeend", "<div id='testo21' class='testiStoria'><p>"+ texts[20] +"</p></div>");
    frames[30].insertAdjacentHTML("beforeend", "<div id='testo22' class='testiStoria'><p>"+ texts[21] +"</p></div>");
}