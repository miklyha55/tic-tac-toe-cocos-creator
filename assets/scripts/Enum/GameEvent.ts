import { Enum } from "cc";

const GameEvent = Enum({
    NONE: 0,
    FIRST_PRESSED: 1,
    INPUT: 2,
    GET_DATA: 3,

    CREATE_GAME_OBJECT: 5,
    RETURN_TO_POOL: 6,

    DOWN: 8,
    MOVE: 9,
    UP: 10,

    GET_GAME_OBJECT_PARENT: 11,
    GET_UI_OBJECT_PARENT: 18,
    
    UPDATE_GRIG_DATA: 13,
    GET_GRID_DATA: 20,

    SHAKE_CAMERA: 14,
    CHANGE_LEVEL: 15,
    GET_GAME_OBJECT: 16,
    REMOVE_GAME_OBJECT: 17,
    CHECK_WINER: 19,
});

export default GameEvent;
