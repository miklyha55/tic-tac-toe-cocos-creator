import DataType from "./DataType";
import GameEvent from "../../Enum/GameEvent";

import { _decorator, Component, JsonAsset, view } from "cc";
const { ccclass, property } = _decorator;

interface IRODataHelper {
    readonly type: number;
    readonly data: JsonAsset;
}

@ccclass("DataHelper")
class DataHelper {
    @property({ type: DataType }) type: number = DataType.None;
    @property({ type: JsonAsset }) data: JsonAsset = null;
}

@ccclass("DataDictionary")
export class DataDictionary extends Component {
    @property({ type: DataHelper }) data = [];

    private _data: Array<IRODataHelper> = [];

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

    _handleSubscription(active: boolean) {
        const func: string = active ? "on" : "off";

        view[func](GameEvent.GET_DATA, this.onGetData, this);
    }

    onGetData(type: number, callback: (arg: IRODataHelper) => void) {
        callback instanceof Function && callback(this._data[type]);
    }
}
