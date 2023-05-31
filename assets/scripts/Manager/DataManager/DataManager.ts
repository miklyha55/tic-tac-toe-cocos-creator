import DataType from "./DataType";
import GameEvent from "../../Enum/GameEvent";

import { _decorator, Component, JsonAsset, view } from "cc";
const { ccclass, property } = _decorator;

@ccclass("DataHelper")
class DataHelper {
    @property({ type: DataType }) type: number = DataType.None;
    @property({ type: JsonAsset }) data: JsonAsset = null;
}

@ccclass("DataDictionary")
export class DataDictionary extends Component {
    @property({ type: DataHelper }) data = [];

    private _data: Map<number, JsonAsset> = new Map();

    onEnable() {
        this._handleSubscription(true);
    }

    onDisable() {
        this._handleSubscription(false);
    }

    onLoad() {
        if (this.data.length) {
            for (const element of this.data) {
                this._data.set(element.type, element.data);
            }
        }
    }

    private _handleSubscription(active: boolean) {
        const func: string = active ? "on" : "off";

        view[func](GameEvent.GET_DATA, this.onGetData, this);
    }

    private onGetData(type: number, callback: (data: JsonAsset) => void) {
        callback instanceof Function && callback(this._data.get(type));
    }
}
