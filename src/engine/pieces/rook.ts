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
