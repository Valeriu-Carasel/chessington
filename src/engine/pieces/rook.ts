import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let currentPosition=board.findPiece(this);
        let arrayOfMoves = new Array();
        for (let i=currentPosition.row-1;i>=0;i--)
        {
            arrayOfMoves.push(new Square(i,currentPosition.col));
            if (board.getPiece(new Square(i,currentPosition.col))!=undefined)
                break;
        }
        for (let i=currentPosition.row+1;i<=7;i++)
        {
            arrayOfMoves.push(new Square(i,currentPosition.col));
            if (board.getPiece(new Square(i,currentPosition.col))!=undefined)
                break;
        }
        for (let i=currentPosition.col-1;i>=0;i--)
        {
            arrayOfMoves.push(new Square(currentPosition.row,i));
            if (board.getPiece(new Square(currentPosition.row,i))!=undefined)
                break;
        }
        for (let i=currentPosition.col+1;i<=7;i++)
        {
            arrayOfMoves.push(new Square(currentPosition.row,i));
            if (board.getPiece(new Square(currentPosition.row,i))!=undefined)
                break;
        }
        for (let i=0;i<arrayOfMoves.length;i++) {
            if (board.getPiece(arrayOfMoves.at(i))?.player==this.player) {
                arrayOfMoves.splice(i,1);
            }
            else
            {
                if (board.getPiece(arrayOfMoves.at(i)) instanceof King)
                    arrayOfMoves.splice(i,1);
            }
        }
        return arrayOfMoves;
    }
}
