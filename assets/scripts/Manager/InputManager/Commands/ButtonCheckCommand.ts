import GameEvent from "../../../Enum/GameEvent";
import { InputCatcher } from "../InputCatcher";
import InputCommand from "./InputCommand";
import { Component, Touch, view } from "cc";

export default class ButtonCheckCommand extends InputCommand {
	onDown(touch: Touch, place: InputCatcher, target: Component) {
		view.emit(GameEvent.CHECK_WINER);
	}

	onUp(touch: Touch, place: InputCatcher, target: Component) {}
	onMove(touch: Touch, place: InputCatcher, target: Component) {}
}
