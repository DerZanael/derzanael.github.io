const cartes_shig = [
    {
        question:"Quelles sont les technos utilisées par Shig ?",
        reponses: [
            "Javascript",
            "React",
            "PHP",
            "CSS",
            "Symfony",
            "Python",
            "NGinX"
        ],
        attendu: [0, 2, 3, 4]
    },
    {
        question:"Quels sports a pratiqué Shig ?",
        reponses: [
            "Tennis",
            "Karate",
            "Foutebale",
            "Escalade",
            "Roller aggressif",
        ],
        attendu: [0, 2, 4]
    },
    {
        question:"Combien de consoles possède Shig actuellement ?",
        reponses: [
            "Moins de 3",
            "Entre 3 et 5",
            "Entre 6 et 8",
            "Plus que 9"
        ],
        attendu: [1]
    },
    {
        question:"Combien de platinium a eu Shig ?",
        reponses: [
            "Seulement 1",
            "Entre 2 et 5",
            "Entre 5 et 8",
            "Entre 8 et 12",
            "Des tas"
        ],
        attendu: [0]
    },
    {
        question:"Combien de jeux contient de backlog de Shig ? ?",
        reponses: [
            "Moins de 10",
            "Entre 10 et 15",
            "Entre 15 et 25",
            "Beaucoup trop"
        ],
        attendu: [3]
    },
    {
        question:"D'où vient le nom Shigure ?",
        reponses: [
            "Je réponds Fruit Basket parceque je suis un [chien levant la patte]",
            "De Suikoden V, le ninja nonchalant qui fume comme un pompier",
            "De Yû Yû Hakusho parceque <raisons>",
            "Je sais pas, c'est un [pictogramme compliqué] de toute façon",
        ],
        attendu: [2]
    }
];

let discard_shig = [];
let pile_shig = duplicArray(cartes_shig);
