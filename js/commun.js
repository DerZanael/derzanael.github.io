//Duplique un array et le mélange au passage
function duplicArray(a) {
    return melange(duplique(a));
}
//Duplique un array
function duplique(a) {
    return JSON.parse(JSON.stringify(a));
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

//Roll le dé6 et retourne le résultat
function roll () {
    let max = (randInterval(1, 10) > 7) ? 6 : 3; //console.log(max);
    return randInterval(1, max);
	//return Math.ceil((Math.floor(Math.random() * 10) + 1) * 0.6); //Résultat de 1 à 10, multiplié par 0.6, arrondi à l'entier supérieur
}
//Tire un entier entre min et max inclus
function randInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//Active le bouton joker + gestion de l'event sur le deuxieme clic
function activeJoker() {
    hasjoker = true;
    dice_clickable = true;
    joker.classList.add("available");
    joker.addEventListener("click", function(){
        if(hasjoker && joker.classList.contains("available")) {
            if(!joker.classList.contains("opened")) {
                joker.classList.add("opened");
            }
            else {
                joker.classList.remove("available");
                joker.classList.remove("opened");
                joker.classList.add("called");
                joker.removeEventListener("click", ()=>{return false;});
                hasjoker = false;
            }
        }
    });
}
