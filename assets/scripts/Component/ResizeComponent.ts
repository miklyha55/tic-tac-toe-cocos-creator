import { _decorator, Component, view, Vec2, log, math, v2, UITransform } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('ResizeHelper')
class ResizeHelper {
    @property({}) isPosition: boolean = true;
    @property({
        visible() {
            return this.isPosition
        }
    }) isRelative: boolean = false;
    @property({
        visible() {
            return this.isRelative && this.isPosition
        }
    }) relativePosition: Vec2 = v2(0, 0);
    @property({
        visible() {
            return !this.isRelative && this.isPosition
        }
    }) absolutePosition: Vec2 = v2(0, 0);
    @property({}) isAnchor: boolean = false;
    @property({
        visible() {
            return this.isAnchor
        }
    }) anchor: Vec2 = v2(0.5, 0.5);
    @property({}) isScale: boolean = false;
    @property({
        visible() {
            return this.isScale
        }
    }) scale: Vec2 = v2(1, 1);
}

@ccclass('ResizeComponent')
export class ResizeComponent extends Component {
    @property({ type: ResizeHelper }) landscape: ResizeHelper = null;
    @property({ type: ResizeHelper }) portrait: ResizeHelper = null;

    onEnable() {
        this._handleSubscription(true);
    }

    onDisable() {
        this._handleSubscription(false);
    }

    start() {
        this.onSizeChange();
    }

    _handleSubscription(active: boolean) {
        const func: string = active ? "on" : "off";

        view[func]("canvas-resize", this.onSizeChange, this);
    }

    _getRelativePosition(relativePosition) {
        const visible_size: math.Size = view.getVisibleSize();
        const x: number =
            visible_size.width * relativePosition.x - visible_size.width / 2;
        const y: number =
            visible_size.height / 2 - visible_size.height * relativePosition.y;

        return v2(x, y);
    }

    onSizeChange() {
        const visible_size: math.Size = view.getVisibleSize();
        const isLandscape: boolean = visible_size.width > visible_size.height;
        const resizeHelper: ResizeHelper = isLandscape ? this.landscape : this.portrait;
        const uITransform: UITransform = this.node.getComponent(UITransform);

        if(!resizeHelper) {
            return;
        }
        
        if (resizeHelper.isAnchor && uITransform) {
            uITransform.setAnchorPoint(resizeHelper.anchor.x, resizeHelper.anchor.y);
        }

        if (resizeHelper.isPosition) {
            const relativePosition: Vec2 = this._getRelativePosition(resizeHelper.relativePosition);

            this.node.setPosition(
                !resizeHelper.isRelative ? resizeHelper.absolutePosition.x : relativePosition.x,
                !resizeHelper.isRelative ? resizeHelper.absolutePosition.y : relativePosition.y
            );
        }

        if (resizeHelper.isScale) {
            this.node.setScale(resizeHelper.scale.x, resizeHelper.scale.y);
        }
    }
}

