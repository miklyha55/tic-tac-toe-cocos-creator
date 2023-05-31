import { _decorator, Component, JsonAsset, UITransform, view, warn } from 'cc';
import GameEvent from '../../Enum/GameEvent';
import DataType from '../DataManager/DataType';
import GameObjectType from '../GameObjectManager/GameObjectType';
import GameObject from '../GameObjectManager/GameObject';
import { Cell } from './Cell';
const { ccclass } = _decorator;

export interface IROGridCfg {
    readonly row: number;
    readonly col: number;
}

export interface IROGridJsonCfg {
    readonly grid?: IROGridCfg;
}

@ccclass('GridManager')
export class GridManager extends Component {
    private jsonAsset: JsonAsset = null;
    private cellArray: Array<Cell> = [];

    onEnable() {
        this._handleSubscription(true);
    }

    onDisable() {
        this._handleSubscription(false);
    }

    start() {
        this._getJson();
        this._createGrid();
    }

    private _handleSubscription(active: boolean) {
        const func: string = active ? "on" : "off";

        view[func](GameEvent.UPDATE_GRIG_DATA, this.onUpdateGridData, this);
        view[func](GameEvent.GET_GRID_DATA, this.onGetGridData, this);
    }

    private _getJson() {
        view.emit(GameEvent.GET_DATA, DataType.Grid, (data: JsonAsset) => {
            this.jsonAsset = data;
        });
    }

    private _createGrid() {
        const gridJsonCfg: IROGridJsonCfg = this.jsonAsset.json;
        const gridCfg: IROGridCfg = gridJsonCfg.grid;

        for (let row: number = 0; row < gridCfg.row; row++) {
            for (let col: number = 0; col < gridCfg.col; col++) {
                view.emit(GameEvent.CREATE_GAME_OBJECT, GameObjectType.Cell, (gameObject: GameObject) => {
                    const uITransform: UITransform = gameObject.node.getComponent(UITransform);
                    const width: number = gridCfg.row * uITransform.width;
                    const height: number = gridCfg.col * uITransform.height;
                    const cellObject: Cell = gameObject.node.getComponent(Cell);

                    if(!cellObject) {
                        warn("Add Cell class");
                        return;
                    }

                    this.cellArray.push(cellObject);

                    gameObject.node.parent = this.node;
                    gameObject.node.setPosition(
                        row * uITransform.width - width / gridCfg.row,
                        col * uITransform.height - height / gridCfg.row,
                    );
                });
            }
        }
    }

    private onUpdateGridData() {
        this.cellArray.forEach(element => {
            element.clear();
            element.randomFill();
        });
    }

    private onGetGridData(callback: (cellArray: Array<Cell>) => void) {
        callback instanceof Function && callback(this.cellArray);
    }
}

