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
        let currentPosition=board.findPiece(this);
        let arrayOfMoves = new Array();

        let position:Square=new Square(currentPosition.row+1,currentPosition.col+1);
        while (CheckBounds.inBounds(position.row) && CheckBounds.inBounds(position.col))
        {
            //intreaba-l pe Raimond, aici aveai position in loc de new Square si facea niste chestii ciudate
            //was it a refference?
            arrayOfMoves.push(new Square(position.row,position.col));
            if (board.getPiece(position)!=undefined)
                break;
            position.col+=1;
            position.row+=1;
        }
        position=new Square(currentPosition.row-1,currentPosition.col-1);
        while (CheckBounds.inBounds(position.row) && CheckBounds.inBounds(position.col))
        {
            arrayOfMoves.push(new Square(position.row,position.col));
            if (board.getPiece(position)!=undefined)
                break;
            position.col-=1;
            position.row-=1;
        }
        position=new Square(currentPosition.row-1,currentPosition.col+1);
        while (CheckBounds.inBounds(position.row) && CheckBounds.inBounds(position.col))
        {
            arrayOfMoves.push(new Square(position.row,position.col));
            if (board.getPiece(position)!=undefined)
                break;
            position.col+=1;
            position.row-=1;
        }
        position=new Square(currentPosition.row+1,currentPosition.col-1);
        while (CheckBounds.inBounds(position.row) && CheckBounds.inBounds(position.col))
        {
            arrayOfMoves.push(new Square(position.row,position.col));
            if (board.getPiece(position)!=undefined)
                break;
            position.col-=1;
            position.row+=1;
        }
        for (let i=0;i<arrayOfMoves.length;i++) {
            if (board.getPiece(arrayOfMoves.at(i))?.player==this.player) {
                arrayOfMoves.splice(i,1);
            }
            else
            {
                if (board.getPiece(arrayOfMoves.at(i)) instanceof King)
                    arrayOfMoves.splice(i,1);
            }
        }
        return arrayOfMoves;
    }

}
