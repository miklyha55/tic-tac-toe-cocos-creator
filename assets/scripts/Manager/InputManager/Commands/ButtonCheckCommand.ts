import GameEvent from "../../../Enum/GameEvent";
import GameObjectType from "../../GameObjectManager/GameObjectType";
import { InputCatcher } from "../InputCatcher";
import InputCommand from "./InputCommand";
import { Component, Touch, view } from "cc";

export default class ButtonCheckCommand extends InputCommand {
	onDown(touch: Touch, place: InputCatcher, target: Component) {
		console.log(321);
	}

	onUp(touch: Touch, place: InputCatcher, target: Component) {}
	onMove(touch: Touch, place: InputCatcher, target: Component) {}
}
