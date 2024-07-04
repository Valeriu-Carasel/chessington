import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';
import Pawn from "./pieces/pawn";
import King from "./pieces/king";

export default class Board {
    public currentPlayer: Player;
    private readonly board: (Piece | undefined)[][];

    public constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    public setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    public getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    public findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    public movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);        
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            if (movingPiece instanceof Pawn) {
                const pawn: Pawn = <Pawn> movingPiece;
                this.handleEnPassant(pawn, toSquare);
            }
            if (movingPiece instanceof King) {
                this.handleCastle(movingPiece, fromSquare, toSquare);
                this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE); //added so it reverts back to the other player, ask Raimond
            }

            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);

            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);

            let rowPlayer: number = this.currentPlayer === Player.WHITE ? 3 : 4;

            for (let i= 0; i <= 7; i++) {
                let piece = this.getPiece(Square.at(rowPlayer, i));
                if (piece instanceof Pawn) {
                    let pawn= <Pawn> piece;
                    pawn.possibleEnPassant = false;
                }
            }
        }
    }

    private createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }

    public handleCastle(movingPiece: Piece, fromSquare: Square, toSquare: Square): void{
        if (fromSquare.row == toSquare.row) {
            if (toSquare.col - fromSquare.col == 2) {
                const squareRook: Square = new Square(fromSquare.row, 7);
                this.movePiece(squareRook, new Square(toSquare.row, toSquare.col - 1));
            }
            if (toSquare.col - fromSquare.col == -2) {
                const squareRook: Square= new Square(fromSquare.row,0);
                this.movePiece(squareRook, new Square(toSquare.row, toSquare.col + 1));
            }
        }
    }

    public handleEnPassant(movingPiece: Pawn, toSquare: Square): void{
        if (toSquare.row - this.findPiece(movingPiece).row == 2  || (toSquare.row - this.findPiece(movingPiece).row) == -2) {
            movingPiece.possibleEnPassant=true;
        }
        const squareBehind = this.currentPlayer === Player.WHITE ? new Square(toSquare.row-1,toSquare.col) : new Square(toSquare.row+1,toSquare.col)
        if (this.getPiece(squareBehind) instanceof Pawn) {
            let pawnBehind: Pawn = ( <Pawn> this.getPiece(squareBehind));
            if (pawnBehind.possibleEnPassant == true) {
                this.setPiece(squareBehind,undefined);
            }
        }
    }
}
