import { RichText, _decorator, view } from 'cc';
import { Level } from '../Manager/LevelManager/Level';
import GameEvent from '../Enum/GameEvent';
import { Cell } from '../Manager/GridManager/Cell';
import SpriteType from '../Manager/GridManager/SpriteType';
import GameObject from '../Manager/GameObjectManager/GameObject';
import GameObjectType from '../Manager/GameObjectManager/GameObjectType';
const { ccclass } = _decorator;

const enum TEXT_TYPE {
    Never = "Никто не выиграл",
    Wizzard = "Выиграл волшебник",
    Enemy = "Выиграл монстр",
    All = "Ничья",
}

@ccclass('LevelTicTacToy')
export class LevelTicTacToy extends Level {
    private cellArray: Array<Cell> = [];

    onEnable() {
        this._handleSubscription(true);
    }

    onDisable() {
        this._handleSubscription(false);
    }

    private _handleSubscription(active: boolean) {
        const func: string = active ? "on" : "off";

        view[func](GameEvent.CHECK_WINER, this.onCheckWinner, this);
    }

    private onCheckWinner() {
        view.emit(GameEvent.GET_GRID_DATA, (cellArray: Array<Cell>) => {
            this.cellArray = cellArray;
        })

        const isWizzars: boolean = this._checkWiner(SpriteType.Wizard);
        const isEnemy: boolean = this._checkWiner(SpriteType.Enemy);
        
        this._setText(isWizzars, isEnemy);
    }

    private _setText(isWizzars: boolean, isEnemy: boolean) {
        let textObject: GameObject = null;

        view.emit(GameEvent.GET_GAME_OBJECT, GameObjectType.Text, (gameObject: GameObject) => {
            textObject = gameObject[0];
        });

        const text: RichText = textObject.node.getComponent(RichText);

        if(isWizzars && isEnemy) {
            text.string = TEXT_TYPE.All;
        } else if(!isWizzars && !isEnemy) {
            text.string = TEXT_TYPE.Never;
        } else if(isEnemy) {
            text.string = TEXT_TYPE.Enemy;
        } else if(isWizzars) {
            text.string = TEXT_TYPE.Wizzard;
        }
    }

    private _checkWiner(type: number) {
        let isWin: boolean = false;
    
        isWin = this.cellArray[0].currentSpriteType === type 
            && this.cellArray[1].currentSpriteType === type
            && this.cellArray[2].currentSpriteType === type;

        if(isWin) {
            return isWin;
        }

        isWin = this.cellArray[3].currentSpriteType === type
            && this.cellArray[4].currentSpriteType === type
            && this.cellArray[5].currentSpriteType === type;

        if(isWin) {
            return isWin;
        }

        isWin = this.cellArray[6].currentSpriteType === type
            && this.cellArray[7].currentSpriteType === type
            && this.cellArray[8].currentSpriteType === type;
        
        if(isWin) {
            return isWin;
        }

        isWin = this.cellArray[0].currentSpriteType === type
            && this.cellArray[3].currentSpriteType === type
            && this.cellArray[6].currentSpriteType === type;

        if(isWin) {
            return isWin;
        }

        isWin = this.cellArray[1].currentSpriteType === type
            && this.cellArray[4].currentSpriteType === type
            && this.cellArray[7].currentSpriteType === type;

        if(isWin) {
            return isWin;
        }

        isWin = this.cellArray[2].currentSpriteType === type
            && this.cellArray[5].currentSpriteType === type
            && this.cellArray[8].currentSpriteType === type;
        
            
        if(isWin) {
            return isWin;
        }

        isWin = this.cellArray[0].currentSpriteType === type
            && this.cellArray[4].currentSpriteType === type
            && this.cellArray[8].currentSpriteType === type;
            
        if(isWin) {
            return isWin;
        }

        isWin = this.cellArray[2].currentSpriteType === type
            && this.cellArray[4].currentSpriteType === type
            && this.cellArray[6].currentSpriteType === type;

        return isWin;
    }
}

