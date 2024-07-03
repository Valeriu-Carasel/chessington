import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import CheckBounds from "./CheckBounds";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let currentPosition=board.findPiece(this);
        let arrayOfMoves=new Array();
        for (let i=-1;i<=1;i++)
        {
            for (let j=-1;j<=1;j++)
            {
                if (i!=0 || j!=0) {
                    if (CheckBounds.inBounds(currentPosition.row+i) && CheckBounds.inBounds(currentPosition.col+j))
                        arrayOfMoves.push(new Square(currentPosition.row + i, currentPosition.col + j));
                }
            }
        }
        return arrayOfMoves;
    }
}
