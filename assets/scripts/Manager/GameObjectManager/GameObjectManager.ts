import GameObjectType from "./GameObjectType";
import GameEvent from "../../Enum/GameEvent";
import GameObject from "./GameObject";

import { _decorator, Component, Node, Prefab, view } from "cc";
import { GameObjectFactory } from "./Factory";
const { ccclass, property } = _decorator;

interface IROGameObjectHelper {
    readonly type: number,
    readonly data: Prefab
}

@ccclass("GameObjectHelper")
class GameObjectHelper {
    @property({ type: GameObjectType }) type: number = GameObjectType.None;
    @property({ type: Prefab }) data: Prefab = null;
}

@ccclass("GameObjectManager")
export class GameObjectManager extends Component {
    @property({ type: GameObjectHelper }) data: Array<IROGameObjectHelper> = [];

    private _data: Array<Prefab> = [];

    onEnable() {
        this._handleSubscription(true);
    }

    onDisable() {
        this._handleSubscription(false);
    }

    onLoad() {
        if (this.data.length) {
            for (const element of this.data) {
                this._data[element.type] = element.data;
            }
        }
    }

    _handleSubscription(activate) {
        const func: string = activate ? "on" : "off";

        view[func](GameEvent.CREATE_GAME_OBJECT, this.onCreateGameObject, this);
    }

    onCreateGameObject(type: number, callback: (node: Node, gameObject: GameObject) => void) {
        const prefab: Prefab = this._data[type];

        GameObjectFactory.CreateGameObject(prefab, (node, gameObject) => {
            if (gameObject) {
                view.emit(GameEvent.GET_GAME_OBJECT_PARENT, gameObject.renderType, (parent) => {
                    node.parent = parent;
                });

                gameObject.activate = false;
                gameObject.type = type;
            }
        });
    }
}
