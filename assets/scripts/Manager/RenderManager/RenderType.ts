import { Enum } from "cc";

const RenderType = Enum({
    None: 0,
    Default: 10,
    Menu: 20,
    Game: 30,
    Bg: 60,
    Buttons: 40,
    Title: 50,
});

export default RenderType;
