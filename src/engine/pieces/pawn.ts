import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import CheckBounds from "./CheckBounds";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
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

        return arrayOfMoves;
    }

    public add(square:Square,array:Array<Square>,board:Board):void
    {
        if (CheckBounds.inBounds(square.col) && CheckBounds.inBounds(square.row))
            if (board.getPiece(square)===undefined)
                 array.push(square);
    }
}
