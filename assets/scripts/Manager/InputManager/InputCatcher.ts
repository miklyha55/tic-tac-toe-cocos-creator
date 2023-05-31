import GameEvent from "../../Enum/GameEvent";
import InputDirection from "./InputDirection";
import InputType from "./InputType";

import { _decorator, Component, Node, view, EventTouch } from "cc";
const { ccclass, property } = _decorator;

@ccclass("InputCatcher")
export class InputCatcher extends Component {
    @property({ type: InputDirection }) direction: number = InputDirection.None;
    @property(Component) target: Component = null;

    onEnable() {
        this._handleEvents(true);
    }

    onDisable() {
        this._handleEvents(false);
    }

    private _handleEvents(active: boolean) {
        const func: string = active ? "on" : "off";

        this.node[func](Node.EventType.TOUCH_START, this.onDown, this);
        this.node[func](Node.EventType.TOUCH_MOVE, this.onMove, this);
        this.node[func](Node.EventType.TOUCH_END, this.onUp, this);
        this.node[func](Node.EventType.TOUCH_CANCEL, this.onUp, this);
    }

    private onDown(event: EventTouch) {
        view.emit(GameEvent.INPUT, InputType.Down, this.direction, event.touch, this, this.target);
    }

    private onMove(event: EventTouch) {
        view.emit(GameEvent.INPUT, InputType.Move, this.direction, event.touch, this, this.target);
    }

    private onUp(event: EventTouch) {
        view.emit(GameEvent.INPUT, InputType.Up, this.direction, event.touch, this, this.target);
    }
}
