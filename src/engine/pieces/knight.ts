import Piece from './piece';
import Player from '../player';
import Board from '../board';
import CheckBounds from "./CheckBounds";
import Square from "../square";
import King from "./king";
import PieceTaker from "./PieceTaker";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let currentPosition=board.findPiece(this);
        let arrayOfMoves=new Array();
        for (let i:number=-2;i<=2;i+=4) {
            for (let j:number=-1;j<=1;j+=2) {
                if (CheckBounds.inBounds(currentPosition.row + i) && CheckBounds.inBounds(currentPosition.col + j)) {
                    arrayOfMoves.push(new Square(currentPosition.row + i, currentPosition.col + j));
                }
                if (CheckBounds.inBounds(currentPosition.row + j) && CheckBounds.inBounds(currentPosition.col + i)) {
                    arrayOfMoves.push(new Square(currentPosition.row + j, currentPosition.col + i));
                }
            }
        }
        PieceTaker.takePieces(board,arrayOfMoves,this.player);
        return arrayOfMoves;
    }
}
