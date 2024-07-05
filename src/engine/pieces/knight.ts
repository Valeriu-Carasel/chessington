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
        let currentPosition: Square = board.findPiece(this);
        let arrayOfMoves= new Array();
        for (let i: number =-2; i <= 2; i += 4) {
            for (let j: number = -1; j <= 1; j += 2) {
                let extendRowWise: Square = new Square(currentPosition.row + i, currentPosition.col + j);
                if (CheckBounds.squareInBounds(extendRowWise)) {
                    arrayOfMoves.push(extendRowWise);
                }

                let extendColWise: Square = new Square(currentPosition.row + j, currentPosition.col + i);
                if (CheckBounds.squareInBounds(extendColWise)) {
                    arrayOfMoves.push(extendColWise);
                }
            }
        }
        PieceTaker.preventPiecesOverlap(board, arrayOfMoves, this.player);
        return arrayOfMoves;
    }
}
