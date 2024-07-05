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

    public static generateRookTypeMoves(board: Board, currentPosition: Square, arrayOfMoves: Array<any>, player: Player): void{

        Rook.searchDirectionRow(arrayOfMoves, currentPosition, -1, board);
        Rook.searchDirectionRow(arrayOfMoves, currentPosition, 1, board);
        Rook.searchDirectionCol(arrayOfMoves, currentPosition, -1, board);
        Rook.searchDirectionCol(arrayOfMoves, currentPosition, 1, board);

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

    private static searchDirectionRow(arrayOfMoves: Array<any>, currentPosition: Square, direction: number, board: Board): void {
        for (let i: number= currentPosition.row + direction; i >= 0 && i <= 7; i += direction) {
            arrayOfMoves.push(new Square(i, currentPosition.col));
            if (board.getPiece(new Square(i, currentPosition.col)) != undefined)
                break;
        }
    }

    private static searchDirectionCol(arrayOfMoves: Array<any>, currentPosition: Square, direction: number, board: Board): void {
        for (let i: number=currentPosition.col + direction; i >= 0 && i <= 7; i +=direction) {
            arrayOfMoves.push(new Square(currentPosition.row,i));
            if (board.getPiece(new Square(currentPosition.row,i)) != undefined)
                break;
        }
    }
}
