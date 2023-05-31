import GameObjectType from "./GameObjectType";
import GameEvent from "../../Enum/GameEvent";
import GameObject from "./GameObject";

import { _decorator, Component, Prefab, view, Node } from "cc";
import { GameObjectFactory } from "./Factory";
const { ccclass, property } = _decorator;

interface IROGameObjectHelper {
    readonly type: number,
    readonly prefab: Prefab
}

@ccclass("GameObjectHelper")
class GameObjectHelper {
    @property({ type: Prefab }) prefab: Prefab = null;
    @property({ type: GameObjectType }) type: number = GameObjectType.None;
}

@ccclass("GameObjectManager")
export class GameObjectManager extends Component {
    @property({ type: GameObjectHelper }) data: Array<IROGameObjectHelper> = [];

    private _data: Map<number, Prefab> = new Map();
    private _poolObjectArray: Map<number, GameObject> = new Map();

    onEnable() {
        this._handleSubscription(true);
    }

    onDisable() {
        this._handleSubscription(false);
    }

    onLoad() {
        if (this.data.length) {
            for (const element of this.data) {
                this._data.set(element.type, element.prefab);
            }
        }
    }

    _handleSubscription(active: boolean) {
        const func: string = active ? "on" : "off";

        view[func](GameEvent.CREATE_GAME_OBJECT, this.onCreateGameObject, this);
        view[func](GameEvent.GET_GAME_OBJECT, this.onGetGameObject, this);
        view[func](GameEvent.REMOVE_GAME_OBJECT, this.onRemoveGameObject, this);
    }

    onRemoveGameObject(type: number) {
        const poolObject: GameObject = this._poolObjectArray.get(type);

        if (!poolObject) {
            return;
        }

        poolObject.active = false;
        poolObject.node.active = false;
    }
    
    onGetGameObject(type: number, callback: (gameObject: GameObject) => void) {
        callback instanceof Function && callback(this._poolObjectArray.get(type));
    }

    onCreateGameObject(type: number, callback: (poolObject: GameObject) => void, isUi: boolean = false) {
        const prefab: Prefab = this._data.get(type);
        const checkedPoolObject: GameObject = this._poolObjectArray.get(type);

        let poolObject: GameObject = null;

        if(checkedPoolObject) {
            poolObject = checkedPoolObject;

            poolObject.active = true;
            poolObject.node.active = true;
        } else {
            GameObjectFactory.CreateGameObject(prefab, (node, gameObject) => {
                const event: number = isUi ? GameEvent.GET_UI_OBJECT_PARENT : GameEvent.GET_GAME_OBJECT_PARENT;
    
                view.emit(event, gameObject.renderType, (parent: Node) => {
                    node.parent = parent;
                });
    
                gameObject.active = true;
                gameObject.type = type;
                poolObject = gameObject;

                this._poolObjectArray.set(type, gameObject);
            });
        }

        console.log(this._poolObjectArray);

        callback instanceof Function && callback(poolObject);
    }
}
