import GameEvent from "../../../Enum/GameEvent";
import GameObjectType from "../../GameObjectManager/GameObjectType";
import { InputCatcher } from "../InputCatcher";
import InputCommand from "./InputCommand";
import { Component, Touch, view } from "cc";

export default class ButtonRandCommand extends InputCommand {
	onDown(touch: Touch, place: InputCatcher, target: Component) {
		view.emit(GameEvent.CHANGE_LEVEL, GameObjectType.Game);
	}

	onUp(touch: Touch, place: InputCatcher, target: Component) {}
	onMove(touch: Touch, place: InputCatcher, target: Component) {}
}
