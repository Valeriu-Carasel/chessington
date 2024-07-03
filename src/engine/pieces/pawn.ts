import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {

        let currentPlace=board.findPiece(this);
        let arrayOfMoves=new Array();
        if (this.player==Player.WHITE)
            arrayOfMoves.push(new Square(currentPlace.row+1,currentPlace.col));
        else
            arrayOfMoves.push(new Square(currentPlace.row-1,currentPlace.col));
        return arrayOfMoves;
    }
}
