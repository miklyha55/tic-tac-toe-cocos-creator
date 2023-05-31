import GameObject from "./GameObject";

import { _decorator, Node, Prefab, instantiate } from "cc";

export class GameObjectFactory {
    static CreateGameObject(prefab: Prefab, callback: (node: Node, gameObject: GameObject) => void) {
        if (prefab) {
            const node: Node = instantiate(prefab);
            const gameObject: GameObject = node.getComponent(GameObject);

            callback instanceof Function && callback(node, gameObject);
        }
    }
}
