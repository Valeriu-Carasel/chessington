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
            {
                let square1=new Square(currentPlace.row + (2*modifier), currentPlace.col);
                let square2=new Square(currentPlace.row + modifier, currentPlace.col);
                if (board.getPiece(square1)===undefined && board.getPiece(square2)==undefined)
                    arrayOfMoves.push(square1);
            }
            let square=new Square(currentPlace.row + modifier, currentPlace.col);
            if (board.getPiece(square)===undefined) {
                arrayOfMoves.push(square);
            }
        }
        else
        {
            modifier=-1;
            if (currentPlace.row==6)
            {
                let square1=new Square(currentPlace.row + (2*modifier), currentPlace.col);
                let square2=new Square(currentPlace.row + modifier, currentPlace.col);
                if (board.getPiece(square1)===undefined && board.getPiece(square2)==undefined)
                    arrayOfMoves.push(square1);
            }
            let square=new Square(currentPlace.row + modifier, currentPlace.col);
            if (board.getPiece(square)===undefined) {
                arrayOfMoves.push(square);
            }
        }

        return arrayOfMoves;
    }
}
