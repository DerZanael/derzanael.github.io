const cartes_chance = [
    {
        question: "Avancez de 2 cases",
        evt: 2
    },
    {
        question: "Reculez de 3 cases",
        evt: -3
    }
    ,
    {
        question: "Votre compte steam s'est fait hack, reculez de 4 cases",
        evt: -4
    },
    {
        question: "Vous avez gagné une PS5 grâce à un jeu à gratter, avancez de 4 cases",
        evt: 4
    },
    {
        question: "<em>Joker !</em><br> vous pouvez appeler Shig pour vous aider à répondre à une question",
        evt: 0,
        bonus: "hasjoker"
    },
    {
        question: "Votre Micromania est fermé, reculez de 2 cases",
        evt: -2
    },
    {
        question: "Avancez de 3 cases",
        evt: 3
    },
    {
        question: "Relancez le dé et reculez d'autant de cases que le résultat",
        evt: 0,
        bonus: "diceroll-neg"
    },
    {
        question: "Reculez de 2 cases",
        evt: -2
    }
];
let discard_chance = [];
let pile_chance = duplicArray(cartes_chance);
