import Piece from './piece';
import Player from '../player';
import Board from '../board';
import CheckBounds from "./CheckBounds";
import Square from "../square";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let currentPosition=board.findPiece(this);
        let arrayOfMoves=new Array();
        for (let i:number=-2;i<=2;i+=4) {
            for (let j:number=-1;j<=1;j+=2) {
                if (CheckBounds.inBounds(currentPosition.col + i) && CheckBounds.inBounds(currentPosition.row + j)) {
                    arrayOfMoves.push(new Square(currentPosition.row + i, currentPosition.col + j));
                }
                if (CheckBounds.inBounds(currentPosition.col + j) && CheckBounds.inBounds(currentPosition.row + i)) {
                    arrayOfMoves.push(new Square(currentPosition.row + j, currentPosition.col + i));
                }
            }
        }
        return arrayOfMoves;
    }
}
