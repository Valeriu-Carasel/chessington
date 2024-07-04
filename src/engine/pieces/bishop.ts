import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import CheckBounds from "./CheckBounds";
import King from "./king";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let currentPosition : Square = board.findPiece(this);
        let arrayOfMoves : any[] = new Array();
        Bishop.generateBishopTypeMoves(board, currentPosition, arrayOfMoves, this.player);

        return arrayOfMoves;
    }

    public static generateBishopTypeMoves(board : Board, currentPosition : Square, arrayOfMoves : Array<any>, player: Player) : void {
        let position : Square = new Square(currentPosition.row + 1, currentPosition.col + 1);
        while (CheckBounds.squareInBounds(position)) {
            //intreaba-l pe Raimond, aici aveai position in loc de new Square si facea niste chestii ciudate
            //was it a refference?
            arrayOfMoves.push(new Square(position.row, position.col));
            if (board.getPiece(position) != undefined)
                break;
            position.col += 1;
            position.row += 1;
        }
        position = new Square(currentPosition.row - 1, currentPosition.col - 1);
        while (CheckBounds.squareInBounds(position)) {
            arrayOfMoves.push(new Square(position.row, position.col));
            if (board.getPiece(position) != undefined)
                break;
            position.col -= 1;
            position.row -= 1;
        }
        position = new Square(currentPosition.row - 1,currentPosition.col + 1);
        while (CheckBounds.squareInBounds(position)) {
            arrayOfMoves.push(new Square(position.row, position.col));
            if (board.getPiece(position) != undefined)
                break;
            position.col += 1;
            position.row -= 1;
        }
        position = new Square(currentPosition.row + 1, currentPosition.col - 1);
        while (CheckBounds.squareInBounds(position)) {
            arrayOfMoves.push(new Square(position.row, position.col));
            if (board.getPiece(position) != undefined)
                break;
            position.col -= 1;
            position.row += 1;
        }
        for (let i : number=0; i < arrayOfMoves.length; i++) {
            if (board.getPiece(arrayOfMoves.at(i))?.player == player) {
                arrayOfMoves.splice(i, 1);
            }
            else {
                if (board.getPiece(arrayOfMoves.at(i)) instanceof King)
                    arrayOfMoves.splice(i, 1);
            }
        }
    }

}
