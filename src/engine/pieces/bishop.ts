import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let currentPosition=board.findPiece(this);
        let arrayOfMoves = new Array();
        for (let i=-7;i<=7;i++)
        {
            if (i!=0) {
                if (this.inBounds(currentPosition.row + i) && this.inBounds(currentPosition.col + i))
                    arrayOfMoves.push(new Square(currentPosition.row + i, currentPosition.col + i));
                if (this.inBounds(currentPosition.row - i) && this.inBounds(currentPosition.col + i))
                    arrayOfMoves.push(new Square(currentPosition.row - i, currentPosition.col + i));
            }
        }
        return arrayOfMoves;
    }

    public inBounds(numar:number):boolean{
        return numar >= 0 && numar <= 7;
    }
}
