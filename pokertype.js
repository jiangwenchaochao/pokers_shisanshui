
import Util,{NormalType,  CompareResult} from './util.js';
export class Tree { 
    constructor(pokers) {
        this.pokers = pokers;
        Util.SortPoker(this.pokers);
        this.mapScoreListPoker = new Map();
        this.mapHuaListPoker = new Map();
        this.listShunZi = new Array();
        this.listTieZhi = new Array();
        this.listSanTiao = new Array();
        this.listDui = new Array();
        this.listDanPai = new Array();
        this.Nodes = new Array();
        this.statistic();
    }
    statistic() {
        this.statisticsHuaOrScore();
        this.statisticsSunZi();
        this.statistics1234();
    }
    /**
     * 分组:按花分组或按大小分组
     */
    statisticsHuaOrScore() {
        this.pokers.forEach(poker => {
            var sameScorePokers = this.mapScoreListPoker.get(poker.Score);
            if (sameScorePokers == null) {
                sameScorePokers = new Array();
            }
            sameScorePokers.push(poker);
            this.mapScoreListPoker.set(poker.Score, sameScorePokers);
            var sameHuaPokers = this.mapHuaListPoker.get(poker.Hua);
            if (sameHuaPokers == null) {
                sameHuaPokers = new Array();
            }
            sameHuaPokers.push(poker);
            this.mapHuaListPoker.set(poker.Hua, sameHuaPokers);
        });
    }
    /**
     * 统计顺子，从顺a到顺b
     */
    statisticsSunZi() {
        var _tempStart = 0;
        var _tempEnd = 0;
        var _tempCount = 0;
        for (let score = 2; score <= 14; score++) {
            if (this.mapScoreListPoker.has(score)) {
                if (_tempStart == 0) {
                    _tempStart = score; //从哪开始连接，比如从2分开始连续
                    _tempCount = 1; //共连续的长度
                }
                else {
                    _tempCount = _tempCount + 1;
                }
                if (_tempCount >= 5) {
                    _tempEnd = score;
                    this.listShunZi.push(new Array(_tempEnd - 4, _tempEnd));
                }
            }
            else {
                _tempStart = 0;
                _tempCount = 1;
            }
        }
        var isHaveSpecialSunZi = () => {
            var specialShunZiSocre = [14, 2, 3, 4, 5];
            for (const score of specialShunZiSocre) {
                if (!this.mapScoreListPoker.has(score)) {
                    return false;
                }
            }
            return true;
        };
        if (isHaveSpecialSunZi()) {
            this.listShunZi.push([2, 14]);
        }
    }
    /**
     * 统计单牌，对子，三条，铁支
     */
    statistics1234() {
        //是否是单牌：虽然是单张的，但即不在顺子里，也不在同花里，则为单牌
        var isDanPai = (poker) => {
            //如果顺子里不包括该张牌，就是单牌
            for (const shunZi of this.listShunZi) {
                if ((poker.Score >= shunZi[0] && poker.Score <= shunZi[0] + 3)) {
                    return false;
                }
                else if (poker.Score == shunZi[1]) {
                    return false;
                }
            }
            var isInTongHua = true;
            //如果同花列表里有这张牌，就
            this.mapHuaListPoker.forEach((pokers, _) => {
                if (pokers.length >= 5) {
                    for (const p of pokers) {
                        if (p == poker) {
                            isInTongHua = false;
                        }
                    }
                }
            });
            return isInTongHua;
        };
        this.mapScoreListPoker.forEach((pokers, score) => {
            var count = pokers.length;
            switch (count) {
                case 1:
                    if (isDanPai(pokers[0])) {
                        this.listDanPai.push(score);
                    }
                    break;
                case 2:
                    this.listDui.push(score);
                    break;
                case 3:
                    this.listSanTiao.push(score);
                    break;
                case 4:
                    this.listTieZhi.push(score);
                    break;
            }
        });
        // //把三条拆成对子 和单牌
        // this.listSanTiao.forEach(e => {
        //     this.listDui.push(e);
        //     this.listDanPai.push(e);
        // })
        this.listDanPai.sort((a, b) => { return a - b; });
        this.listDui.sort((a, b) => { return a - b; });
        this.listSanTiao.sort((a, b) => { return a - b; });
        this.listTieZhi.sort((a, b) => { return a - b; });
    }
}
export class TreeNode {
    constructor() {
        this.pokers = new Array();
        this.rest = new Array();
    }
    ToString() {
        var pokerDesc = "";
        this.pokers.forEach(poker => {
            pokerDesc += poker.Desc;
        });
        var restDesc = "";
        this.rest.forEach(poker => {
            restDesc += poker.Desc;
        });
        
        return `结点：{类型=【${ Util.NormalTypeToString(this.normalType)}】,左节点=【${pokerDesc}】,右节点=【${restDesc}】}`;
    }
    /**
    * 牌型间的外部比较，用于比较大小
    * @param other 另一个牌型节点
    * @returns 结果
    */
    CompareExternal(other) {
        if (this.normalType > other.normalType) {
            return  CompareResult.Better;
        }
        if (this.normalType < other.normalType) {
            return  CompareResult.Worse;
        }
        switch (this.normalType) {
            case  NormalType.WU_LONG:
                return this.ComparePokerScore(this.pokers, other.pokers);
            case  NormalType.TONG_HUA_SHUN:
                return this.ComparePokerScore(this.pokers, other.pokers);
            case  NormalType.TONG_HUA:
                return this.ComparePokerScore(this.pokers, other.pokers);
            case  NormalType.SHUN_ZI:
                return this.ComparePokerScore(this.pokers, other.pokers);
            case  NormalType.LIANG_DUI:
                return this.liangDui.CompareExternal(other.liangDui);
            case  NormalType.DUI_ZI:
                return this.dui.CompareExternal(other.dui);
            case  NormalType.SAN_TIAO:
                return this.sanTiao.CompareExternal(other.sanTiao);
            case  NormalType.HU_LU:
                return this.huLu.CompareExternal(other.huLu);
            case  NormalType.TIE_ZHI:
                return this.tieZhi.CompareExternal(other.tieZhi);
        }
    }


    
    /**
     * 比较两组牌的分值，循环依次比较两组牌的每一张牌
     * @param pokerArray1
     * @param pokerArray2
     * @returns
     */
    ComparePokerScore(pokerArray1, pokerArray2) {
         Util.SortPoker(pokerArray1);
         Util.SortPoker(pokerArray2);
        var count1 = pokerArray1.length;
        var count2 = pokerArray2.length;
        var min = 0;
        if (count1 > count2) {
            min = count2;
        }
        else {
            min = count1;
        }
        for (let index = 1; index <= min; index++) {
            const poker1 = pokerArray1[count1 - index];
            const poker2 = pokerArray2[count2 - index];
            if (poker1.Score > poker2.Score) {
                return  CompareResult.Better;
            }
            else if (poker1.Score < poker2.Score) {
                return  CompareResult.Worse;
            }
        }
        if (count1 > count2) {
            return  CompareResult.Better;
        }
        if (count1 < count2) {
            return  CompareResult.Worse;
        }
        return  CompareResult.Same;
    }

