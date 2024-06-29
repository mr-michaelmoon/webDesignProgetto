const numFrames = 33;
const numFramesBambini = 22;
let lastScrollTop = 0;
var controllo = false;
var firstTime = false;
let isInCT1 = true;


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
    var insiemeFramesBambini = document.getElementById('insiemeFramesBambini');
    var animazioneDissolvenza = document.getElementById('animazioneDissolvenza');
    var dissolvenza = document.getElementById('dissolvenza');
    var viewportHeight = window.innerHeight;
    var viewportWidth = window.innerWidth;

    // homepage.style.width = window.screen.width + "px";
    banner.style.width = window.screen.width + "px";
    banner.style.height = homepage.offsetHeight / 1.5 + "px";

    // creazione frame delle immagini del banner 
    createFramesBanner(insiemeFramesBanner);
    insertTextsFrame();
    menu.style.opacity = "0";


    //se in verticale mette width dell'immagine homepage a auto 
    // homepage.querySelector('img').style.width = viewportHeight > viewportWidth ? "auto" : "100%";

    bannerContainer.style.height = calcTotalWidthFrames() - viewportWidth + "px";

    //si attiva quando si ricarica la pagina
    window.onload = function () {
        menuAnimation(sittingBird.getBoundingClientRect().top, menu, viewportHeight);
        birdAnimation(sittingBird, birdContainer, birdImgStory, viewportWidth);

        //richiama funzione onresize()
        window.onresize();
        createFramesKids(insiemeFramesBambini);
        addTitleChildren();
        addTextsChildren();
        addAnimationTextChildren();
        // addCredits();
    }

    //si attiva quando si modifica la dimensione della finestra
    window.onresize = function () {
        viewportWidth = window.innerWidth;
        var vh = Math.abs(viewportHeight - window.innerHeight); // calcolo differenza tra viewportHeight vecchio e quello nuovo
        bannerContainer.style.height = calcTotalWidthFrames() - viewportWidth + vh + "px";
        banner.style.width = bannerContainer.offsetHeight + viewportWidth + "px";
        banner.style.height = homepage.offsetHeight / 1.5 + "px";
        birdImgStory.style.width = (3/4)*sittingBird.offsetWidth + "px";
        homepage.style.width = insiemeFramesBanner.firstElementChild.offsetWidth + "px";
        sittingBirdContainer.style.width = insiemeFramesBanner.firstElementChild.offsetWidth + "px";
        sittingBirdEndContainer.style.width = insiemeFramesBanner.firstElementChild.offsetWidth + "px";

    }

    document.addEventListener('scroll', function (e) {
        var bannerContainerBounding = bannerContainer.getBoundingClientRect();
        var sittingBirdBounding = sittingBird.getBoundingClientRect();
        var birdImgStoryBounding = birdImgStory.getBoundingClientRect();
        var sittingBirdEndBounding = sittingBirdEnd.getBoundingClientRect();
        var animazioneDissolvenzaBounding = animazioneDissolvenza.getBoundingClientRect();

        //se si è nella storia (in bannerContainer)
        if (bannerContainerBounding.top <= viewportHeight &&  animazioneDissolvenzaBounding.bottom >= viewportHeight) {

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
        if(bannerContainerBounding.bottom + animazioneDissolvenza.offsetHeight <= viewportHeight) {
            banner.style.position = "relative";
            banner.style.top = "100%";
            banner.style.transform = "translateY(-100%)";
        }
        if(dissolvenza.getBoundingClientRect().top <= 0) {
            dissolvenza.style.opacity = Math.abs(dissolvenza.getBoundingClientRect().top) / (dissolvenza.offsetHeight - viewportHeight);
        }
        if(animazioneDissolvenzaBounding.bottom <= viewportHeight) {
            
        }


        let controlloBird = birdImgStoryBounding.left >= sittingBirdEndBounding.left || parseInt(bannerContainerBounding.bottom) <= window.innerHeight;
        birdImgStory.style.opacity = controlloBird ? "0" : "1";
        sittingBirdEnd.style.opacity = controlloBird ? "1" : "0";
            
        menuAnimation(sittingBirdBounding.top, menu, viewportHeight);
        horizontalScroll(bannerContainerBounding, banner, viewportHeight);
            animationTextChildren();

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

function createFramesKids(insiemeFramesBambini) {
    for (var i = 1; i <= numFramesBambini; i++) {
        insiemeFramesBambini.innerHTML += "<div class='frameBambini no-caret' id='frameBambini"+ i +"'><img src='images/banner_children_story/v" + i +".png'></div>";
        
    }

}

// inserisce i testi nei frame
function insertTextsFrame() {
    var frames = document.getElementById('insiemeFramesBanner').querySelectorAll('div');
    var texts = allTextsBanner();
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
        totalFramesWidth += frame.clientWidth;
    });
    return totalFramesWidth;
}

//restituisce array con i testi della storia
function allTextsBanner() {
    return [
        "Una rondine viveva felice in un piccolo nido in Kenya. <br>Ogni giorno, volava libera sotto il cielo azzurro, <br>sorvolando le verdi savane e i fiumi scintillanti. <br>Ma con l\'arrivo dell\'autunno, la rondine sent<span class='charSpecial'>ì</span> <br>un forte desiderio di partire per un lungo viaggio, <br>un viaggio che l\'avrebbe portata fino all\'Italia.",
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

function allTextsChildrens() {
    return [
        "Le rondini possono volare dall\'Africa all\'Europa senza problemi, ma per noi umani attraversare i confini pu<span class='charSpecial'>ò</span> essere molto pi<span class='charSpecial'>ù</span> complicato.<br><br> Le rondini possono volare lontano senza bisogno di permessi o documenti. Attraverso tanti paesi diversi e nessuno le ferma. <br><br>Per noi umani, viaggiare da un paese all\’altro richiede spesso documenti speciali chiamati \“visti\” e dobbiamo passare attraverso controlli ai confini. <br><br>Alcuni bambini e adulti provenienti da molti paesi del mondo non possono spostarsi liberamente come le rondini perché ci sono delle regole diverse per ogni paese.",
        "Hoa era una bambina di nove anni che viveva in un villaggio vicino al fiume Lwalaba, nella Repubblica democratica del Congo. Amava pescare con suo nonno e sognava di diventare una grande esploratrice. Ma la vita nel suo villaggio divenne troppo difficile a causa di inondazioni e povertà. Così, la sua famiglia decise di partire per un lungo viaggio verso l'Europa, in cerca di una vita migliore.<br><br>Il viaggio iniziò con una lunga traversata del fiume su una piccola barca per arrivare fino alle sabbie del Marocco. Navigarono per giorni, affrontando forti correnti e pericolosi animali del fiume. Una volta raggiunta la terraferma, continuarono a piedi attraverso le infinite dune del deserto. Hoa doveva essere attenta a ogni passo, aiutando la sua famiglia a superare gli ostacoli lungo il percorso, ma era una bambina determinata e tutte queste insidie non l’hanno mai fermata.<br><br>Dopo settimane di cammino, raggiunsero la grande città del Dakar, dove riuscirono a salire su un treno merci. Il viaggio in treno fu lungo e scomodo, con poche soste e poco cibo. Finalmente raggiunsero il mar mediterraneo dove s’imbarcarono su una barca verso l'Europa. La traversata fu piena di difficoltà, con tempeste e onde alte che rendevano il viaggio molto pericoloso.<br><br>Quando finalmente arrivarono in Italia, Hoa insieme alla sua famiglia erano esausti ma felici di aver raggiunto la terraferma siciliana, dove qui trovarono persone gentili e buone pronte a dare tutto il loro sostegno. In Italia, Hoa trovò una nuova scuola dove poté continuare a studiare e avere nuove speranze per il proprio futuro. Ogni giorno che passava scopriva nuovi amici e nuove avventure, sapendo che, nonostante le difficoltà, aveva trovato un posto sicuro dove crescere felice.",
        "Un bambino di nome Abed viveva insieme alla sua famiglia afghana in Iran. Purtroppo non possedevano i documenti per avere gli stessi diritti dei cittadini iraniani e questa mancanza li portò ad andare via. Decisero quindi di partire per l’Europa nella speranza di una vita migliore.<br><br>Il viaggio era pericoloso e pieno d’incertezze, ma Abed era pronto ad affrontare ogni pericolo per la propria famiglia per un futuro migliore. Viaggiavano di notte su strade buie, scappando da ogni pericolo. Dopo giorni, arrivarono in un altro confine, la Turchia. In questo nuovo paese sono stati costretti a rimanere per mesi affrontando giorni interi con poco cibo e con le loro uniche cose portate nel viaggio. Ma in quelle notti, Abed sognava una casa sicura dove poteva andare a scuola e giocare con gli altri bambini.<br><br>Una volta aver superato il confine con la Turchia, ecco il mare. Ci vollero almeno quattro tentativi per affrontare quelle onde spaventose. In quella barca erano almeno 40 persone e il viaggio sembrava sempre più pericoloso. Ma alla fine, lui insieme alla sua famiglia, riuscirono ad arrivare in Grecia e sono stati aiutati da persone gentili che li hanno portati in un posto più sicuro dove Abed ha potuto cominciare una vita migliore, incontrando nuovi amici e continuando il suo sogno di stare bene insieme alla sua famiglia.",
        "Aisha era una bambina solare e gentile di dieci anni. Viveva insieme alla sua famiglia in Siria, dove la guerra le tolse ogni possibilità per studiare e continuare il suo sogno di diventare un’ottima studentessa. I suoi genitori decisero di portarla in un nuovo paese più sicuro dove potevano coltivare sogni migliori: l’Italia.<br><br>Questo viaggio però nascondeva molte insidie e pericoli davanti a loro. Partirono per il Libano, dove rimasero per qualche tempo in condizioni difficili, ma la famiglia non cessava di sognare le alte montagne e i cieli blu.<br><br>Il viaggio proseguì in Turchia, dove salirono su un vecchio autobus sgangherato e viaggiarono lungo le tortuose strade montanare per raggiungere la costa. In queste condizioni difficili, Aisha incontrò un altro bambino alla ricerca di salvezza, si chiamava Omar e anche lui era in viaggio per l’Italia. Da quel momento, i due si incoraggiavano a vicenda condividendo i propri sogni.<br><br>Una volta arrivati lungo la costa turca, trovarono una barca piena di rifugiati come loro, dove Aisha insieme alla sua famiglia e Omar vennero fatti imbarcare sulla barca pronta a partire per l’Italia. La tratta però non fu così semplice ma bastò per arrivare su una piccola isola greca. La vita sull’isola era difficile, ma i bambini erano felici di giocare insieme.<br><br>Su quell’isola la famiglia colse l’occasione di un traghetto che li avrebbe portati in Italia. Il viaggio era più lungo di quanto avessero mai sperimentato prima e finalmente arrivarono in una piccola città portuale italiana. La famiglia di Aisha e Omar vennero portati in un centro di accoglienza per i rifugiati dove le persone presenti gli diedero del cibo e un riparo al caldo.<br><br>Nella loro nuova casa, Aisha e Omar cominciarono a frequentare la scuola della città e lì fecero molte amicizie. Impararono l’italiano e si divertirono raccontando le loro avventure ai loro compagni di classe.",
        "Noi possiamo fare la nostra parte per aiutare questi bambini e famiglie nel loro viaggio.<br><br>Donando a Save the Children, possiamo contribuire a rendere il mondo un posto migliore e più sicuro per tutti."
    ];
}

function allTextsChildrensTitle() {
    return [
        "Hoa",
        "Abed",
        "Aisha"
    ];
}

//aggiunge i testi ai vari frame
function addTexts(frames, texts) {
    let positionTexts = [0, 1, 1, 2, 3, 4, 7, 7, 9, 11, 13, 14, 15, 16, 17, 20, 22, 23, 25, 27, 28, 30];
    for (let i = 0; i < positionTexts.length; i++) {
        frames[positionTexts[i]].insertAdjacentHTML("beforeend", "<p id='testo" + (i + 1) + "' class='testiStoria'>" + texts[i] + "</p>");
    }
}

function addTextsChildren() {
    let frames = document.getElementById('insiemeFramesBambini').querySelectorAll('.frameBambini');
    let texts = allTextsChildrens();
    let positionTexts = [2];
    for (let i = 1; i < positionTexts.length; i++) {
        frames[positionTexts[i]-1].insertAdjacentHTML("beforeend", "<p id='testoBambini" + (i+1) + "' class='testiStoriaBambini'>" + texts[i] + "</p>");
    }
}

function addTitleChildren() {
    let frames = document.getElementById('insiemeFramesBambini').querySelectorAll('.frameBambini');
    let texts = allTextsChildrensTitle();
    let textsContent = allTextsChildrens();
    let positionTexts = [8, 13, 17];
    for (let i = 0; i < positionTexts.length; i++) {
        frames[positionTexts[i]-1].insertAdjacentHTML("beforeend", "<div class='containerStorieBambini' id='containerStory"+(i+1)+" '><h3 class='storia' id='storia"+(i+1)+"'>Storia "+(i+1)+"</h3><h1 class='title' id='title"+(i+2)+"'>" + texts[i] + "</h1><p id='testoBambini" + (i+2) + "' class='testiStoriaBambini'>" + textsContent[i+1] + "</p></div>");
    }
}

function addCredits() {
    let frames = document.getElementById('insiemeFramesBambini').querySelectorAll('.frameBambini');
    let texts = allTextsChildrens();
    frames[21].insertAdjacentHTML("beforeend", "<div id='containerFinale'><p id='testoFinale'>"+ texts[4]+"</p></div>");

}

function addAnimationTextChildren() {
    let frameBambini2 = document.getElementById('frameBambini2');
    frameBambini2.insertAdjacentHTML("beforeend", "<div id='textContainerAnimation1'><p id='testoBambini1' class='testiStoriaBambini'>" + allTextsChildrens()[0] + "</p></div><div id='textContainerAnimation2'></div>");
}

function animationTextChildren() {
    if (document.getElementById('textContainerAnimation1') != null) {
        let textContainerAnimation1 = document.getElementById('textContainerAnimation1');
        let textContainerAnimation2 = document.getElementById('textContainerAnimation2');
        let textContainerAnimation1Bounding = textContainerAnimation1.getBoundingClientRect();
        let textContainerAnimation2Bounding = textContainerAnimation2.getBoundingClientRect();
        let testo = document.getElementById('testoBambini1');

        if (textContainerAnimation1Bounding.top + textContainerAnimation1.offsetHeight / 2 > window.innerHeight / 2) {
            testo.style.position = "relative";
            textContainerAnimation1.appendChild(testo);
        } else {
            if (textContainerAnimation2Bounding.top + textContainerAnimation2.offsetHeight / 2 < window.innerHeight / 2) {
                testo.style.position = "relative";
                textContainerAnimation2.appendChild(testo);
            } else {
                testo.style.position = "fixed";
                testo.style.top = "50%";
                testo.style.transform = "translate(-50%, -50%)";
            }
        }
    }
}