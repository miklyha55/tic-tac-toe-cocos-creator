import GameEvent from "../../Enum/GameEvent";
import ButtonCheckCommand from "./Commands/ButtonCheckCommand";
import ButtonRandCommand from "./Commands/ButtonRandCommand";
import ButtonStartCommand from "./Commands/ButtonStartCommand";
import InputCommand from "./Commands/InputCommand";
import { InputCatcher } from "./InputCatcher";
import InputDirection from "./InputDirection";
import InputType from "./InputType";

import { _decorator, Component, view, Touch } from "cc";
const { ccclass } = _decorator;

@ccclass("InputManager")
export class InputManager extends Component {

    private commands: Array<InputCommand> = [];
    private _firstTap: boolean = true;

    onLoad() {
        view.on(GameEvent.INPUT, this.onInput, this);

        this.commands[InputDirection.ButtonStart] = new ButtonStartCommand();
        this.commands[InputDirection.ButtonRand] = new ButtonCheckCommand();
        this.commands[InputDirection.ButtonCheck] = new ButtonRandCommand();
    }

    onInput(
        type: number,
        direction: number,
        touch: Touch,
        place: InputCatcher,
        target: Component
    ) {
        const command: InputCommand = this.commands[direction];

        if (this._firstTap) {
            this._firstTap = false;

            view.emit(GameEvent.FIRST_PRESSED);
        }

        switch (type) {
            case InputType.Down:
                if (command) {
                    command.onDown(touch, place, target);
                }
                break;

            case InputType.Move:
                if (command) {
                    command.onMove(touch, place, target);
                }
                break;

            case InputType.Up:
                if (command) {
                    command.onUp(touch, place, target);
                }
                break;
        }
    }
}
