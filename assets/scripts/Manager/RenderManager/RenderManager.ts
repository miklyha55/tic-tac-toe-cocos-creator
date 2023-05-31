import RenderType from "./RenderType";
import GameEvent from "../../Enum/GameEvent";

import { _decorator, Component, view, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("RenderManager")
export class RenderManager extends Component {
    @property({ type: GameEvent }) event: number = GameEvent.NONE;
    private _orders: Map<number, Node> = new Map();

    onEnable() {
        this._handleSubscription(true);
    }

    onDisable() {
        this._handleSubscription(false);
    }

    onLoad() {
        this._setRenderType();
    }

    private _handleSubscription(active: boolean) {
        const func: string = active ? "on" : "off";
        
        view[func](this.event, this.onGetGameObjectParent, this);
    }

    private _setRenderType() {
        for (let i in RenderType) {
            const key = RenderType[i];
            if (key !== RenderType.None) {
                const parent: Node = new Node(i + "Parent");

                parent.parent = this.node;
                this._orders.set(key, parent);
            }
        }
    }

    private _getParent(key: number) {
        let parent: Node = this._orders.get(key);

        if (!(parent instanceof Node)) {
            parent = this._orders.get(RenderType.Default);
        }

        return parent;
    }

    private onGetGameObjectParent(key: number, callback: (parent: Node) => void) {
        callback instanceof Function && callback(this._getParent(key));
    }
}
