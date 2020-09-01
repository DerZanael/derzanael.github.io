const questions = [
    {
        question: "Quel est, selon-vous, un élément déclencheur à la création d'un nouveau jeu vidéo ?",
        
        reponses: {
            "greed": {
                reponse: "L'avarice",
                addon: "Les sous-sous dans la po-poche"
            },
            "idee": {
                reponse: "Une idée lumineuse",
                addon: "Desfois, les gens ont un éclair de génie pour vous délester de votre argent"
            },
            "demande": {
                reponse: "Demande des joueurs",
                addon: "Parce qu'ils ont parfois trop d'argent"
            },
            "marche": {
                reponse: "Le marché",
                addon: "La concurrence fait des bénéfices, pourquoi pas les autres ?"
            }
        },
        attendu: [
            "greed", "idee", "demande", "marche"
        ]
    },
    {
        question: "A qui doit-on Nier:Automata ?",
        attendu: [
            "platinum", "sqe"
        ]
    },
    {
        question: "Qui sont des gros batards avides ?",
        attendu: [
            "activ", "ea"
        ]
    },
    {
        question: "On peut avoir du fun dans tokyo grâce à :",
        attendu: [
            "yakuza", "sega"
        ]
    },
    {
        question: "Ils sont là depuis des années et ont déja sauvé le jeu vidéo au moins une fois",
        attendu: [
            "nintendo"
        ]
    },
    {
        question: "A cause de qui les jeux sont ils blindés de micro-transactions dorénavant ?",
        attendu: [
            "bethedsa", "joueurs"
        ]
    },
    {
        question: "Qui nous fait raquer malhonnètement ?",
        attendu: [
            "presse"
        ]
    },
    {
        question: "Qui est tombé en désuétude ?",
        attendu: [
            "blizzard", "bethedsa", "ea", "valve"
        ]
    },
    {
        question: "Qui est bien en forme ?",
        attendu: [
            "cdpred", "riot", "respawn", "capcom"
        ]
    },
    {
        question: "Qui ferait bien d'arrêter les abus ?",
        attendu: [
            "steam", "epic"
        ]
    }
];

const types_pool = {
    "dev": {
        titre: "Développeurs",
        couleur: "#db277b"
    },
    "publish": {
        titre: "Editeurs",
        couleur: "#7c87a3"
    },
    "tiers": {
        titre: "Acteurs extérieurs",
        couleur: "#6c0e9c"
    }
};

const pool_reponses = {
    ////////// DEVS
    "platinum": {
        reponse: "Platinum Games",
        type: "dev"
    },
    "yakuza": {
        reponse: "RGG Studios",
        type: "dev"
    },
    "respawn": {
        reponse: "Respawn",
        type: "dev"
    },
    "blizzard": {
        reponse: "Blizzard",
        type: "dev"
    },
    "capcom": {
        reponse: "Capcom",
        type: "dev"
    },
    "cdpred": {
        reponse: "CD Projekt Red",
        type: "dev"
    },
    "epic": {
        reponse: "Epic Games",
        type: "dev"
    },

    //EDITEURS
    "nintendo": {
        reponse: "Nintendo",
        type: "publish"
    },
    "sega": {
        reponse: "SEGA",
        type: "publish"
    },
    "sqe": {
        reponse: "Square Enix",
        type: "publish"
    },
    "valve": {
        reponse: "Valve",
        type: "publish"
    },
    "riot": {
        reponse: "Riot Games",
        type: "publish"
    },
    "namco": {
        reponse: "Bandai-Namco",
        type: "publish"
    },
    "activ": {
        reponse: "Activision-Blizzard",
        type: "publish"
    },
    "ea": {
        reponse: "Electronic Arts",
        type: "publish"
    },
    "gog": {
        reponse: "GOG",
        type: "publish"
    },
    "bethedsa": {
        reponse: "Bethedsa",
        type: "publish"
    },
    
    //////////// AUTRES
    "presse": {
        reponse: "La presse",
        type: "tiers"
    },
    "joueurs": {
        reponse: "Le joueurs",
        type: "tiers"
    },
    "steam": {
        reponse: "Steam",
        type: "tiers"
    },
    "kickstarter": {
        reponse: "Kickstarter",
        type: "tiers"
    }
}
