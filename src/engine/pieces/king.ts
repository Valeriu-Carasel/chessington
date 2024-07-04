import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import CheckBounds from "./CheckBounds";
import PieceTaker from "./PieceTaker";
import Rook from "./rook";
import Queen from "./queen";
import Knight from "./knight";
import Bishop from "./bishop";
import Pawn from "./pawn";
import player from "../player";
import * as console from "node:console";


export default class King extends Piece {

    public constructor(player: Player) {
        super(player);
    }

    moveTo(board: Board, newSquare: Square) {
        const currentPosition: Square = board.findPiece(this);
        if (!this.checkIfPositionIsChecked(newSquare, board, this.player)) {
            super.moveTo(board, newSquare);
        }
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

    public checkIfPositionIsChecked(currentPosition: Square, board: Board, player: Player): boolean{
        return King.checkForBishopLike(board,currentPosition, player) || King.checkForRookLike(currentPosition, board, player) || King.checkForKnightLike(currentPosition, player, board)
            || King.checkForPawn(currentPosition,this.player,board);
    }

    private static checkForBishopLike(board: Board, currentPosition: Square,player: Player): boolean{
        let position: Square = new Square(currentPosition.row + 1, currentPosition.col + 1);
        const direction1: boolean = King.checkForBishopDirection(board, position, 1, 1,player);

        position = new Square(currentPosition.row - 1, currentPosition.col - 1);
        const direction2: boolean = King.checkForBishopDirection(board, position, -1,  -1,player);

        position = new Square(currentPosition.row - 1,currentPosition.col + 1);
        const direction3: boolean = King.checkForBishopDirection(board, position,  -1, 1,player);

        position = new Square(currentPosition.row + 1, currentPosition.col - 1);
        const  direction4: boolean = King.checkForBishopDirection(board, position, 1,  -1,player);
        return direction1 || direction2 || direction3 || direction4;
    }

    private static checkForBishopDirection(board: Board, position: Square, directionRow: number, directionCol: number,player: Player): boolean{
        while (CheckBounds.squareInBounds(position)) {
            if (board.getPiece(position) != undefined){
                const piece: Piece= <Piece> board.getPiece(position);
                if ((piece instanceof Bishop || piece instanceof Queen) && piece.player!=player) {
                    return true;
                }
                break;
            }
            position.col += directionCol;
            position.row += directionRow;
        }
        return false;
    }

    private static checkForRookLike(currentPosition: Square, board: Board, player: Player): boolean {
        return King.checkForRookDirection(currentPosition, -1, board, player) || King.checkForRookDirection(currentPosition, 1, board, player);
    }

    private static checkForRookDirection(currentPosition: Square, direction: number, board: Board, player: Player): boolean{
        // I am painfully aware de cat de rau arata codul, o sa refactorizez dupa
        for (let i: number= currentPosition.row + direction; i >= 0 && i <= 7; i += direction) {
            const square: Square=new Square(i, currentPosition.col);
            if (board.getPiece(square) != undefined) {
                const piece: Piece= <Piece> board.getPiece(square);
                if ((piece instanceof Rook || piece instanceof Queen) && piece.player!=player) {
                    return true;
                }
                break;
            }
        }
        for (let i: number=currentPosition.col + direction; i >= 0 && i <= 7; i +=direction) {
            const square: Square=new Square(i, currentPosition.col);
            if (board.getPiece(square) != undefined) {
                const piece: Piece= <Piece> board.getPiece(square);
                if ((piece instanceof Rook || piece instanceof Queen) && piece.player!=player) {
                    return true;
                }
                break;
            }
        }
        return false;
    }

    private static checkForKnightLike(currentPosition: Square, player: Player, board: Board): boolean{
        for (let i: number =-2; i <= 2; i += 4) {
            for (let j: number = -1; j <= 1; j += 2) {
                let extendRowWise: Square = new Square(currentPosition.row + i, currentPosition.col + j);
                if (CheckBounds.squareInBounds(extendRowWise)) {
                    if (board.getPiece(extendRowWise)!=undefined) {
                        const piece: Piece = <Piece>board.getPiece(extendRowWise);
                        if (piece instanceof Knight && piece.player != player) {
                            return true;
                        }
                        break;
                    }
                }

                let extendColWise: Square = new Square(currentPosition.row + j, currentPosition.col + i);
                if (CheckBounds.squareInBounds(extendColWise)) {
                    if (board.getPiece(extendColWise)!=undefined) {
                        const piece: Piece = <Piece>board.getPiece(extendColWise);
                        if (piece instanceof Knight && piece.player != player) {
                            return true;
                        }
                        break;
                    }
                }
            }
        }
        return false;
    }

    private static checkForPawn(currentPosition: Square, player: Player, board: Board): boolean{
        const modifier: number= player == Player.WHITE?1:-1;
        const positionLeft: Square = new Square(currentPosition.row+modifier,currentPosition.col - 1);
        const positionRight: Square = new Square(currentPosition.row + modifier, currentPosition.col + 1);
        if (CheckBounds.squareInBounds(positionLeft))
        {
            if (board.getPiece(positionLeft)) {
                const piece: Piece = <Piece>board.getPiece(positionLeft);
                if (piece instanceof Pawn && piece.player != player) {
                    return true;
                }
            }
        }
        if (CheckBounds.squareInBounds(positionRight))
        {
            if (board.getPiece(positionRight)) {
                const piece: Piece = <Piece>board.getPiece(positionRight);
                if (piece instanceof Pawn && piece.player != player) {
                    return true;
                }
            }
        }
        return false;
    }
}
