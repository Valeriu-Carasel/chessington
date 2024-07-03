import Board from "../board";
import Square from "../square";
import King from "./king";
import Player from "../player";

export default class PieceTaker{
    public static takePieces(board:Board,arrayOfMoves:Array<any>,player:Player)
    {
        for (let i=0;i<arrayOfMoves.length;i++) {
            if (board.getPiece(arrayOfMoves.at(i))?.player==player) {
                arrayOfMoves.splice(i,1);
            }
            else
            {
                if (board.getPiece(arrayOfMoves.at(i)) instanceof King)
                    arrayOfMoves.splice(i,1);
            }
        }
    }
}