    /**
    * 牌型间的外部比较，用于比较大小
    * @param other 另一个牌型节点
    * @returns 反向比较
    */
     reCompareExternal(other) {
        // ////debugger
        if (this.normalType > other.normalType) {
            return  CompareResult.Better;
        }
        if (this.normalType < other.normalType) {
            return  CompareResult.Worse;
        }
        switch (this.normalType) {
            case  NormalType.WU_LONG:
                return this.reComparePokerScore(this.pokers, other.pokers);
            case  NormalType.TONG_HUA_SHUN:
                return this.ComparePokerScore(this.pokers, other.pokers);
            case  NormalType.TONG_HUA:
                return this.ComparePokerScore(this.pokers, other.pokers);
            case  NormalType.SHUN_ZI:
                return this.ComparePokerScore(this.pokers, other.pokers);
            case  NormalType.LIANG_DUI:
                return this.liangDui.reCompareExternal(other.liangDui);
            case  NormalType.DUI_ZI:
                return this.dui.reCompareExternal(other.dui);
            case  NormalType.SAN_TIAO:
                return this.sanTiao.reCompareExternal(other.sanTiao);
            case  NormalType.HU_LU:
                return this.huLu.reCompareExternal(other.huLu);
            case  NormalType.TIE_ZHI:
                return this.tieZhi.reCompareExternal(other.tieZhi);
        }
    }

