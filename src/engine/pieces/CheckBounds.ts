import Square from "../square";

export default class CheckBounds {

    public static inBounds(numar: number): boolean {
        return numar >= 0 && numar <= 7;
    }

    public static squareInBounds(square:Square):boolean
    {
        return CheckBounds.inBounds(square.row) && CheckBounds.inBounds(square.col);
    }
}