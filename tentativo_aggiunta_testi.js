

// NOTA: cambiato frameBanner con bannerFrame

function createBannerWithParagraphs(insiemeFramesBanner) {
	
	// Sicuramente devo migliorare gli oggetti, ma mi stavo concentrando di più sul perché
	// i frame e il testo non vengono visualizzati bene...
    const framesData = [
		{
			frameNumber: 2,
			paragraphs: [
			{
				text: "Una rondine viveva felice in un piccolo nido in Kenya.<br>" +
						"Ogni giorno, volava libera sotto il cielo azzurro,<br>" +
						"sorvolando le verdi savane e i fiumi scintillanti.<br>" + 
						"Ma con l'arrivo dell'autunno, la rondine sentì<br>" + 
						"un forte desiderio di partire per un lungo viaggio,<br>" +
						"un viaggio che l'avrebbe portata fino all'Italia.",
				right: "20px",
				bottom: "20px"
			}]
		},
        {
            frameNumber: 3,
            paragraphs: [
                {
                    text: "Un mattino presto, la rondine spiegò le ali<br>" +
                            "e iniziò il suo volo verso nord.",
                    left: "20px",
                    top: "20px",
                },
                {
                    text: "Il primo tratto del viaggio fu<br>" + 
                            "piacevole e pieno di avventure, ma presto arrivò davanti a<br>" +
                            "una sfida imponente...",
                    right: "74px",
                    bottom: "20px"
                }
            ]
        },
        {
            frameNumber: 4,
            paragraphs: [
                {
                    text: "...Il deserto del Sahara.",
                    right: "20px",
                    top: "20px",
                }
            ]
        }
	];

    framesData.forEach((frameData, i) => {
        const bannerFrame = document.createElement('div');
        bannerFrame.className = 'bannerFrame';
		bannerFrame.style.position = 'relative';
		bannerFrame.style.color = 'black';
		
		//Soluzione di ChatGPT per togliere lo spazio vuoto tra le immagini e l'ultima img tagliata:
		//bannerFrame.style.display = 'inline-block'; // For spacing issue
        //bannerFrame.style.verticalAlign = 'top'; // Align frames at the top
        //bannerFrame.style.overflow = 'hidden';
		
		// Aggiungo il frame
        const img = document.createElement('img');
        img.draggable = false;
        img.src = 'images/framesBanner/frame-'+ frameData.frameNumber +'.png';
		img.style.height = '100%';
        bannerFrame.appendChild(img);

        // Aggiungo i paragrafi del frame
        frameData.paragraphs.forEach((paragraph, j) => {
            const p = document.createElement('p');
			//p.id = "testo-"+i+j;
            p.innerHTML = paragraph.text;
			
			p.style.position = 'absolute';
			//Il testo deve stare sopra sittingBirdContainer per essere selezionabile
			p.style.zIndex = '3';
			
            if (paragraph.left) {
                p.style.left = paragraph.left;
            }
            if (paragraph.right) {
                p.style.right = paragraph.right;
            }
            if (paragraph.top) {
                p.style.top = paragraph.top;
            }
            if (paragraph.bottom) {
                p.style.bottom = paragraph.bottom;
            }
            bannerFrame.appendChild(p);
        });

        insiemeFramesBanner.appendChild(bannerFrame);
    });
}