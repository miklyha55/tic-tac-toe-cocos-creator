import { _decorator, Component, view, warn } from 'cc';
import GameEvent from '../../Enum/GameEvent';
import GameObjectType from '../GameObjectManager/GameObjectType';
import GameObject from '../GameObjectManager/GameObject';
import { Level } from './Level';

const { ccclass, property } = _decorator;

@ccclass('LevelManager')
export class LevelManager extends Component {
    @property({ type: GameObjectType }) currentLevel: number = GameObjectType.None;
    private _currentLevelInfo: GameObject = null;
    private _gameObjectArray: Array<GameObject> = [];

    onEnable() {
        this._handleSubscription(true);
    }

    onDisable() {
        this._handleSubscription(false);
    }

    start() {
        this.onChangeLevel(this.currentLevel);
    }

    private _handleSubscription(active: boolean) {
        const func: string = active ? "on" : "off";

        view[func](GameEvent.CHANGE_LEVEL, this.onChangeLevel, this);
    }

    private onChangeLevel(levelType: number) {
        if (this._currentLevelInfo) {
            view.emit(GameEvent.REMOVE_GAME_OBJECT, this._currentLevelInfo.type);

            if(this._gameObjectArray.length) {
                this._gameObjectArray.forEach(element => {
                    view.emit(GameEvent.REMOVE_GAME_OBJECT, element);
                });
            }
        }

        view.emit(GameEvent.CREATE_GAME_OBJECT, levelType, (gameObject: GameObject) => {
            this._currentLevelInfo = gameObject;

            const levelObject: Level = gameObject.node.getComponent(Level);

            if(!levelObject) {
                warn("Add Level class");
                return;
            }

            levelObject.createWorld((gameObjectArray) => {
                this._gameObjectArray = gameObjectArray;
            });
        });
    }
}

