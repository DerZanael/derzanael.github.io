let pawn_pos = 0; //Position du pion

const cases = [
    {
        //bottom left
        type:"start",
        dir: "up"
    },
    {
        type:"question",
        dir: "up",
    },
    {
        type:"chance",
        dir: "up"
    },
    {
        type:"question",
        dir:"up",
    },
    {
        type:"question",
        dir: "up"
    },
    {
        //up left
        type: "shig",
        dir: "right"
    },
    {
        type: "question",
        dir: "right"
    },
    {
        type: "chance",
        dir: "right"
    },
    {
        type: "question",
        dir: "right"
    },
    {
        type: "question",
        dir: "right"
    },
    {
        //up right
        type:"shig",
        dir: "down"
    },
    {
        type: "question",
        dir: "down"
    },
    {
        type: "question",
        dir: "down"
    },
    {
        type: "chance",
        dir: "down"
    },
    {
        type: "question",
        dir: "down"
    },
    {
        //bottom right
        type: "shig",
        dir: "left"
    },
    {
        type: "chance",
        dir: "left"
    },
    {
        type: "question",
        dir: "left"
    },
    {
        type: "question",
        dir: "left"
    },
    {
        // LIGNE D'ARRIVEE !
        type: "finish",
        dir: null,
        event: "endgame"
    }
];
