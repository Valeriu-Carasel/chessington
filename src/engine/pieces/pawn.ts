import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import CheckBounds from "./CheckBounds";
import King from "./king";

export default class Pawn extends Piece {

    private _possibleEnPassant:boolean=false;

    public constructor(player: Player) {
        super(player);
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
        var modifier:number;
        if (this.player==Player.WHITE) {
            modifier = 1;
            if (currentPlace.row==1)
            {
                let square1=new Square(currentPlace.row + (2*modifier), currentPlace.col);
                let square2=new Square(currentPlace.row + modifier, currentPlace.col);
                if (board.getPiece(square1)===undefined && board.getPiece(square2)==undefined)
                    this.add(square1,arrayOfMoves,board);
            }
            let square=new Square(currentPlace.row + modifier, currentPlace.col);
            this.add(square,arrayOfMoves,board);
        }
        else
        {
            modifier=-1;
            if (currentPlace.row==6)
            {
                let square1=new Square(currentPlace.row + (2*modifier), currentPlace.col);
                let square2=new Square(currentPlace.row + modifier, currentPlace.col);
                if (board.getPiece(square1)===undefined && board.getPiece(square2)==undefined)
                    this.add(square1,arrayOfMoves,board);
            }
            let square=new Square(currentPlace.row + modifier, currentPlace.col);
            this.add(square,arrayOfMoves,board);
        }

        this.takePiece(currentPlace,board,this.player,arrayOfMoves);
        this.enPassant(currentPlace,board,this.player,arrayOfMoves)
        return arrayOfMoves;
    }

    public add(square:Square,array:Array<Square>,board:Board):void
    {
        if (CheckBounds.inBounds(square.col) && CheckBounds.inBounds(square.row))
            if (board.getPiece(square)===undefined)
                 array.push(square);
    }

    public takePiece(currentPlace:Square,board:Board,player:Player,arrayOfMoves:Array<any>):void {
        let option1:Square;
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
                    if (this.player==Player.WHITE)
                        modifier=1;
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
                    if (this.player==Player.WHITE)
                        modifier=1;
                    else
                        modifier=-1;
                    arrayOfMoves.push(new Square(currentPlace.row+modifier,option2.col));
                }
            }
        }
    }
}
