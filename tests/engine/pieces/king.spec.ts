import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Pawn from '../../../src/engine/pieces/pawn';
import Rook from "../../../src/engine/pieces/rook";
import Piece from "../../../src/engine/pieces/piece";
import {assert} from "chai";
import Bishop from "../../../src/engine/pieces/bishop";

describe('King', () => {
    let board: Board;
    beforeEach(() => board = new Board());

    it('can move to adjacent squares', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [
            Square.at(2, 3), Square.at(2, 4), Square.at(2, 5), Square.at(3, 5),
            Square.at(4, 5), Square.at(4, 4), Square.at(4, 3), Square.at(3, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        moves.should.have.length(8);
    });

    it('cannot leave the board', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(0, 0), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [Square.at(0, 1), Square.at(1, 1), Square.at(1, 0)];

        moves.should.have.deep.members(expectedMoves);
    });

    it('can take opposing pieces', () => {
        const king = new King(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(5, 5));
    });

    it('cannot take the opposing king', () => {
        const king = new King(Player.WHITE);
        const opposingKing = new King(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingKing);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });

    it('cannot take friendly pieces', () => {
        const king = new King(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), friendlyPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });

    it('can castle', () => {
        const king: King = new King(Player.WHITE);
        const rookLeft: Rook = new Rook(Player.WHITE);


        board.setPiece(Square.at(0,4),king);
        board.setPiece(Square.at(0,0),rookLeft);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(0,2));
    });

    it ('did castle correctly', () => {
        const king: King = new King(Player.WHITE);
        const rookLeft: Rook = new Rook(Player.WHITE);

        board.setPiece(Square.at(0,4),king);
        board.setPiece(Square.at(0,0),rookLeft);

        king.moveTo(board,Square.at(0,2));
        const presumedKing: Piece | undefined = board.getPiece(Square.at(0,2));
        const presumedRook: Piece | undefined = board.getPiece(Square.at(0,3));

        if (!(presumedKing instanceof King && presumedRook instanceof Rook)) {
            assert.fail()
        }
    });

    it ('check bishop', () =>{
       const king: King = new King(Player.WHITE);
       const bishop: Bishop = new Bishop(Player.BLACK);

       board.setPiece(Square.at(0,0), king);
       board.setPiece(Square.at(4,4), bishop);

       king.moveTo(board,Square.at(0,1));
       if (king.checkIfPositionIsChecked(Square.at(0,1),board,Player.WHITE))
           assert.fail();
    });

});
