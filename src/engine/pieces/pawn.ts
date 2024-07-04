import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import CheckBounds from "./CheckBounds";
import King from "./king";
import player from "../player";
import Queen from "./queen";

export default class Pawn extends Piece {

    private _possibleEnPassant:boolean=false;

    public constructor(player: Player) {
        super(player);
    }

    moveTo(board: Board, newSquare: Square) {
        super.moveTo(board, newSquare);
        this.promotePawn(board,newSquare);
    }

    get possibleEnPassant(): boolean {
        return this._possibleEnPassant;
    }

    set possibleEnPassant(value: boolean) {
        this._possibleEnPassant = value;
    }

    public getAvailableMoves(board: Board) {

        let currentPlace=board.findPiece(this);
        let arrayOfMoves=new Array();

        let initialPosition:  {
            modifier:number,
            startingPosition:number
        }={modifier:0,startingPosition:0};
        this.setDirection(initialPosition);

        this.doubleMove(initialPosition,currentPlace,board,arrayOfMoves);

        let square=new Square(currentPlace.row + initialPosition.modifier, currentPlace.col);
        this.addMove(square,arrayOfMoves,board);

        this.allowTakingPiece(initialPosition,currentPlace,board,this.player,arrayOfMoves);
        this.enPassant(initialPosition,currentPlace,board,this.player,arrayOfMoves)
        return arrayOfMoves;
    }

    //pare sa fie o problema sa ii dau tipul any
    public setDirection(initialPosition:any):void{
        if (this.player==Player.WHITE) {
            initialPosition.modifier = 1;
            initialPosition.starterPosition=1;
        }
        else {
            initialPosition.modifier=-1;
            initialPosition.starterPosition=6;
        }
    }

    public doubleMove(initialPosition:any,currentPlace:Square,board:Board,arrayOfMoves:Array<any>):void{
        let starterPosition:number;
        if (currentPlace.row==initialPosition.starterPosition)
        {
            let square1=new Square(currentPlace.row + (2*initialPosition.modifier), currentPlace.col);
            let square2=new Square(currentPlace.row + initialPosition.modifier, currentPlace.col);
            if (board.getPiece(square1)===undefined && board.getPiece(square2)==undefined)
                this.addMove(square1,arrayOfMoves,board);
        }
    }

    public addMove(square:Square,arrayOfMoves:Array<Square>,board:Board):void {
        if (CheckBounds.squareInBounds(square))
            if (board.getPiece(square)===undefined)
                 arrayOfMoves.push(square);
    }

    public allowTakingPiece(initialPosition:any,currentPlace:Square,board:Board,player:Player,arrayOfMoves:Array<any>):void {
        let left:Square=new Square(currentPlace.row+initialPosition.modifier,currentPlace.col-1);
        let right:Square=new Square(currentPlace.row+initialPosition.modifier,currentPlace.col+1);
        if (CheckBounds.squareInBounds(left)) {
            if (board.getPiece(left) != undefined) {
                if (board.getPiece(left)?.player != player) {
                    if (!(board.getPiece(left) instanceof King))
                        arrayOfMoves.push(left);
                }
            }
        }
        if (CheckBounds.squareInBounds(right)) {
            if (board.getPiece(right) != undefined) {
                if (board.getPiece(right)?.player != player) {
                    if (!(board.getPiece(right) instanceof King))
                        arrayOfMoves.push(right);
                }
            }
        }
    }

    public enPassant(initialPosition:any,currentPlace: Square,board:Board,player:Player,arrayOfMoves:Array<any>)
    {
        let left=new Square(currentPlace.row,currentPlace.col-1);
        let right=new Square(currentPlace.row,currentPlace.col+1);
        if (CheckBounds.squareInBounds(left)) {
            if (board.getPiece(left) instanceof Pawn) {
                let pawn:Pawn= (<Pawn>board.getPiece(left));
                if (pawn.possibleEnPassant) {
                    arrayOfMoves.push(new Square(currentPlace.row+initialPosition.modifier,left.col));
                }
            }
        }
        if (CheckBounds.squareInBounds(right)) {
            let target=board.getPiece(right);
            if (board.getPiece(right) instanceof Pawn) {
                let pawn:Pawn= (<Pawn>board.getPiece(right));
                if (pawn.possibleEnPassant) {
                    arrayOfMoves.push(new Square(currentPlace.row+initialPosition.modifier,right.col));
                }
            }
        }
    }

    public promotePawn(board:Board,newSquare:Square):void
    {
        let finishLine:number;
        if (this.player===Player.WHITE)
            finishLine=7;
        else
            finishLine=0;
        if (newSquare.row==finishLine) {
            const queen=new Queen(this.player);
            board.setPiece(newSquare,queen);
        }
    }
}
