import { Enum } from "cc";

const GameObjectType = Enum({
    None: 0,
    Menu: 1,
    Game: 2,
    Title: 3,
    ButtonStart: 4,
    ButtonRand: 5,
    ButtonCheck: 6,
    Bg: 7,
    Grid: 8,
    Cell: 9,
    Text: 10,
});

export default GameObjectType;
