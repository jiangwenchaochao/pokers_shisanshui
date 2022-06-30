export var NormalType;
(function (NormalType) {
    NormalType[NormalType["WU_LONG"] = 0] = "WU_LONG";
    NormalType[NormalType["DUI_ZI"] = 1] = "DUI_ZI";
    NormalType[NormalType["LIANG_DUI"] = 2] = "LIANG_DUI";
    NormalType[NormalType["SAN_TIAO"] = 3] = "SAN_TIAO";
    NormalType[NormalType["SHUN_ZI"] = 4] = "SHUN_ZI";
    NormalType[NormalType["TONG_HUA"] = 5] = "TONG_HUA";
    NormalType[NormalType["HU_LU"] = 6] = "HU_LU";
    NormalType[NormalType["TIE_ZHI"] = 7] = "TIE_ZHI";
    NormalType[NormalType["TONG_HUA_SHUN"] = 8] = "TONG_HUA_SHUN";
})(NormalType = NormalType || (NormalType = {}));
export var SpecialType;
(function (SpecialType) {
    SpecialType[SpecialType["None"] = 0] = "None";
    SpecialType[SpecialType["ZhiZunQingLong"] = 1] = "ZhiZunQingLong";
    SpecialType[SpecialType["YiTiaoLong"] = 2] = "YiTiaoLong";
    SpecialType[SpecialType["ShiErHuangZu"] = 3] = "ShiErHuangZu";
    SpecialType[SpecialType["SanTongHuaShun"] = 4] = "SanTongHuaShun";
    SpecialType[SpecialType["SanFenTianXia"] = 5] = "SanFenTianXia";
    SpecialType[SpecialType["QuanDa"] = 6] = "QuanDa";
    SpecialType[SpecialType["QuanXiao"] = 7] = "QuanXiao";
    SpecialType[SpecialType["ChouYiSe"] = 8] = "ChouYiSe";
    SpecialType[SpecialType["SiTaoSanTiao"] = 9] = "SiTaoSanTiao";
    SpecialType[SpecialType["WuDuiSanTiao"] = 10] = "WuDuiSanTiao";
    SpecialType[SpecialType["LiuDuiBan"] = 11] = "LiuDuiBan";
    SpecialType[SpecialType["SanSunZi"] = 12] = "SanSunZi";
    SpecialType[SpecialType["SanTongHua"] = 13] = "SanTongHua";
})(SpecialType = SpecialType || (SpecialType = {}));
export var PokerPoint;
(function (PokerPoint) {
    PokerPoint[PokerPoint["PokerNone"] = 0] = "PokerNone";
    PokerPoint[PokerPoint["PokerA"] = 1] = "PokerA";
    PokerPoint[PokerPoint["Poker2"] = 2] = "Poker2";
    PokerPoint[PokerPoint["Poker3"] = 3] = "Poker3";
    PokerPoint[PokerPoint["Poker4"] = 4] = "Poker4";
    PokerPoint[PokerPoint["Poker5"] = 5] = "Poker5";
    PokerPoint[PokerPoint["Poker6"] = 6] = "Poker6";
    PokerPoint[PokerPoint["Poker7"] = 7] = "Poker7";
    PokerPoint[PokerPoint["Poker8"] = 8] = "Poker8";
    PokerPoint[PokerPoint["Poker9"] = 9] = "Poker9";
    PokerPoint[PokerPoint["PokerT"] = 10] = "PokerT";
    PokerPoint[PokerPoint["PokerJ"] = 11] = "PokerJ";
    PokerPoint[PokerPoint["PokerQ"] = 12] = "PokerQ";
    PokerPoint[PokerPoint["PokerK"] = 13] = "PokerK";
})(PokerPoint = PokerPoint || (PokerPoint = {}));
export var PokerHua;
(function (PokerHua) {
    PokerHua[PokerHua["HuaNone"] = 0] = "HuaNone";
    PokerHua[PokerHua["Hua1"] = 1] = "Hua1";
    PokerHua[PokerHua["Hua2"] = 2] = "Hua2";
    PokerHua[PokerHua["Hua3"] = 3] = "Hua3";
    PokerHua[PokerHua["Hua4"] = 4] = "Hua4";
})(PokerHua = PokerHua || (PokerHua = {}));
export var CompareResult;
(function (CompareResult) {
    CompareResult[CompareResult["Same"] = 0] = "Same";
    CompareResult[CompareResult["Better"] = 1] = "Better";
    CompareResult[CompareResult["Worse"] = 2] = "Worse";
})(CompareResult = CompareResult || (CompareResult = {}));
export default class Util {
    /**
     * 给扑克排序，按花色及分值从小到大的顺序
     * @param pokers
     */
    static SortPoker(pokers) {
        pokers.sort((a, b) => {
            if (a.Score == b.Score) {
                return a.Hua - b.Hua;
            }
            return a.Score - b.Score;
        });
    }
    /**
     * 将NormalType转成中文
     * @param e:NormalType
     * @returns 中文
     */
    static NormalTypeToString(e) {
        switch (e) {
            case NormalType.WU_LONG:
                return "乌龙";
            case NormalType.DUI_ZI:
                return "对子";
            case NormalType.LIANG_DUI:
                return "两对";
            case NormalType.SAN_TIAO:
                return "三张";
            case NormalType.SHUN_ZI:
                return "顺子";
            case NormalType.TONG_HUA:
                return "同花";
            case NormalType.HU_LU:
                return "葫芦";
            case NormalType.TIE_ZHI:
                return "炸弹";
            case NormalType.TONG_HUA_SHUN:
                return "同花顺";
            default:
                return "乌龙";
        }
    }
    /**
     * 将NormalType转成中文
     * @param e:NormalType
     * @returns 中文
     */
    static SpecialTypeToString(specialType) {
        switch (specialType) {
            case SpecialType.None:
                return "不是特殊牌型";
            case SpecialType.ZhiZunQingLong:
                return "至尊青龙";
            case SpecialType.YiTiaoLong:
                return "一条龙";
            case SpecialType.ShiErHuangZu:
                return "十二皇族";
            case SpecialType.SanTongHuaShun:
                return "三同花顺";
            case SpecialType.SanFenTianXia:
                return "三分天下";
            case SpecialType.QuanDa:
                return "全大";
            case SpecialType.QuanXiao:
                return "全小";
            case SpecialType.ChouYiSe:
                return "凑一色";
            case SpecialType.SiTaoSanTiao:
                return "四套三条";
            case SpecialType.WuDuiSanTiao:
                return "五对三条";
            case SpecialType.LiuDuiBan:
                return "六对半";
            case SpecialType.SanSunZi:
                return "三顺子";
            case SpecialType.SanTongHua:
                return "三同花";
            default:
                return "";
        }
    }

