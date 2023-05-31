import { _decorator, CCBoolean, Component, view } from 'cc';
import GameEvent from '../../Enum/GameEvent';
import GameObjectType from '../GameObjectManager/GameObjectType';
import GameObject from '../GameObjectManager/GameObject';

const { ccclass, property } = _decorator;
@ccclass("LevelHelper")
class LevelHelper {
    @property({ type: GameObjectType }) type: number = GameObjectType.None;
    @property({}) isUi: boolean = false;
}

@ccclass('Level')
export class Level extends Component {
    @property({ type: [LevelHelper] }) levelHelperArray: Array<LevelHelper> = [];

    createWorld(callback: (levelHelperArray: Array<GameObject>) => void) {
        const levelHelperArray: Array<GameObject> = [];

        if(this.levelHelperArray.length) {
            this.levelHelperArray.forEach(levelHelper => {
                view.emit(GameEvent.CREATE_GAME_OBJECT, levelHelper.type, (gameObject: GameObject) => {
                    levelHelperArray.push(gameObject);
                }, levelHelper.isUi);
            });
        }

        callback instanceof Function && callback(levelHelperArray);
    }
}

