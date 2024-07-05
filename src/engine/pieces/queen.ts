import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import Bishop from "./bishop";
import CheckBounds from "./CheckBounds";
import King from "./king";
import Rook from "./rook";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let currentPosition=board.findPiece(this);
        let arrayOfMoves = new Array();
        Rook.generateRookTypeMoves(board, currentPosition, arrayOfMoves, this.player);
        Bishop.generateBishopTypeMoves(board, currentPosition, arrayOfMoves, this.player);
        //removal part
        for (let i=0; i < arrayOfMoves.length; i++) {
            if (board.getPiece(arrayOfMoves.at(i))?.player == this.player) {
                arrayOfMoves.splice(i,1);
            }
            else {
                if (board.getPiece(arrayOfMoves.at(i)) instanceof King)
                    arrayOfMoves.splice(i,1);
            }
        }
        return arrayOfMoves;
    }
}
