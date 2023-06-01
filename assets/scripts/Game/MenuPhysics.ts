import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, math, RigidBody2D, v2, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuEnemy')
export class MenuEnemy extends Component {
    @property({}) speed: number = 0;
    @property({}) startVelocity: Vec2 = v2(0, 0);

    private collider: Collider2D = null;
    private body: RigidBody2D = null;

    onLoad() {
        this.collider = this.getComponent(Collider2D);
        this.body = this.node.getComponent(RigidBody2D);

        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        this.body.linearVelocity = this.startVelocity;
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        const rand: number = math.randomRangeInt(0, this.speed);

        this.body.linearVelocity = contact.getWorldManifold().normal.multiplyScalar(this.speed);
    }
}

