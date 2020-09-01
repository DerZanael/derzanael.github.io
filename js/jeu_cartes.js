//Pool de questions
let questions_session = duplique(questions);

let question = null; //question courante
let rep_courante = []; //réponses courantes associées
let cartes_clickable = false; //est ce qu'on a le droit de cliquer sur une réponse
let timer_en_route = false; //est ce que le timer est en route - conditionne aussi le clic sur réponse
let is_timeout = false; //est ce que l'utilisateur est en timeout pour la question courante
let is_right = false; //est ce que l'utilisateur a eu les bonnnes réponses

let nbgood = 0;

//Tire la première question de la pile
async function tireQuestion() {
    //On vire le modal de départ si il était présent
    modal_start.style.display = "none";
    document.getElementById("plateau").classList.remove("is-blur");
    //Retour du timer à 0
    resetTimer();
    //Si on a épuisé la pile de questions, on termine le jeu (que vous perdez)
    if(questions_session.length === 0) {
        finish();
        return false;
    }
    //Retour en mode neutral
    statutQuo();
    await sleep(1); //le temps que les animations se fassent
    question = questions_session[0]; //tirage de la question
    questions_session.splice(0, 1); //suppression de la question de la pile

    //Initialise la question
    await initQuestion();

    //Initialise les cartes réponse et les active
    await initReponses();
    cartes_clickable = true;

}

//Réinitialise le plateau de jeu en mode neutre
function statutQuo() {
    is_right = false;
    is_timeout = false;
    question = null;
    rep_courante = [];

    //Etat des mains
    //Si on avait une main mise en en avant on doit virer le résultat du DOM
    if(document.querySelector(".main-container.hl")) {
        document.querySelector(".main-container.hl .carte .disp-result").remove();
        document.querySelector(".main-container.hl .carte .inner").style.display = "block";
    }
    //Retour au statut idle des mains
    document.querySelectorAll("#mg, #md").forEach(el => {
        el.classList.remove("opened");
        el.classList.remove("result");
        el.classList.remove("hl");
        el.classList.add("idle");
    });

    //Suppression des cartes réponse
    poolc.style.display="none";
    poolc.classList.remove("displayed");
    poolc.classList.remove("finish");
    poolc.innerHTML = "";

    //Suppresion du contenu de la modal de question
    dquest.innerHTML = "";
    dquest.classList.remove("anim");
    dquest.classList.remove("opened");
    dquest.style.dislay = "none";
}

