import Player from '../player';
import Board from '../board';
import Square from '../square';
import SingletonKings from "./SingletonKings";
import Pawn from "./pawn";

export default class Piece {
    public player: Player;
    public moved: boolean;

    public constructor(player: Player) {
        this.player = player;
        this.moved = false;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        const king: SingletonKings= SingletonKings.getInstnace(this.player,board);

        if (king.checked) {
            board.setPiece(newSquare,new Pawn(this.player));
            const isChecked: boolean=king.checked;
            board.setPiece(newSquare,undefined);
            if (!isChecked)
                board.movePiece(currentSquare, newSquare);
        }
        else
            board.movePiece(currentSquare, newSquare);
        this.moved=true;
    }
}
