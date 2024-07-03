import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import Bishop from "./bishop";
import CheckBounds from "./CheckBounds";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let currentPosition=board.findPiece(this);
        let arrayOfMoves=new Array();

        //rook part
        for (let i=currentPosition.row-1;i>=0;i--)
        {
            if (board.getPiece(new Square(i,currentPosition.col))!=undefined)
                break;
            else
                arrayOfMoves.push(new Square(i,currentPosition.col));
        }
        for (let i=currentPosition.row+1;i<=7;i++)
        {
            if (board.getPiece(new Square(i,currentPosition.col))!=undefined)
                break;
            else
                arrayOfMoves.push(new Square(i,currentPosition.col));
        }
        for (let i=currentPosition.col-1;i>=0;i--)
        {
            if (board.getPiece(new Square(currentPosition.row,i))!=undefined)
                break;
            else
                arrayOfMoves.push(new Square(currentPosition.row,i));
        }
        for (let i=currentPosition.col+1;i<=7;i++)
        {
            if (board.getPiece(new Square(currentPosition.row,i))!=undefined)
                break;
            else
                arrayOfMoves.push(new Square(currentPosition.row,i));
        }

        //bishop part
        let position:Square=new Square(currentPosition.row+1,currentPosition.col+1);
        while (CheckBounds.inBounds(position.row) && CheckBounds.inBounds(position.col) && board.getPiece(position)==undefined)
        {
            //intreaba-l pe Raimond, aici aveai position in loc de new Square si facea niste chestii ciudate
            //was it a refference?
            arrayOfMoves.push(new Square(position.row,position.col));
            position.col+=1;
            position.row+=1;
        }
        position=new Square(currentPosition.row-1,currentPosition.col-1);
        while (CheckBounds.inBounds(position.row) && CheckBounds.inBounds(position.col) && board.getPiece(position)==undefined)
        {
            arrayOfMoves.push(new Square(position.row,position.col));
            position.col-=1;
            position.row-=1;
        }
        position=new Square(currentPosition.row-1,currentPosition.col+1);
        while (CheckBounds.inBounds(position.row) && CheckBounds.inBounds(position.col) && board.getPiece(position)==undefined)
        {
            arrayOfMoves.push(new Square(position.row,position.col));
            position.col+=1;
            position.row-=1;
        }
        position=new Square(currentPosition.row+1,currentPosition.col-1);
        while (CheckBounds.inBounds(position.row) && CheckBounds.inBounds(position.col) && board.getPiece(position)==undefined)
        {
            arrayOfMoves.push(new Square(position.row,position.col));
            position.col-=1;
            position.row+=1;
        }
        return arrayOfMoves;
    }
}
