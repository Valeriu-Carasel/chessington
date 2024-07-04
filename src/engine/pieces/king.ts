import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import CheckBounds from "./CheckBounds";
import PieceTaker from "./PieceTaker";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let currentPosition: Square = board.findPiece(this);
        let arrayOfMoves: any[] = new Array();
        for (let i: number =-1; i <= 1; i++) {
            for (let j: number = -1; j <= 1; j++) {
                if (i != 0 || j != 0) {
                    let adjacentSquare: Square = new Square(currentPosition.row + i, currentPosition.col + j);
                    if (CheckBounds.squareInBounds(adjacentSquare))
                        arrayOfMoves.push(new Square(currentPosition.row + i, currentPosition.col + j));
                }
            }
        }
        PieceTaker.preventPiecesOverlap(board, arrayOfMoves, this.player);
        return arrayOfMoves;
    }
}
