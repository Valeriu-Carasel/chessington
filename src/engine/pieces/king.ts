import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import CheckBounds from "./CheckBounds";
import PieceTaker from "./PieceTaker";
import Rook from "./rook";

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
        this.castling(currentPosition, board, arrayOfMoves);
        return arrayOfMoves;
    }

    public castling(currentPosition: Square, board: Board, arrayOfMoves: Array<any>): void{
        if (!this.moved){
            const pieceLeft: Piece | undefined = this.scanLine(currentPosition, -1, board);
            if (pieceLeft != undefined && pieceLeft instanceof Rook && !pieceLeft.moved)
                arrayOfMoves.push(new Square(currentPosition.row, currentPosition.col - 2));

            const pieceRight: Piece | undefined = this.scanLine(currentPosition, 1, board);
            if (pieceRight != undefined && pieceRight instanceof Rook && !pieceRight.moved)
                arrayOfMoves.push(new Square(currentPosition.row, currentPosition.col + 2));
        }
    }

    public scanLine(currentPosition: Square, direction: number, board: Board): Piece | undefined{
        let position= currentPosition.col + direction;
        while (position>=0 && position<=7){
            let searchedSquare: Square = Square.at(currentPosition.row, position);
            let pieceSearched: Piece | undefined = board.getPiece(searchedSquare);
            if (pieceSearched != undefined)
                return pieceSearched;
            position+=direction;
        }
        return undefined;
    }

    public checkIfPositionIsChecked(position: Square){

    }
}
