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
        var modifier:number;
        if (this.player==Player.WHITE) {
            modifier = 1;
            if (currentPlace.row==1)
                arrayOfMoves.push(new Square(currentPlace.row + (2*modifier), currentPlace.col));
            arrayOfMoves.push(new Square(currentPlace.row + (1*modifier), currentPlace.col));
        }
        else
        {
            modifier = -1;
            if (currentPlace.row==6)
                arrayOfMoves.push(new Square(currentPlace.row + (2*modifier), currentPlace.col));
            arrayOfMoves.push(new Square(currentPlace.row + (1*modifier), currentPlace.col));
        }

        return arrayOfMoves;
    }
}
