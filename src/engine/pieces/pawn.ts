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

        this.takePiece(initialPosition,currentPlace,board,this.player,arrayOfMoves);
        this.enPassant(currentPlace,board,this.player,arrayOfMoves)
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

    public takePiece(initialPosition:any,currentPlace:Square,board:Board,player:Player,arrayOfMoves:Array<any>):void {
        let option1:Square=new Square(currentPlace.row+initialPosition.modifier,currentPlace.col-1);
        let option2:Square;
        if (this.player==Player.WHITE) {
            option1 = new Square(currentPlace.row + 1, currentPlace.col - 1);
            option2 = new Square(currentPlace.row + 1, currentPlace.col + 1);
        }
        else
        {
            option1 = new Square(currentPlace.row - 1, currentPlace.col - 1);
            option2 = new Square(currentPlace.row - 1, currentPlace.col + 1);
        }
        if (CheckBounds.inBounds(option1.col) && CheckBounds.inBounds(option1.row)) {
            if (board.getPiece(option1) != undefined) {
                if (board.getPiece(option1)?.player != player) {
                    if (!(board.getPiece(option1) instanceof King))
                        arrayOfMoves.push(option1);
                }
            }
        }
        if (CheckBounds.inBounds(option2.col) && CheckBounds.inBounds(option2.row)) {
            if (board.getPiece(option2) != undefined) {
                if (board.getPiece(option2)?.player != player) {
                    if (!(board.getPiece(option2) instanceof King))
                        arrayOfMoves.push(option2);
                }
            }
        }
    }

    public enPassant(currentPlace: Square,board:Board,player:Player,arrayOfMoves:Array<any>)
    {
        let option1=new Square(currentPlace.row,currentPlace.col-1);
        let option2=new Square(currentPlace.row,currentPlace.col+1);
        if (CheckBounds.inBounds(option1.col) && CheckBounds.inBounds(option1.row))
        {
            if (board.getPiece(option1) instanceof Pawn)
            {
                let pawn:Pawn= (<Pawn>board.getPiece(option1));
                if (pawn.possibleEnPassant)
                {
                    let modifier:number;
                    if (this.player == Player.WHITE)
                        modifier = 1;
                    else
                        modifier=-1;
                    arrayOfMoves.push(new Square(currentPlace.row+modifier,option1.col));
                }
            }
        }
        if (CheckBounds.inBounds(option2.col) && CheckBounds.inBounds(option2.row))
        {
            let target=board.getPiece(option2);
            if (board.getPiece(option2) instanceof Pawn)
            {
                let pawn:Pawn= (<Pawn>board.getPiece(option2));
                if (pawn.possibleEnPassant)
                {
                    let modifier:number;
                    if (this.player == Player.WHITE)
                        modifier = 1;
                    else
                        modifier = -1;
                    arrayOfMoves.push(new Square(currentPlace.row+modifier,option2.col));
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