    /**
     * 比较两组牌的分值，循环依次比较两组牌的每一张牌
     * @param pokerArray1
     * @param pokerArray2
     * @returns
     */
    reComparePokerScore(pokerArray1, pokerArray2) {
        Util.SortPoker(pokerArray1);
        Util.SortPoker(pokerArray2);
       var count1 = pokerArray1.length;
       var count2 = pokerArray2.length;
       var min = 0;
       if (count1 > count2) {
           min = count2;
       }
       else {
           min = count1;
       }
       for (let index = 1; index <= min; index++) {
           const poker1 = pokerArray1[count1 - index];
           const poker2 = pokerArray2[count2 - index];
           if (poker1.Score > poker2.Score) {
               return  CompareResult.Better;
           }
           else if (poker1.Score < poker2.Score) {
               return  CompareResult.Worse;
           }
       }
       if (count1 < count2) {
           return  CompareResult.Better;
       }
       if (count1 > count2) {
           return  CompareResult.Worse;
       }
       return  CompareResult.Same;
   }
}
 //exports.TreeNode = TreeNode;
 export class Dui {

    reCompareExternal(other) {
        if (this.DuiScore < other.DuiScore) {
            return  CompareResult.Better;
        }
        else if (this.DuiScore > other.DuiScore) {
            return  CompareResult.Worse;
        }
        if (this.Dan3Score < other.Dan3Score) {
            return  CompareResult.Better;
        }
        else if (this.Dan3Score > other.Dan3Score) {
            return  CompareResult.Worse;
        }
        if (this.Dan2Score < other.Dan2Score) {
            return  CompareResult.Better;
        }
        else if (this.Dan2Score > other.Dan2Score) {
            return  CompareResult.Worse;
        }
        if (this.Dan1Score < other.Dan1Score) {
            return  CompareResult.Better;
        }
        else if (this.Dan1Score > other.Dan1Score) {
            return  CompareResult.Worse;
        }
        return  CompareResult.Same;
    }



    /**
     * 对子的外部比较，对越大越好，单牌也越大越好
     * @param other
     * @returns 结果
     */
    CompareExternal(other) {
        if (this.DuiScore > other.DuiScore) {
            return  CompareResult.Better;
        }
        else if (this.DuiScore < other.DuiScore) {
            return  CompareResult.Worse;
        }
        if (this.Dan3Score > other.Dan3Score) {
            return  CompareResult.Better;
        }
        else if (this.Dan3Score < other.Dan3Score) {
            return  CompareResult.Worse;
        }
        if (this.Dan2Score > other.Dan2Score) {
            return  CompareResult.Better;
        }
        else if (this.Dan2Score < other.Dan2Score) {
            return  CompareResult.Worse;
        }
        if (this.Dan1Score > other.Dan1Score) {
            return  CompareResult.Better;
        }
        else if (this.Dan1Score < other.Dan1Score) {
            return  CompareResult.Worse;
        }
        return  CompareResult.Same;
    }
}
 //exports.Dui = Dui;
export class LiangDui {

    /**
     * 反向比较
     * @param other 另一个两对
     * @returns
     */
     reCompareExternal(other) {
        if (this.Dui1Score < other.Dui1Score) {
            return  CompareResult.Better;
        }
        else if (this.Dui1Score > other.Dui1Score) {
            return  CompareResult.Worse;
        }
        if (this.Dui2Score < other.Dui2Score) {
            return  CompareResult.Better;
        }
        else if (this.Dui2Score > other.Dui2Score) {
            return  CompareResult.Worse;
        }
        if (this.DanScore < other.DanScore) {
            return  CompareResult.Better;
        }
        else if (this.DanScore > other.DanScore) {
            return  CompareResult.Worse;
        }
        return  CompareResult.Same;
    }

    /**
     * 两对的外部比较，所有牌是越大越好
     * @param other 另一个两对
     * @returns
     */
    CompareExternal(other) {
        if (this.Dui1Score > other.Dui1Score) {
            return  CompareResult.Better;
        }
        else if (this.Dui1Score < other.Dui1Score) {
            return  CompareResult.Worse;
        }
        if (this.Dui2Score > other.Dui2Score) {
            return  CompareResult.Better;
        }
        else if (this.Dui2Score < other.Dui2Score) {
            return  CompareResult.Worse;
        }

        if (this.DanScore > other.DanScore) {
            return  CompareResult.Better;
        }
        else if (this.DanScore < other.DanScore) {
            return  CompareResult.Worse;
        }
        return  CompareResult.Same;
    }
}
 //exports.LiangDui = LiangDui;
