import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import Bishop from "./bishop";
import CheckBounds from "./CheckBounds";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let currentPosition=board.findPiece(this);
        let arrayOfMoves=new Array();
        for (let i=-7;i<=7;i++)
        {
            if (i!=0) {
                if (CheckBounds.inBounds(currentPosition.row + i) && CheckBounds.inBounds(currentPosition.col + i))
                    arrayOfMoves.push(new Square(currentPosition.row + i, currentPosition.col + i));
                if (CheckBounds.inBounds(currentPosition.row - i) && CheckBounds.inBounds(currentPosition.col + i))
                    arrayOfMoves.push(new Square(currentPosition.row - i, currentPosition.col + i));
            }
        }
        for (let i=0;i<=7;i++)
        {
            if (i!=currentPosition.row)
                arrayOfMoves.push(new Square(i,currentPosition.col));
            if (i!=currentPosition.col)
                arrayOfMoves.push(new Square(currentPosition.row,i));
        }
        return arrayOfMoves;
    }
}
