import GameEvent from "../../../Enum/GameEvent";
import { InputCatcher } from "../InputCatcher";
import InputCommand from "./InputCommand";
import { Component, Touch, view } from "cc";

export default class ButtonRandCommand extends InputCommand {
	onDown(touch: Touch, place: InputCatcher, target: Component) {
		view.emit(GameEvent.UPDATE_GRIG_DATA);
		view.emit(GameEvent.SHAKE_CAMERA);
	}

	onUp(touch: Touch, place: InputCatcher, target: Component) {}
	onMove(touch: Touch, place: InputCatcher, target: Component) {}
}
