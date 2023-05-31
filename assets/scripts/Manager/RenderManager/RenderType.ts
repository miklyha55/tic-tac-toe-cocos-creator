import { Enum } from "cc";

const RenderType = Enum({
    None: 0,
    Default: 10,
    Menu: 20,
    Game: 30,
    Bg: 60,
    Grid: 70,
    Cell: 80,
    Buttons: 40,
    Title: 50,
    Text: 90,
});

export default RenderType;
