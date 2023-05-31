import GameObject from "./GameObject";

import { _decorator, Node, Prefab, instantiate, warn } from "cc";

export class GameObjectFactory {
    static CreateGameObject(prefab: Prefab, callback: (node: Node, gameObject: GameObject) => void) {
        if (prefab) {
            const node: Node = instantiate(prefab);
            const gameObject: GameObject = node.getComponent(GameObject);

            if(!gameObject) {
                warn("Add GameObjectComponent");
                return;
            }

            callback instanceof Function && callback(node, gameObject);
        }
    }
}
