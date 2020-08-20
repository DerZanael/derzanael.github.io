//Duplique un array et le mélange au passage
function duplicArray(a) {
    return melange(JSON.parse(JSON.stringify(a)));
}
//Shuffle sur un array
function melange(a) {
    for(let i = a.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = a[i]
        a[i] = a[j]
        a[j] = temp
    }
    return a;
}
function sleep(ms) {
    ms = ms * 1000;
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Roll le dé et retourne le résultat
function roll () {
	return Math.ceil((Math.floor(Math.random() * 10) + 1) * 0.6); //Résultat de 1 à 10, multiplié par 0.6, arrondi à l'entier supérieur
}

async function flow() {
    rolla = roll();
    //Animation du roll
    // -- ouverture du modal dé
    // -- anim du dé + affichage résultat
    await rouleDe(rolla);
    
    //Mouvement du pion
    // -- avance de X cases
    await avance(rolla);
    
    //Gestion question courante
    askQuestion();
}

//Affiche modale dé in, anim dé roule > affichage résultat > modale out
async function rouleDe(val) {
    let nbsleep = 1;
    let modalde = document.getElementById("modal-dice");
    //Réinitialisation des dés
    let dicelist = document.querySelectorAll("#modal-dice .dice-display");
    dicelist.forEach(function(el) {
        if(el.getAttribute("id") !== "dice-roll") {
            el.classList.remove("roll-displayed");
            el.classList.add("roll-hidden");
        }
        else {
            el.classList.remove("roll-hidden");
            el.classList.add("roll-displayed");
        }
    });
    //Affichage popup
    modalde.style.display = "block";
    //affichage roll
    await sleep(nbsleep);
    document.getElementById("dice-roll").classList.remove("roll-displayed");
    document.getElementById("dice-roll").classList.add("roll-hidden");
        //valeur finale
    document.getElementById("dice-"+val).classList.remove("roll-hidden");
    document.getElementById("dice-"+val).classList.add("roll-displayed");
    await sleep(nbsleep);

    //on vire la popup
    modalde.style.display = "none";
}

//Avance le pion de <nb> cases
async function avance(nb) {
    if(pawn_pos == (cases.length - 1)) //on a fini donc on ne fait rien ;)
        return false;
    let is_neg = (nb < 0);
    let casec = cases[pawn_pos]; //case courante du pion
    let dir = "";
    //Loop sur le nombre de rolls
    for(let i = 1; i <= Math.abs(nb); i++) {
        if(casec.dir !== null) {
            if(is_neg) {
                if((pawn_pos - i) < 0) {
                    pawn_pos = 0;
                    return false;
                }
                casec = cases[pawn_pos - i];
                if(typeof casec !== "undefined" && (pawn_pos - i) >= 0) {
                    switch(casec.dir) {
                        case "up": dir = "down"; break;
                        case "down": dir = "up"; break;
                        case "left": dir = "right"; break;
                        case "right": dir = "left"; break;
                    }
                }
            }
            else {
                dir = casec.dir;
                casec = cases[pawn_pos + i];
            }
            animMove(dir);
            await sleep(0.5);
        }
    }
    pawn_pos = pawn_pos + nb;
    if(pawn_pos < 0) pawn_pos = 0;
    if(pawn_pos >= (cases.length - 1)) {
        pawn_pos = cases.length - 1;
    }
    return true;
}

function animMove(dir) {
    const bloc = (document.body.clientHeight / 6); //console.log(bloc);
    let pleft = pion.offsetLeft; //console.log(pleft);
    let ptop = pion.offsetTop; //console.log(pbot);

    switch(dir) {
        case "up": pion.style.top = (ptop - bloc) + "px";
            break;
        case "down": pion.style.top = (ptop + bloc) + "px";
            break;
        case "left": pion.style.left = (pleft - bloc) + "px";
            break;
        case "right": pion.style.left = (pleft + bloc) + "px";
            break;
    }
    return true;
}


async function askQuestion() {
    //Pas de question pour 
    if(pawn_pos < 1 || pawn_pos >= (cases.length - 1)) {
        if(pawn_pos >= (cases.length - 1)) { //On a fini
            finish();
        }
        if(pawn_pos < 1) {
            pawn_pos  = 0; //juste pour être sur
            dice_clickable = true;
        }
        return false;
    }

    let casec = cases[pawn_pos];
    if(typeof debug !== "undefined" && debug) casec = {type: "chance"};
    let type = casec.type;

    //on vérifie qu'on a une question disponible, sinon on mélange la pile de discard correspondante
    if(eval("pile_"+type).length === 0) {
        eval("pile_"+type) = duplicArray(eval("discard_"+type));
        eval("discard_"+type) = [];
    }
    //Gestion question, pile et discard
    let pile = eval("pile_"+type); //pile de cartes
    let discard = eval("discard_"+type); //pile de questions posées
    const question = pile[0]; //on prend la première de la pile
    discard.push(question); //on la rajoute dans les questions posées
    pile.splice(0, 1); //on supprime la question de la pile

    //affichage question
    const modal = document.getElementById("modal-carte");
    const modal_inner = document.querySelector("#modal-carte .modal-affiche-question");
    const front = document.querySelector("#modal-carte .modal-affiche-question .question-front");
    const back = document.querySelector("#modal-carte .modal-affiche-question .question-back");
    const txts = {"chance": "chance", "question": "questions", "shig": "El Shig"};
    front.innerHTML = "<img src='images/media_"+type+".png' alt='"+type.toUpperCase()+"'><span class='deco-"+type+"'>"+txts[type].toUpperCase()+"</span>";
    back.innerHTML = "<p>"+question.question+"</p>";
    modal.style.display = "block";
    await sleep(1);

    modal_inner.classList.add("flipped");
    back.childNodes[0].style.width = back.childNodes[0].clientWidth+"px"; //return true;
    await sleep(3);

    //Gestion de la question
    if(type === "chance") { //Type chance : il va se passer un truc, on dégage le modal et on gère l'effet
        modal.style.display = "none";
        modal_inner.classList.remove("flipped");
        if(typeof question.bonus !== "undefined") {
            switch(question.bonus) {
                case "hasjoker":
                    hasjoker = true;
                    dice_clickable = true
                    break;
                case "diceroll-neg": 
                    let val = roll();
                    await rouleDe(val);
                    await avance(-val);
                    askQuestion();
                    break;
            }
        }
        else {
            await avance(question.evt);
            askQuestion();
        }
    }
    else {
        modal_inner.classList.add("is-flipped");
        await sleep(0.5);

        let ht = document.getElementById("modele-question").innerHTML;
        ht = ht.replace(/#question#/g, question.question);
        let t = "";
        question.reponses.forEach((rep, index) => {
            t+= "<li><input type='checkbox' value='"+index+"' id='rep-"+index+"' class='rep-selec'> <label for='rep-"+index+"'>"+rep+"</label></li>";
        });
        ht = ht.replace(/#reponses#/g, t);
        ht = ht.replace(/#repondre_id#/, "btn-reponse");
        ht = ht.replace(/#roll_next#/g, "btn-rollnext");
        back.innerHTML = ht;

        const btnreponse = document.getElementById("btn-reponse");
        const btnroll = document.getElementById("btn-rollnext");
        //gestion de l'event sur la question
        btnreponse.addEventListener("click", function(){
            this.style.setProperty("disabled", true);
            this.style.display = "none";
            btnroll.style.display = "inline-block";

            let sel = [];
            const reponses = document.querySelectorAll("#modal-carte ul li");
            reponses.forEach((el, index) => {
                let radio = el.childNodes[0];
                let label = el.childNodes[2];
                label.classList = [];
                if(radio.checked) {
                    sel.push(index);
                    if(question.attendu.indexOf(index) !== -1) {
                        label.classList.add("label-correct");
                    }
                    else {
                        label.classList.add("label-false");
                    }
                }
                else {
                    if(question.attendu.indexOf(index) !== -1) {
                        label.classList.add("label-should-correct");
                    }
                    else {
                        label.classList.add("label-neutre");
                    }
                }
            });

            let reussi = (sel.length == question.attendu.length && 
                    sel.every((el, index) => {
                        return (question.attendu[index] == el);
                    })
                );
            nbquest++;
            if(reussi) nbgood++;
            //fin de l'event question : on permet à l'utilisateur de cliquer
            dice_clickable = true;
        });
        btnroll.addEventListener("click", function(){
            modal_inner.classList.remove("flipped");
            modal_inner.classList.remove("is-flipped");
            modal.style.display = "none";
            dice_clickable = false;
            flow();
        });
    }
}

//Termine la session
function finish() {
    //modal du lien retour
    const modal = document.getElementById("modal-endgame");
    document.getElementById("nbgood").innerHTML = nbgood;
    document.getElementById("nbquest").innerHTML = nbquest;
    modal.style.display = "block";
    document.getElementById("plateau").classList.add("is-blur");
    dice_clickable = false;
}
