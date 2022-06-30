import Util from './util.js'
export default class Poker {
    constructor(point, hua) {
        this.Point = point;
        this.Hua = hua;
        this.ASCII = (hua - 1) * 16 + point;
        this.Score = Util.PokerPointToShiSanShuiScore(this.Point);
        this.Desc = Util.PokerHuaToString(this.Hua) +  Util.PokerPointToString(this.Point);
    }
}