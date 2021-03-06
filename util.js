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
     * ?????????????????????????????????????????????????????????
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
     * ???NormalType????????????
     * @param e:NormalType
     * @returns ??????
     */
    static NormalTypeToString(e) {
        switch (e) {
            case NormalType.WU_LONG:
                return "??????";
            case NormalType.DUI_ZI:
                return "??????";
            case NormalType.LIANG_DUI:
                return "??????";
            case NormalType.SAN_TIAO:
                return "??????";
            case NormalType.SHUN_ZI:
                return "??????";
            case NormalType.TONG_HUA:
                return "??????";
            case NormalType.HU_LU:
                return "??????";
            case NormalType.TIE_ZHI:
                return "??????";
            case NormalType.TONG_HUA_SHUN:
                return "?????????";
            default:
                return "??????";
        }
    }
    /**
     * ???NormalType????????????
     * @param e:NormalType
     * @returns ??????
     */
    static SpecialTypeToString(specialType) {
        switch (specialType) {
            case SpecialType.None:
                return "??????????????????";
            case SpecialType.ZhiZunQingLong:
                return "????????????";
            case SpecialType.YiTiaoLong:
                return "?????????";
            case SpecialType.ShiErHuangZu:
                return "????????????";
            case SpecialType.SanTongHuaShun:
                return "????????????";
            case SpecialType.SanFenTianXia:
                return "????????????";
            case SpecialType.QuanDa:
                return "??????";
            case SpecialType.QuanXiao:
                return "??????";
            case SpecialType.ChouYiSe:
                return "?????????";
            case SpecialType.SiTaoSanTiao:
                return "????????????";
            case SpecialType.WuDuiSanTiao:
                return "????????????";
            case SpecialType.LiuDuiBan:
                return "?????????";
            case SpecialType.SanSunZi:
                return "?????????";
            case SpecialType.SanTongHua:
                return "?????????";
            default:
                return "";
        }
    }

    static SpecialTypeToString(specialType) {
        switch (specialType) {
            case SpecialType.None:
                return "??????????????????";
            case SpecialType.ZhiZunQingLong:
                return "????????????";
            case SpecialType.YiTiaoLong:
                return "?????????";
            // case SpecialType.ShiErHuangZu:
            //     return "????????????";
            case SpecialType.SanTongHuaShun:
                return "????????????";
            // case SpecialType.SanFenTianXia:
            //     return "????????????";
            // case SpecialType.QuanDa:
            //     return "??????";
            case SpecialType.QuanXiao:
                return "??????";
            // case SpecialType.ChouYiSe:
            //     return "?????????";
            // case SpecialType.SiTaoSanTiao:
            //     return "????????????";
            // case SpecialType.WuDuiSanTiao:
            //     return "????????????";
            case SpecialType.LiuDuiBan:
                return "?????????";
            case SpecialType.SanSunZi:
                return "?????????";
            case SpecialType.SanTongHua:
                return "?????????";
            default:
                return "";
        }
    }
    /**
     * ???PokerPoint????????????
     * @param e:PokerPoint
     * @returns ??????
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
    * ????????????13?????????
    * @param e:PokerPoint
    * @returns ??????
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
     * ???enum?????????PokerHua??????????????????
     * @param hua:PokerHua
     * @returns ??????
     */
    static PokerHuaToString(hua) {
        switch (hua) {
            case PokerHua.Hua1:
                return "???";
            case PokerHua.Hua2:
                return "???";
            case PokerHua.Hua3:
                return "???";
            case PokerHua.Hua4:
                return "???";
            default:
                return "";
        }
    }
   /**
     * ??????????????????
     * @param str ??????
     * @returns ?????????
     */
    static StringToPokerHua(str) {
        switch (str) {
            case "???":
                return PokerHua.Hua1;
            case "???":
                return PokerHua.Hua2;
            case "???":
                return PokerHua.Hua3;
            case "???":
                return PokerHua.Hua4;
            default:
                console.error("hua is not exist!");
                return PokerHua.HuaNone;
        }
    }
    /**
     * ?????????????????????
     * @param str ??????
     * @returns ????????????
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
