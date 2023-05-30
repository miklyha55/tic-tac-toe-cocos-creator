import { _decorator, Component, Touch } from "cc";
import { InputCatcher } from "../InputCatcher";

const { ccclass } = _decorator;

@ccclass("InputCommand")
export default class InputCommand extends Component {
    onDown(touch: Touch, place: InputCatcher, target: Component) {}
    onMove(touch: Touch, place: InputCatcher, target: Component) {}
    onUp(touch: Touch, place: InputCatcher, target: Component) {}
}