export class SanTiao {


    /**
    * 葫芦的外部比较,仅需要比较当SanTiaoScore
    * @param other 其它的葫芦
    * @returns 结果
    */
    reCompareExternal(other) {
        if (this.SanTiaoScore < other.SanTiaoScore) {
            return  CompareResult.Better;
        }
        else if (this.SanTiaoScore > other.SanTiaoScore) {
            return  CompareResult.Worse;
        }
        if (this.Dan2Score < other.Dan2Score) {
            return  CompareResult.Better;
        }
        else if (this.Dan2Score > other.Dan2Score) {
            return  CompareResult.Worse;
        }
        if (this.Dan1Score < other.Dan1Score) {
            return  CompareResult.Better;
        }
        else if (this.Dan1Score > other.Dan1Score) {
            return  CompareResult.Worse;
        }

        return  CompareResult.Same;
    }




    /**
    * 葫芦的外部比较,仅需要比较当SanTiaoScore
    * @param other 其它的葫芦
    * @returns 结果
    */
    CompareExternal(other) {
        if (this.SanTiaoScore > other.SanTiaoScore) {
            return  CompareResult.Better;
        }
        else if (this.SanTiaoScore < other.SanTiaoScore) {
            return  CompareResult.Worse;
        }
        if (this.Dan2Score > other.Dan2Score) {
            return  CompareResult.Better;
        }
        else if (this.Dan2Score < other.Dan2Score) {
            return  CompareResult.Worse;
        }
        if (this.Dan1Score > other.Dan1Score) {
            return  CompareResult.Better;
        }
        else if (this.Dan1Score < other.Dan1Score) {
            return  CompareResult.Worse;
        }

        return  CompareResult.Same;
    }
}
 //exports.SanTiao = SanTiao;
export class TieZhi {

    /**
     * 铁支的外部比较,外部比较不用比较单牌，因为别人不可能相同的铁支
     * @param other
     * @returns
     */
    reCompareExternal(other) {
        if (this.TieZhiScore < other.TieZhiScore) {
            return  CompareResult.Better;
        }
        if (this.TieZhiScore > other.TieZhiScore) {
            return  CompareResult.Worse;
        }
        if(this.DanScore < other.DanScore){
            return  CompareResult.Better;}
        if(this.DanScore > other.DanScore){
            return  CompareResult.Worse;
        }
        return  CompareResult.Same;
    }


    /**
     * 铁支的外部比较,外部比较不用比较单牌，因为别人不可能相同的铁支
     * @param other
     * @returns
     */
    CompareExternal(other) {
        if (this.TieZhiScore > other.TieZhiScore) {
            return  CompareResult.Better;
        }
        if (this.TieZhiScore < other.TieZhiScore) {
            return  CompareResult.Worse;
        }
        if(this.DanScore > other.DanScore){
            return  CompareResult.Better;}
        if(this.DanScore < other.DanScore){
            return  CompareResult.Worse;
        }
        return  CompareResult.Same;
    }
}
 //exports.TieZhi = TieZhi;
export class HuLu {
    /**
     *  葫芦也的外部比较，因为两个不同牌型，三条肯定不一样
     * @param other
     * @returns
     */
    reCompareExternal(other) {
        
        if (this.HuLuScore > other.HuLuScore) {
            return  CompareResult.Better;
        }else if (this.HuLuScore < other.HuLuScore) {
            return  CompareResult.Worse;
        }else if(this.DuiScore < other.DuiScore){
            return  CompareResult.Better;
        }else if(this.DuiScore > other.DuiScore){
             return  CompareResult.Worse;
        }
        return  CompareResult.Same;
    }


    /**
     *  葫芦也的外部比较，因为两个不同牌型，三条肯定不一样
     * @param other
     * @returns
     */
    CompareExternal(other) {
        
        if (this.HuLuScore > other.HuLuScore) {
            return  CompareResult.Better;
        }else if (this.HuLuScore < other.HuLuScore) {
            return  CompareResult.Worse;
        }else if(this.DuiScore > other.DuiScore){
            return  CompareResult.Better;
        }else if(this.DuiScore < other.DuiScore){
             return  CompareResult.Worse;
        }
        return  CompareResult.Same;
    }
}