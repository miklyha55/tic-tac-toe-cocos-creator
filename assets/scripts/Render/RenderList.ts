import RenderType from "./RenderType";
import GameEvent from "../Enum/GameEvent";

import { _decorator, Component, view, Node } from "cc";
const { ccclass } = _decorator;

@ccclass("RenderList")
export class RenderList extends Component {
    private _orders: Array<Node> = [];

    onEnable() {
        this._handleSubscription(true);
    }

    onDisable() {
        this._handleSubscription(false);
    }

    onLoad() {
        this._setRenderType();
    }

    _handleSubscription(active: boolean) {
        const func: string = active ? "on" : "off";

        view[func](GameEvent.GET_GAME_OBJECT_PARENT, this.onGetGameObjectParent, this);
    }

    _setRenderType() {
        for (let i in RenderType) {
            const key = RenderType[i];
            if (key !== RenderType.None) {
                const parent: Node = new Node(i + "Parent");

                parent.parent = this.node;
                this._orders[key] = parent;
            }
        }
    }

    _getParent(key: number) {
        let parent: Node = this._orders[key];

        if (!(parent instanceof Node)) {
            parent = this._orders[RenderType.Default];
        }

        return parent;
    }

    onGetGameObjectParent(key: number, callback: (arg: Node) => void) {
        callback instanceof Function && callback(this._getParent(key));
    }
}
