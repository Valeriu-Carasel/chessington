import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let currentPosition= board.findPiece(this);
        let arrayOfMoves = new Array();

        Rook.generateRookTypeMoves(board, currentPosition, arrayOfMoves, this.player);
        return arrayOfMoves;
    }

    public static generateRookTypeMoves(board : Board, currentPosition: Square, arrayOfMoves: Array<any>, player: Player): void{
        for (let i: number= currentPosition.row - 1; i >= 0; i--) {
            arrayOfMoves.push(new Square(i, currentPosition.col));
            if (board.getPiece(new Square(i, currentPosition.col)) != undefined)
                break;
        }
        for (let i: number=currentPosition.row + 1; i <= 7; i++) {
            arrayOfMoves.push(new Square(i, currentPosition.col));
            if (board.getPiece(new Square(i, currentPosition.col)) != undefined)
                break;
        }
        for (let i: number=currentPosition.col-1; i >= 0; i--) {
            arrayOfMoves.push(new Square(currentPosition.row,i));
            if (board.getPiece(new Square(currentPosition.row,i)) != undefined)
                break;
        }
        for (let i: number=currentPosition.col + 1; i <= 7; i++) {
            arrayOfMoves.push(new Square(currentPosition.row,i));
            if (board.getPiece(new Square(currentPosition.row,i)) != undefined)
                break;
        }
        for (let i: number= 0;i < arrayOfMoves.length; i++) {
            if (board.getPiece(arrayOfMoves.at(i))?.player == player) {
                arrayOfMoves.splice(i,1);
            }
            else {
                if (board.getPiece(arrayOfMoves.at(i)) instanceof King)
                    arrayOfMoves.splice(i,1);
            }
        }
    }
}