    static SpecialTypeToString(specialType) {
        switch (specialType) {
            case SpecialType.None:
                return "不是特殊牌型";
            case SpecialType.ZhiZunQingLong:
                return "至尊青龙";
            case SpecialType.YiTiaoLong:
                return "一条龙";
            // case SpecialType.ShiErHuangZu:
            //     return "十二皇族";
            case SpecialType.SanTongHuaShun:
                return "三同花顺";
            // case SpecialType.SanFenTianXia:
            //     return "三分天下";
            // case SpecialType.QuanDa:
            //     return "全大";
            case SpecialType.QuanXiao:
                return "全小";
            // case SpecialType.ChouYiSe:
            //     return "凑一色";
            // case SpecialType.SiTaoSanTiao:
            //     return "四套三条";
            // case SpecialType.WuDuiSanTiao:
            //     return "五对三条";
            case SpecialType.LiuDuiBan:
                return "六对半";
            case SpecialType.SanSunZi:
                return "三顺子";
            case SpecialType.SanTongHua:
                return "三同花";
            default:
                return "";
        }
    }
    /**
     * 将PokerPoint转成中文
     * @param e:PokerPoint
     * @returns 中文
     */
    static PokerPointToString(p) {
        switch (p) {
            case PokerPoint.PokerA:
                return "A";
            case PokerPoint.Poker2:
                return "2";
            case PokerPoint.Poker3:
                return "3";
            case PokerPoint.Poker4:
                return "4";
            case PokerPoint.Poker5:
                return "5";
            case PokerPoint.Poker6:
                return "6";
            case PokerPoint.Poker7:
                return "7";
            case PokerPoint.Poker8:
                return "8";
            case PokerPoint.Poker9:
                return "9";
            case PokerPoint.PokerT:
                return "T";
            case PokerPoint.PokerJ:
                return "J";
            case PokerPoint.PokerQ:
                return "Q";
            case PokerPoint.PokerK:
                return "K";
            default:
                return "";
        }
    }
    /**
    * 该张牌的13水公值
    * @param e:PokerPoint
    * @returns 中文
    */
    static PokerPointToShiSanShuiScore(p) {
        switch (p) {
            case PokerPoint.PokerA:
                return 14;
            case PokerPoint.Poker2:
                return 2;
            case PokerPoint.Poker3:
                return 3;
            case PokerPoint.Poker4:
                return 4;
            case PokerPoint.Poker5:
                return 5;
            case PokerPoint.Poker6:
                return 6;
            case PokerPoint.Poker7:
                return 7;
            case PokerPoint.Poker8:
                return 8;
            case PokerPoint.Poker9:
                return 9;
            case PokerPoint.PokerT:
                return 10;
            case PokerPoint.PokerJ:
                return 11;
            case PokerPoint.PokerQ:
                return 12;
            case PokerPoint.PokerK:
                return 13;
            default:
                return 0;
        }
    }
    /**
     * 将enum类型的PokerHua转成花色显示
     * @param hua:PokerHua
     * @returns 花色
     */
    static PokerHuaToString(hua) {
        switch (hua) {
            case PokerHua.Hua1:
                return "♦";
            case PokerHua.Hua2:
                return "♣";
            case PokerHua.Hua3:
                return "♥";
            case PokerHua.Hua4:
                return "♠";
            default:
                return "";
        }
    }
   /**
     * 字符转扑克花
     * @param str 字符
     * @returns 扑克花
     */
    static StringToPokerHua(str) {
        switch (str) {
            case "♦":
                return PokerHua.Hua1;
            case "♣":
                return PokerHua.Hua2;
            case "♥":
                return PokerHua.Hua3;
            case "♠":
                return PokerHua.Hua4;
            default:
                console.error("hua is not exist!");
                return PokerHua.HuaNone;
        }
    }
    /**
     * 数值转扑克点数
     * @param str 数值
     * @returns 扑克点数
     */
    static StringToPokerPoint(str) {
        switch (str) {
            case "A":
                return PokerPoint.PokerA;
            case "2":
                return PokerPoint.Poker2;
            case "3":
                return PokerPoint.Poker3;
            case "4":
                return PokerPoint.Poker4;
            case "5":
                return PokerPoint.Poker5;
            case "6":
                return PokerPoint.Poker6;
            case "7":
                return PokerPoint.Poker7;
            case "8":
                return PokerPoint.Poker8;
            case "9":
                return PokerPoint.Poker9;
            case "T":
                return PokerPoint.PokerT;
            case "J":
                return PokerPoint.PokerJ;
            case "Q":
                return PokerPoint.PokerQ;
            case "K":
                return PokerPoint.PokerK;
            default:
                return 0;
        }
    }
}
