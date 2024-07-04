import Square from "../square";
import Player from "../player";
import Board from "../board";
import King from "./king";

export default class SingletonKings{
    private static instanceWhite: SingletonKings = new SingletonKings(Square.at(0, 4),Player.WHITE);
    private static instanceBlack: SingletonKings = new SingletonKings(Square.at(7, 4),Player.BLACK);
    private static board: Board;
    private player: Player;
    private _square: Square;
    private _checked: boolean;

    private constructor(square: Square, player: Player) {
        this._square = square;
        this.player = player;
        this._checked = false;
    }

    public static getInstnace(player: Player, board: Board): SingletonKings{
        this.board = board;
        return player==Player.WHITE?this.instanceWhite:this.instanceBlack;
    }

    get square(): Square {
        return this._square;
    }

    set square(value: Square) {
        this._square = value;
    }

    get checked(): boolean {
        const king: King = <King>  SingletonKings.board.getPiece(this.square);
        return king.checkIfPositionIsChecked(this.square,SingletonKings.board,this.player);
    }

    set checked(value: boolean) {
        this._checked = value;
    }
}