//Initialise une question
async function initQuestion() {
    //Affichage de la modal question + animation d'intro
    dquest.style.display = "block";
    dquest.classList.add("anim");
    await sleep(1); //tempo anim

    //Contenu de la question
    let ht = document.getElementById("modele-question").innerHTML;
    ht = ht.replace(/#question#/g, question.question);
    ht = ht.replace(/#id_btn_repondre#/g, "btn-check");
    ht = ht.replace(/#id_btn_next#/g, "btn-next");
    dquest.innerHTML = ht;

    //Si on est pas sur la première question, on va afficher la légende des couleurs de cartes
    if(typeof question.reponses === "undefined") {
        types = Object.keys(types_pool);
        types.reverse();
        types.forEach(el=>{
            let div = document.createElement("div");
            div.classList.add("legende");
            div.style.backgroundColor = types_pool[el].couleur;
            div.innerHTML = types_pool[el].titre;
            document.querySelector("#question .question-footer").prepend(div);
        });
    }
    //Event bouton suivant
    document.getElementById("btn-next").addEventListener("click", function(){
        tireQuestion();
    });
    //Event bouton répondre
    document.getElementById("btn-check").addEventListener("click", function(){
        if(!this.disabled){ //Si le bouton est disabled parcequ'aucune réponse sélectionné, on zappe l'appel au check de réponse
            checkReponse();
        }
    });
    dquest.classList.add("opened");
    //Début du timer de la question dans timer.js
    startTimer();
    timer_en_route = true;
}

//Initialise le pool de cartes affichées
async function initReponses() {
    //Affichage zone de réponses
    poolc.style.display = "block";
    poolc.classList.add("displayed");
    //Réponses
    const reponses = makePool(question, (typeof question.reponses !== "undefined")); //création du pool de réponses
    const btn_check = document.getElementById("btn-check");
    //Autres définitions
    const nb = reponses.length; //nombre de réponses
    const angle = 5; //pas (en degrés) entre chaque carte
    const space = (nb < 6) ? 15 : 10; //espace (en %) entre chaque carte
    const scale = (nb >= 6) ? " scale(0.8)" : ""; //on va diminuer les tailles de carte si il y en a trop
    let angle_start = -(angle * (nb - 1)) / 2; //angle de début par rapport au 0 trigo
    let pos_start = -(space * (nb - 1)) / 2; //distance de début par rapport au centre de #pool-cartes
    
    //Création des réponses sélectionnables
    reponses.forEach(async (reponse, index)=>{
        let i = index + 1;
        let zindex = 10 + i;
        //container carte
        let carte = document.createElement("div");
        carte.classList.add("carte-reponse");
        carte.setAttribute("id", reponse.label);
        carte.setAttribute("data-label", reponse.label);
        //Fond coloré en fonction du type de carte
        if(typeof reponse.type !== "undefined") {
            carte.style.backgroundColor = types_pool[reponse.type].couleur;
            carte.style.borderColor = types_pool[reponse.type].couleur;
            carte.style.color = "white";
        }
        //contenu carte
        let inner = document.createElement("div");
        inner.classList.add("reponse");
        inner.innerHTML = reponse.reponse;
        carte.appendChild(inner);

        //Décoration/positionnement
        c_angle = angle_start + (angle * index);
        c_pos = pos_start  + (space * index);
        carte.style.zIndex = zindex;
        carte.style.left = "calc(50% + "+c_pos+"vh)";
        carte.style.transform = "rotate("+c_angle+"deg) translateX(-50%)"+scale;
        
        poolc.appendChild(carte);
        carte.classList.add("showed");
        
        //Event au clic sur la carte
        carte.addEventListener("click", function(){
            if(cartes_clickable && timer_en_route) { //On a le droit de cliquer
                let in_reponses = toggleRep(this.getAttribute("data-label"));
                if(in_reponses) {
                    this.classList.remove("selected");
                }
                else {
                    this.classList.add("selected");
                }
                btn_check.disabled =  !(rep_courante.length > 0); //On manipule l'attribut disabled du bouton répondre en fonction du nombre de réponses
            }
        });
    });
}

//Retourne un pool de réponses à utiliser en fonction de la question
//useobject : utiliser le pool de réponses fourni avec la question
function makePool(question, useobject) {
    let rep = []; //array de retour
    let pool = duplique((useobject) ? question.reponses : pool_reponses); //pool de réponses à manipuler
    question.attendu.forEach(el=> {
            rep.push(pool[el]);
            rep[(rep.length - 1)].label = el; //rajout de l'attribut label sur la réponse
            delete pool[el]; 
        }); //On prend toutes les réponses attendues et on les fourre dans rep - on les supprime de pool au passage
    
    //Si on utilise pas le pool de la question, on va en récupérer dans le pool global
    if(!useobject) {
        let nbrep = randInterval(5, 8); //on veut un pool de 5 à 8 réponses au final
        keys = melange(Object.keys(pool)); //on mélange les clés restantes de pool (sans les réponses attendues, donc)
        while(rep.length < nbrep) { //tant que l'array de retour ne fait par la taille attendue
            rep.push(pool[keys[0]]); //on prend la première clé du pool restant
            rep[(rep.length - 1)].label = keys[0]; //rajout de l'attribut label sur la réponse
            keys.splice(0, 1); //et on la vire
        }
    }
    
    return melange(rep);
}

//Checke les réponses et affiche le résultat
async function checkReponse() {
    //On désactive la question
    disableQuestion();

    //Suppression des cartes non sélectionnées
    let nope = document.querySelectorAll("#pool-cartes .carte-reponse:not(.selected)");
    nope.forEach((el)=>{
        el.style.display = "none";
    });
    //récupération des cartes sélectionnées
    let ok = document.querySelectorAll("#pool-cartes .carte-reponse.selected");
    nb_ok = ok.length;
    ok.forEach((el)=>{
        el.style.left= 0;
        el.style.transform = "";
    });
    poolc.classList.add("finish");
    poolc.style.display = "flex";

    //On passe les mains en statut loading -> tournantes sur elles même
    let mains = document.querySelectorAll("#mg, #md");
    mains.forEach(el => {
        el.classList.remove("idle");
        el.classList.add("result");
        el.classList.add("loading");
    });

    //On vérifie la réponse : toutes les réponses attendues doivent être dans rep_courante, et pas de réponse en plus
    is_right = (rep_courante.length == question.attendu.length && 
        question.attendu.every((el) => {
            return (rep_courante.indexOf(el) !== -1);
        })
    );
    if(is_right) nbgood++;

    //On détermine quelle main va afficher le résultat
    let win = null, loss = null;
    if(randInterval(1, 2) == 1) {
         win = mg; loss = md;
    }
    else {
        win = md; loss = mg;
    }
    await sleep(2); //tempo pour l'anim loading

    //Affichage résultat
    win.classList.add("hl"); //ça grossit la main
    win.classList.remove("loading");
    loss.classList.remove("loading");

    //affichage de la carte résultat
    let carteres = document.createElement("div");
    carteres.classList.add("disp-result");
    carteres.style.backgroundColor = (is_right) ? "var(--vert)" : "var(--rouge)";
    carteres.innerHTML = (is_right) ? "Bonne réponse" : "Mauvaise réponse";

    document.querySelector(".main-container.hl .carte .inner").style.display = "none"; //on masque la carte natixis
    document.querySelector(".main-container.hl .carte").appendChild(carteres); //on affiche la carte résultat
    
    await sleep(2); //tempo
    afficheResultat();
}

//Désactive la question courante : cartes inactives, timer stoppé, remplacement du bouton répondre
function disableQuestion() {
    cartes_clickable = false; //On rend les cartes non clickables
    stopTimer(); //Stop le timer avant de le virer
    document.querySelector("#question .question-footer").style.display ="none"; //on masque le footer le temps que l'anim se fasse
    document.querySelector("#timer-reponse").style.display = "none"; //plus de timer
    dquest.style.opacity = "0.3";
    dquest.style.top = "60%";
    //switch de bouton
    const btn_check = document.getElementById("btn-check");
    const btn_next = document.getElementById("btn-next");
    btn_check.disabled = true;
    btn_check.style.display = "none";
    btn_next.disabled = true;
    btn_next.style.display = "inline-block";
    //Désactive le hover sur les cartes
    document.querySelectorAll("#pool-cartes .carte-reponse").forEach(el=>el.classList.add("disabled"));
}

//Affiche le résultat final de la question
async function afficheResultat() {
    document.querySelector("#question .question-footer").style.display = "flex"; //rebonjour le footer
    dquest.style.opacity="1";
    document.getElementById("btn-next").disabled = false; //Bouton next actif

    dquest.style.top = "40%";

    //Mise à jour du contenu de la modale
    let inner = document.querySelector("#question .question-inner");
    inner.innerHTML = "";
    inner.classList.add("resultat");

    //Reprise du texte de la question
    let txtq = document.createElement("p");
    txtq.style.textAlign = "left";
    txtq.style.fontSize = "0.9em";
    txtq.style.margin = "1vh auto";
    txtq.innerHTML = question.question;
    inner.appendChild(txtq);

    //Timeout sur la réponse, on va afficher le message approprié
    if(is_timeout) {
        let txttm = document.createElement("p");
        txttm.style.color = "orange";
        txttm.style.fontSize = "1.2em";
        txttm.style.margin = "1vh auto";
        txttm.innerHTML = "Temps écoulé !";
        inner.prepend(txttm);
        let txtir = document.createElement("div");
        txtir.innerHTML = "<p><strong>Les bonnes réponses étaient :</strong></p>";
        inner.appendChild(txtir);
    }
    else {
        //Ou sinon on va afficher le message en fonction du statut vrai/faux de la réponse
        let txt = (is_right) ? "Bonne réponse" : "Mauvaise réponse";
        let clr = (is_right) ? "var(--vert)" : "var(--rouge)";
        let more = (is_right) ? "Les bonnes réponses étaient effectivement :" : "Les bonnes réponses étaient :";
        let txtir = document.createElement("div");
        let ht = "<p style='color:"+clr+"; margin:1vh auto;'>"+txt+"</p><p class='muted'>"+more+"</p>";
        txtir.innerHTML = ht;
        inner.appendChild(txtir);
    }
    
    //Affichage des bonnes réponses
    let ul = document.createElement("ul");
    let pool = (typeof question.reponses !== "undefined") ? question.reponses : pool_reponses; //où est ce qu'on pioche les bonnes réponses
    question.attendu.forEach(reponse=>{
        let li = document.createElement("li");
        let clr = (typeof pool[reponse].type !== "undefined") ? types_pool[pool[reponse].type].couleur : "black"; //Couleur de fond de carte en fonction de sa famille, si question1 : texte noir
        let ht = "<strong style='color:"+clr+";'>"+pool[reponse].reponse+"</strong>";
        if(typeof pool[reponse].addon !== "undefined") { ht = ht+" : "+pool[reponse].addon; } //Si la réponse a un texte supplémentaire
        li.innerHTML = ht;
        ul.appendChild(li);
    });
    inner.appendChild(ul);
}

//Ajoute ou supprime une réponse des réponses courante
function toggleRep(label) {
    let p = rep_courante.indexOf(label);
    if(p === -1) {
        rep_courante.push(label);
    }
    else {
        rep_courante.splice(p, 1);
    }
    return (p !== -1);
}

//Appelé dans timer.js quand le temps est écoulé
function tempsEcoule() {
    timer_en_route = false; //On stoppe le timer
    is_timeout = true; //On indique le timeout pour la réponse
    disableQuestion(); //appel pour les boutons et timer affiché ou non
    afficheResultat(); //Affichage du réultat
}

//Gère l'écran de fin de jeu
function finish() {
    //modal du lien retour
    const modal = document.getElementById("modal-endgame");
    document.getElementById("nbgood").innerHTML = nbgood;
    document.getElementById("nbquest").innerHTML = questions.length;
    modal.style.display = "block";
    document.getElementById("plateau").classList.add("is-blur");
    dice_clickable = false;
}
