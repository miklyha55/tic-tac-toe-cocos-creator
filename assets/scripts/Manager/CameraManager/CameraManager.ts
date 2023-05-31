import GameEvent from "../../Enum/GameEvent";

import { _decorator, Component, Animation, AnimationClip, view, Camera } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Camera")
export class CameraManager extends Component {
    @property(Camera) camera: Camera = null;
    @property(AnimationClip) shakeAnimationClip: AnimationClip = null;

    private _animation: Animation = null;

    onEnable() {
        this._handleSubscription(true);
    }

    onDisable() {
        this._handleSubscription(false);
    }

    onLoad() {
        this._addClip();
    }

    private _addClip() {
        this._animation = this.camera.getComponent(Animation) || this.camera.addComponent(Animation);

        if (!this.shakeAnimationClip) {
            return;
        }

        this._animation.createState(this.shakeAnimationClip, this.shakeAnimationClip.name);
    }

    private _handleSubscription(active: boolean) {
        const func: string = active ? "on" : "off";

        view[func](GameEvent.SHAKE_CAMERA, this.onShakeCamera, this);
    }

    private onShakeCamera() {
        if (!this.camera) {
            return;
        }

        this._animation.play(this.shakeAnimationClip.name);
    }
}
