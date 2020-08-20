const cartes_question = [
    {
        question:"Quels jeux sont disponibles sur PS3 ET PS4&nbsp;:",
        reponses: [
            "Persona 5",
            "Yakuza 0",
            "Assassin's Creed : Black Flags",
            "Ghost of Tsushima",
            "Killzone 3"
        ],
        attendu: [0, 1]
    },
    {
        question:"On est en 1993, vous êtes bloqué dans Zelda 3. Vous appelez&nbsp;:",
        reponses: [
            "La hotline Nintendo",
            "3615 ULLA",
            "3615 TIPS"
        ],
        attendu: [0,2]
    },
    {
        question:"Lesquelles de ces licences sont exclusives à Nintendo&nbsp;:",
        reponses: [
            "Megaman",
            "Pokemon",
            "Duck Tales",
            "Astral Chain",
            "Sonic",
        ],
        attendu: [1, 3]
    },
    {
        question:"Je me rends à la fnac lundi matin. Elle est fermée.<br>Que faire&nbsp;?",
        reponses: [
            "Je consulte le site fnac.com",
            "Je rentre chez moi dépité",
            "J’appelle la police"
        ],
        attendu: [1]
    },
    {
        question:"Je souhaite revendre mon jeu, sorti le mois dernier, à Micromania, ils me le reprennent 8 euros. Que faire&nbsp;?",
        reponses: [
            "J’appelle le service relation client",
            "J’appelle la police",
            "Je prends les 8 euros d'un air dégouté"
        ],
        attendu: [2]
    },
    {
        question:"Lesquelles de ces offres sont une grosse arnaque&nbsp;?",
        reponses: [
            "XboxLive",
            "PSN",
            "Nintendo Online"
        ],
        attendu: [0,1,2]
    },
    {
        question:"The Witcher III a proposé des contenus post-launch, lesquels&nbsp;?",
        reponses: [
            "DLC gratuits",
            "Microtransactions cosmétiques",
            "Extensions payantes"
        ],
        attendu: [0, 2]
    },
    {
        question:"Sonic apparait dans les jeux suivants&nbsp;",
        reponses: [
            "Sonic & Knuckles",
            "Sonic Spinball",
            "Sonic Heroes"
        ],
        attendu: [0,1,2]
    },
    {
        question:"Pourquoi avez-vous perdu à Street&nbsp;? ",
        reponses: [
            "J'avais le soleil dans l'oeil",
            "C'est pas ma manette",
            "Tu spammes le shoryuken là !"
        ],
        attendu: [0,1,2]
    },
    {
        question:"Le personnage Palutena apparait dans les licences suivantes&nbsp;",
        reponses: [
            "Kid Ikarus",
            "Mario Strikers",
            "Smash Bros"
        ],
        attendu: [0,2]
    },
    {
        question:"A quoi servent les anneaux&nbsp;?",
        reponses: [
            "Scoring et points et de vie",
            "A faire joli sur l'écran",
            "A se mettre dans le nez"
        ],
        attendu: [0]
    },
    {
        question:"Que signifie l’acronyme COD&nbsp;?",
        reponses: [
            "Catin Obtue Dévergondée",
            "Christian of Duty",
            "Call of Duty"
        ],
        attendu: [2]
    },
    {
        question:"Qu’est-ce qu’une red pot&nbsp;?",
        reponses: [
            "De la drogue afghane",
            "Une potion de soin dans Ragnarok Online",
            "Le Meilleur Groupe de Guitar Hero"
        ],
        attendu: [1]
    },
    {
        question:"Quelle action a vraiment la classe dans Overwatch&nbsp;?",
        reponses: [
            "Appuyer sur Q avec Reaper",
            "Charger son ult de Junkrat de l'autre bout de la map",
            "NERF THIS vaguement dans la bonne direction",
            "Boop des mecs sur Illios"
        ],
        attendu: [3]
    },
    {
        question:"Dans Final Fantasy VII, qui est la best girl&nbsp;?",
        reponses: [
            "Barrett",
            "Tifa",
            "Aeris"
        ],
        attendu: [0]
    }
];
let discard_question = [];
let pile_question = duplicArray(cartes_question);
