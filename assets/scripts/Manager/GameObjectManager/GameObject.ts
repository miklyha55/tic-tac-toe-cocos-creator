import RenderType from "../RenderManager/RenderType";

import { _decorator, Component } from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameObject")
export default class GameObject extends Component {
    @property({ type: RenderType }) renderType: number = RenderType.Default;

    public active: boolean = false;
    public type: number = 0;
}
