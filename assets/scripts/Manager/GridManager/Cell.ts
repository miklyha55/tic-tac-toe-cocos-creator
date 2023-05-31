import { _decorator, Component, Node, Prefab, instantiate, math } from 'cc';
import SpriteType from './SpriteType';
const { ccclass, property } = _decorator;

@ccclass("CellSpriteHelper")
class CellSpriteHelper {
    @property({ type: Prefab }) prefab: Prefab = null;
    @property({ type: SpriteType }) type: number = SpriteType.None;
}

@ccclass('Cell')
export class Cell extends Component {
    @property({ type: [CellSpriteHelper] }) cellSpritebArray: Array<CellSpriteHelper> = [];

    public currentSpriteType: number =  SpriteType.None;
    private _cellSpriteMap: Map<number, Node> = new Map();

    onLoad() {
        this._createSprites();
    }

    clear() {
        this._cellSpriteMap.forEach(element => {
            element.active = false;
        });
    }

    randomFill() {
        const rand: number = math.randomRangeInt(1 , this.cellSpritebArray.length + 1);

        this.currentSpriteType = rand;
        const node:Node = this._cellSpriteMap.get(rand);
        node.active = true;
    }

    private _createSprites() {
        if(this.cellSpritebArray.length) {
            this.cellSpritebArray.forEach(element => {
                const node: Node = instantiate(element.prefab);

                this._cellSpriteMap.set(element.type, node);
                node.parent = this.node;
                node.active = false;
            });
        }
    }
}

