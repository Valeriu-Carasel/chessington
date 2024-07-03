import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let currentPosition=board.findPiece(this);
        let arrayOfMoves = new Array();
        for (let i=currentPosition.row-1;i>=0;i--)
        {
            if (board.getPiece(new Square(i,currentPosition.col))!=undefined)
                break;
            else
                arrayOfMoves.push(new Square(i,currentPosition.col));
        }
        for (let i=currentPosition.row+1;i<=7;i++)
        {
            if (board.getPiece(new Square(i,currentPosition.col))!=undefined)
                break;
            else
                arrayOfMoves.push(new Square(i,currentPosition.col));
        }
        for (let i=currentPosition.col-1;i>=0;i--)
        {
            if (board.getPiece(new Square(currentPosition.row,i))!=undefined)
                break;
            else
                arrayOfMoves.push(new Square(currentPosition.row,i));
        }
        for (let i=currentPosition.col+1;i<=7;i++)
        {
            if (board.getPiece(new Square(currentPosition.row,i))!=undefined)
                break;
            else
                arrayOfMoves.push(new Square(currentPosition.row,i));
        }
        return arrayOfMoves;
    }
}
