import Poker from './poker.js';
import Util,{NormalType, SpecialType, PokerPoint, PokerHua, CompareResult} from './util.js';
import { Tree, TreeNode,Dui, LiangDui, SanTiao, TieZhi, HuLu} from './pokertype.js'




class CalSpecial {
    /**
     * 将树拆出各种节点出来
     * @param tree
     */
    static CalSpecialResult(tree) {
        if (this.IsZhiZunQingLong(tree)) {
            return { IsSpecial: true, SpecialType:  SpecialType.ZhiZunQingLong };
        }
        if (this.IsYiTiaoLong(tree)) {
            return { IsSpecial: true, SpecialType:  SpecialType.YiTiaoLong };
        }
        // if (this.IsShiErHuangZu(tree)) {
        //     return { IsSpecial: true, SpecialType:  SpecialType.ShiErHuangZu };
        // }
        if (this.IsSanTongHuaShun(tree)) {
            return { IsSpecial: true, SpecialType:  SpecialType.SanTongHuaShun };
        }
        // if (this.IsSanFenTianXia(tree)) {
        //     return { IsSpecial: true, SpecialType:  SpecialType.SanFenTianXia };
        // }
        // if (this.IsQuanDa(tree)) {
        //     return { IsSpecial: true, SpecialType:  SpecialType.QuanDa };
        // }
        if (this.IsQuanXiao(tree)) {
            return { IsSpecial: true, SpecialType:  SpecialType.QuanXiao };
        }
        // if (this.IsCouYiSe(tree)) {
        //     return { IsSpecial: true, SpecialType:  SpecialType.ChouYiSe };
        // }
        // if (this.IsSiTaoSanTiao(tree)) {
        //     return { IsSpecial: true, SpecialType:  SpecialType.SiTaoSanTiao };
        // }
        // if (this.IsWuDuiSanTiao(tree)) {
        //     return { IsSpecial: true, SpecialType:  SpecialType.WuDuiSanTiao };
        // }
        if (this.IsLiuDuiBan(tree)) {
            return { IsSpecial: true, SpecialType:  SpecialType.LiuDuiBan };
        }
        if (this.IsSanTongHua(tree)) {
            return { IsSpecial: true, SpecialType:  SpecialType.SanTongHua };
        }
        if (this.IsSanSunZi(tree)) {
            return { IsSpecial: true, SpecialType:  SpecialType.SanSunZi };
        }
        return { IsSpecial: false, SpecialType:  SpecialType.None };
    }
    /**
     * 判断一个树是不是“至尊青龙”
     * @param tree
     */
    static IsZhiZunQingLong(tree) {
        return tree.mapScoreListPoker.size == 13 && tree.mapHuaListPoker.size == 1;
    }
    /**
     * 是否是"一条龙"
     * @param tree
     * @returns
     */
    static IsYiTiaoLong(tree) {
        return tree.mapScoreListPoker.size == 13 && tree.mapHuaListPoker.size > 1;
    }
    /**
     * 是否是"十二皇族",13张牌中12张牌分值大于等于10
     * @param tree
     * @returns
     */
    static IsShiErHuangZu(tree) {
        //分少于10的牌的数量
        var lessScoreTCount = 0;
        for (const poker of tree.pokers) {
            if (poker.Score < 10) {
                lessScoreTCount++;
                if (lessScoreTCount >= 2) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * 是否是"三同花顺"
     * @returns
     */
    static IsSanTongHuaShun(tree) {
        //三同花顺，只可能是3个同样的花，也可能是2个花色，但每个花下都是连续的，一定不是一个花色，因为一个花色就是"至尊青龙"
        if (tree.mapHuaListPoker.size == 1 || tree.mapHuaListPoker.size == 4) {
            return false;
        }
        var isSanTongHuaShun = true;
        //同一个花下的所有牌，点数是连续的
        tree.mapHuaListPoker.forEach((pokers, _) => {
            if (pokers.length == 3 || pokers.length == 5 || pokers.length == 8 || pokers.length == 10) {
                 Util.SortPoker(pokers);
                var last = null;
                for (const poker of pokers) {
                    if (last == null) {
                        last = poker;
                    }
                    else {
                        if (poker.Score == last.Score + 1) {
                            last = poker;
                        }
                        else {
                            isSanTongHuaShun = false;
                        }
                    }
                }
            }
            else {
                isSanTongHuaShun = false;
            }
        });
        return isSanTongHuaShun;
    }
    /**
    * 是否是"三分天下"
    * @returns
    */
    static IsSanFenTianXia(tree) {
        //有3个铁支就是三分天下
        if (tree.listTieZhi.length != 3) {
            return false;
        }
        return true;
    }
    /**
    * 是否是"全大"
    * @returns
    */
    static IsQuanDa(tree) {
        var isQuanDa = true;
        tree.mapScoreListPoker.forEach((_, socre) => {
            if (socre < 8) {
                isQuanDa = false;
            }
        });
        return isQuanDa;
    }
    /**
    * 是否是"全小"
    * @returns
    */
    static IsQuanXiao(tree) {
        var isQuanXiao = true;
        tree.mapScoreListPoker.forEach((_, socre) => {
            // console.log(tree.mapScoreListPoker)
            if (socre > 8) {
                isQuanXiao = false;
            }
        });
        return isQuanXiao;
    }
    /**
    * 是否是"凑一色":即只有一个花色，且花色必需是全红或全黑
    * @returns
    */
    static IsCouYiSe(tree) {
        if (tree.mapHuaListPoker.size != 2) {
            return false;
        }
        var isCouYiSe = true;
        var lastHua =  PokerHua.HuaNone;
        tree.mapHuaListPoker.forEach((_, hua) => {
            if (lastHua ==  PokerHua.HuaNone) {
                lastHua = hua;
            }
            else if (hua - lastHua != 0 && hua - lastHua != 2 && hua - lastHua != -2) {
                isCouYiSe = false;
            }
        });
        return isCouYiSe;
    }
    /**
    * 是否是“四套三条”,即AAA,BBB,CCC,DDD,E
    * @returns
    */
    static IsSiTaoSanTiao(tree) {
        if (tree.listSanTiao.length == 4) {
            return true;
        }
        return false;
    }
    /**
    * 是否是“五对三条”,即AA、BB、CC、DD、EE、FFF
    * @returns 是或否
    */
    static IsWuDuiSanTiao(tree) {
        if (tree.listDui.length == 5 && tree.listSanTiao.length == 1) {
            return true;
        }
        return false;
    }
    /**
    * 是否是“六对半”,即AA、BB、CC、DD、EE、FF、G
    * @returns 是或否
    */
    static IsLiuDuiBan(tree) {
        if (tree.listDui.length == 6) {
            return true;
        }
        return false;
    }
    /**
    * 是否是“三同花“
    * @returns 是或否
    */
    static IsSanTongHua(tree) {
        //只可能是2种或3种花色，一种花色是同花顺
        if (tree.mapHuaListPoker.size == 4 || tree.mapHuaListPoker.size == 1) {
            return false;
        }
        //如果是2种花色，其中一花为8张或10，另一个花为5张或3张；如果是3种花色，同一个花下只能是3张或5张
        var isSanTongHua = true;
        tree.mapHuaListPoker.forEach((pokers, _) => {
            var count = pokers.length;
            if (count != 3 && count != 5 && count != 8 && count != 10) {
                isSanTongHua = false;
            }
        });
        return isSanTongHua;
    }
    /**
    * 是否是“三顺子“
    * @returns 是或否
    */
    static IsSanSunZi(tree) {
         CalNormal.SplitShunZi(tree);
        for (const node1 of tree.Nodes) {
            if (node1.normalType ==  NormalType.SHUN_ZI) {
                let middle = new  Tree(node1.rest);
                 CalNormal.SplitShunZi(middle);
                for (const node2 of middle.Nodes) {
                    if (node2.normalType ==  NormalType.SHUN_ZI) {
                        let right = node2.rest;
                         Util.SortPoker(right);
                        //case 分值连续
                        if (right[0].Score + 1 == right[1].Score && right[1].Score + 1 == right[2].Score) {
                            return true;
                        }
                        //case A,2,3 
                        else if (right[0].Point ==  PokerPoint.Poker2 && right[1].Point ==  PokerPoint.Poker3 && right[2].Point ==  PokerPoint.PokerA) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
}
class ResultNormal {
    ToString() {
        var leftPokerDesc = "";
        for (const poker of this.Head.pokers) {
            leftPokerDesc += poker.Desc;
        }
        var middlePokerDesc = "";
        for (const poker of this.Middle.pokers) {
            middlePokerDesc += poker.Desc;
        }
        var rightPokerDesc = "";
        for (const poker of this.Tail.pokers) {
            rightPokerDesc += poker.Desc;
        }
        // ////debugger
        return "\u7ED3\u679C\uFF1A{\u4E0A:\u3010".concat(Util.NormalTypeToString(this.Tail.normalType), "\u3011= {").concat(rightPokerDesc, "},\u4E2D:\u3010").concat(Util.NormalTypeToString(this.Middle.normalType), "\u3011= {").concat(middlePokerDesc, "},\u4E0B:\u3010").concat(Util.NormalTypeToString(this.Head.normalType), "\u3011= {").concat(leftPokerDesc, "},\u597D\u724C\u503C=\u3010").concat(this.BestScore, "\u3011}");
        
        //return `结果：{上:【${ Util.NormalTypeToString(this.Tail.normalType)}】= {${rightPokerDesc}},中:【${ Util.NormalTypeToString(this.Middle.normalType)}】= {${middlePokerDesc}},下:【${ Util.NormalTypeToString(this.Head.normalType)}】= {${leftPokerDesc, "},\u597D\u724C\u503C=\u3010").concat(this.BestScore, "\u3011}");
    }
}
class CalNormal {
    /**
     * 列出所有的普通牌型
     * @param fatherTree
     * @returns
     */

    
    static CalNormalResult(fatherTree) {
        var resultList = new Array();
        this.Split(fatherTree);
        for (const node1 of fatherTree.Nodes) {
            // console.log("下墩节点 = " + node1.ToString())
            var sonTree = new  Tree(node1.rest);
            this.Split(sonTree);
            for (const node2 of sonTree.Nodes) {
                // console.log("中墩节点 = " + node2.ToString())
                if (node1.CompareExternal(node2) !=  CompareResult.Worse) {
                    var node3 =  Api.PokerListToTreeNode(node2.rest);
                    if (node2.CompareExternal(node3) !=  CompareResult.Worse) {
                        // console.log("上墩节点 = " + node3.ToString())
                        var bestScore = 0;
                        switch (node1.normalType) {
                            case  NormalType.TONG_HUA_SHUN:
                                bestScore += 190000000;
                                //bestScore += 10
                                break;
                            case  NormalType.TIE_ZHI:
                                bestScore += 180000000;
                                //bestScore += 8;
                                break;
                            case  NormalType.HU_LU:
                                bestScore += 170000000;
                                break;
                            case  NormalType.TONG_HUA:
                                bestScore += 160000000;
                                break;

                            
                            case  NormalType.SHUN_ZI: //同花以下 优先 中墩
                                bestScore += 5;
                                break;    
                            case  NormalType.SAN_TIAO:
                                bestScore += 4;
                                break;
                            case  NormalType.LIANG_DUI:
                                bestScore += 3;
                                break;
                            case  NormalType.DUI_ZI:
                                bestScore += 2 ;
                                break;    
                            default:
                                bestScore += 1;
                                break;
                        }
                        switch (node2.normalType) {
                            case  NormalType.TONG_HUA_SHUN:
                                bestScore += 1500000;
                                //bestScore += 10
                                break;
                            case  NormalType.TIE_ZHI:
                                bestScore += 1400000;
                                //bestScore += 8;
                                break;
                            case  NormalType.HU_LU:
                                bestScore += 1300000;
                                break;
                            case  NormalType.TONG_HUA:
                                bestScore += 1200000;
                                break;
                            case  NormalType.SHUN_ZI:
                                bestScore += 1100000;
                                break;    
                            
                            case  NormalType.SAN_TIAO:
                                bestScore += 800;
                                break;
                            case  NormalType.LIANG_DUI:
                                bestScore += 700;
                                break;
                            case  NormalType.DUI_ZI:
                                bestScore += 600;
                                break;    
                            default:
                                bestScore += 1;
                                break;
                        }
                        switch (node3.normalType) {
                            case  NormalType.SAN_TIAO:
                                bestScore +=  100000;
                                //bestScore += 3
                                break;
                            case  NormalType.DUI_ZI:
                                bestScore += 90000;
                                break;
                            default:
                                bestScore += 1;
                                //bestScore += 1;
                                break;
                        }
                        var result = new ResultNormal();
                        result.BestScore = bestScore;
                        result.Head = node1; //最后一敦
                        result.Middle = node2;
                        result.Tail = node3;
                        resultList.push(result);
                    }
                }
            }
        }
        return resultList;
    }
    static SortFilterResult(resultList) {
        resultList.sort((a, b) => {
            if (a.BestScore != b.BestScore) {
                return b.BestScore - a.BestScore;
            } 
            //分数一样 比较头部
            if (a.Head.reCompareExternal(b.Head) ==  CompareResult.Better) {
                return -1;
            }
            if(a.Head.reCompareExternal(b.Head) ==  CompareResult.Worse) {
                return 1;
            }

            if (a.Middle.reCompareExternal(b.Middle) ==  CompareResult.Better) {
                return -1;
            }
            if (a.Middle.reCompareExternal(b.Middle) ==  CompareResult.Worse) {
                return 1;
            }
            // if (a.Tail.reCompareExternal(b.Tail) ==  CompareResult.Better) {
            //     return -1;
            // }
            // if (a.Tail.reCompareExternal(b.Tail) ==  CompareResult.Worse) {
            //     return 1;
            // }
            return 0;
        });
        // var filterRes = new Array();
        // var last = null;
        // for (const result of resultList) {
        //     // if (last == null) {
        //     //     last = result;
        //     //     filterRes.push(last);
        //     // }
        //     // else if (result.Head.normalType != last.Head.normalType || result.Middle.normalType != last.Middle.normalType || result.Tail.normalType != last.Tail.normalType) {
        //     //     last = result;
        //     //     filterRes.push(result);
        //     // }
        //     filterRes.push(result);
        // }
        return resultList;
    }
    /**
     * 将树拆出各种节点出来
     * @param tree
     */
    static Split(tree) {
        this.SplitDui(tree);
        this.SplitTongHuaSun(tree);
        this.SplitTieZhi(tree);
        
        this.SplitHuLu(tree);
        this.SplitTongHua(tree);
        this.SplitShunZi(tree);
        this.SplitSanTiao(tree);
        this.SplitLiangDui(tree);
        
        this.SplitWuLong(tree);
    }
    /**
     * 将树中拆出一个同花顺节点出来
     * @param tree 要拆开的树
     */
    static SplitTongHuaSun(tree) {
        var count = tree.listShunZi.length;
        if (count <= 0) {
            return;
        }
        tree.listShunZi.forEach(shunZi => {
            var poker1s = tree.mapScoreListPoker.get(shunZi[0]);
            var poker2s = tree.mapScoreListPoker.get(shunZi[0] + 1);
            var poker3s = tree.mapScoreListPoker.get(shunZi[0] + 2);
            var poker4s = tree.mapScoreListPoker.get(shunZi[0] + 3);
            var poker5s = tree.mapScoreListPoker.get(shunZi[1]);
            for (let i1 = 0; i1 < poker1s.length; i1++) {
                var hua = poker1s[i1].Hua;
                for (let i2 = 0; i2 < poker2s.length; i2++) {
                    if (poker2s[i2].Hua == hua) {
                        for (let i3 = 0; i3 < poker3s.length; i3++) {
                            if (poker3s[i3].Hua == hua) {
                                for (let i4 = 0; i4 < poker4s.length; i4++) {
                                    if (poker4s[i4].Hua == hua) {
                                        for (let i5 = 0; i5 < poker5s.length; i5++) {
                                            if (poker5s[i5].Hua == hua) {
                                                var n = new  TreeNode();
                                                n.normalType =  NormalType.TONG_HUA_SHUN;
                                                for (const poker of tree.pokers) {
                                                    if (poker == poker1s[i1] || poker == poker2s[i2] || poker == poker3s[i3] || poker == poker4s[i4] || poker == poker5s[i5]) {
                                                        n.pokers.push(poker);
                                                    }
                                                    else {
                                                        n.rest.push(poker);
                                                    }
                                                }
                                                tree.Nodes.push(n);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    /**
     * 从树中拆出一个铁支节点出来
     * @param tree 要拆的树
     * @returns
     */
    static SplitTieZhi(tree) {
        var count = tree.listTieZhi.length;
        if (count <= 0) {
            return;
        }
        var maxTieZhiScore = tree.listTieZhi[count - 1];
        for (const poker1 of tree.pokers) {
            if (poker1.Score != maxTieZhiScore) {
                var n = new  TreeNode();
                n.normalType =  NormalType.TIE_ZHI;
                n.pokers.push(poker1);
                n.tieZhi = new  TieZhi();
                n.tieZhi.TieZhiScore = maxTieZhiScore;
                n.tieZhi.DanScore = poker1.Score;
                for (const poker2 of tree.pokers) {
                    if (poker2 != poker1) {
                        if (poker2.Score == maxTieZhiScore) {
                            n.pokers.push(poker2);
                        }
                        else {
                            n.rest.push(poker2);
                        }
                    }
                }
                tree.Nodes.push(n);
            }
        }


    }
    /**
     * 拆分出葫芦
     * @param tree 要拆的树
     * @returns
     */
    static SplitHuLu(tree) {
        var countSanTiao = tree.listSanTiao.length;
        if (countSanTiao <= 0) {
            return;
        }
        // var huLuScore = tree.listSanTiao[countSanTiao - 1]; //取最大的三条
        for (const huLuScore of tree.listSanTiao) {
            for (const duiScore of tree.listDui) {
                // for(let i=tree.listDui.length-1;i >= 0;i--){
                    var n = new  TreeNode();
                    n.normalType =  NormalType.HU_LU;
                    n.huLu = new  HuLu();
                    n.huLu.HuLuScore = huLuScore;
                    n.huLu.DuiScore = duiScore;
                    for (const poker of tree.pokers) {
                        if (poker.Score == huLuScore || poker.Score == duiScore) {
                            n.pokers.push(poker);
                        }
                        else {
                            n.rest.push(poker);
                        }
                    }
                    tree.Nodes.push(n);
            }

            for (const huLuScore2 of tree.listSanTiao) {
                // for(let i=tree.listDui.length-1;i >= 0;i--){
                    if(huLuScore2 != huLuScore){
                        var n = new  TreeNode();
                        n.normalType =  NormalType.HU_LU;
                        n.huLu = new  HuLu();
                        n.huLu.HuLuScore = huLuScore;
                        n.huLu.DuiScore = huLuScore2;
                        let tempCount = 0;//计数器
                        for (const poker of tree.pokers) {
                            if (poker.Score == huLuScore ) {
                                n.pokers.push(poker);
                            }else if(poker.Score == huLuScore2){
                                //debugger
                                if(++tempCount<3){
                                    n.pokers.push(poker);
                                }else{
                                    n.rest.push(poker);
                                }
                            }
                            else {
                                n.rest.push(poker);
                            }
                        }
                        tree.Nodes.push(n);
                    }
                    
            }

        }
        

        
    }
    /**
     * 将所有的同花组合拆出来
     * @param tree 要拆的树
     */
    static SplitTongHua(tree) {
        tree.mapHuaListPoker.forEach((pokers, _) => {
            var count = pokers.length;
            if (count >= 5) {
                for (let i1 = 0; i1 < count; i1++) {
                    for (let i2 = i1 + 1; i2 < count; i2++) {
                        for (let i3 = i2 + 1; i3 < count; i3++) {
                            for (let i4 = i3 + 1; i4 < count; i4++) {
                                for (let i5 = i4 + 1; i5 < count; i5++) {
                                    var n = new  TreeNode();
                                    n.normalType =  NormalType.TONG_HUA;
                                    for (const poker of tree.pokers) {
                                        if (poker == pokers[i1] || poker == pokers[i2] || poker == pokers[i3] || poker == pokers[i4] || poker == pokers[i5]) {
                                            n.pokers.push(poker);
                                        }
                                        else {
                                            n.rest.push(poker);
                                        }
                                    }
                                    tree.Nodes.push(n);
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    /**
     * 将所有的顺子拆出来
     * @param tree 要拆的树
     */
    static SplitShunZi(tree) {
        var count = tree.listShunZi.length;
        if (count <= 0) {
            return;
        }
        tree.listShunZi.forEach(shunZi => {
            var poker1s = tree.mapScoreListPoker.get(shunZi[0]);
            var poker2s = tree.mapScoreListPoker.get(shunZi[0] + 1);
            var poker3s = tree.mapScoreListPoker.get(shunZi[0] + 2);
            var poker4s = tree.mapScoreListPoker.get(shunZi[0] + 3);
            var poker5s = tree.mapScoreListPoker.get(shunZi[1]);
            for (let i1 = 0; i1 < poker1s.length; i1++) {
                for (let i2 = 0; i2 < poker2s.length; i2++) {
                    for (let i3 = 0; i3 < poker3s.length; i3++) {
                        for (let i4 = 0; i4 < poker4s.length; i4++) {
                            for (let i5 = 0; i5 < poker5s.length; i5++) {
                                var n = new  TreeNode();
                                n.normalType =  NormalType.SHUN_ZI;
                                for (const poker of tree.pokers) {
                                    if (poker == poker1s[i1] || poker == poker2s[i2] || poker == poker3s[i3] || poker == poker4s[i4] || poker == poker5s[i5]) {
                                        n.pokers.push(poker);
                                    }
                                    else {
                                        n.rest.push(poker);
                                    }
                                }
                                tree.Nodes.push(n);
                            }
                        }
                    }
                }
            }
        });
    }
    /**
    * 将所有的三条拆出来
    * @param tree 要拆的树
    */
    static SplitSanTiao(tree) {
        var sanTiaoCount = tree.listSanTiao.length;
        var danPaiCount = tree.listDanPai.length;
        if (sanTiaoCount <= 0 || danPaiCount < 2) {
            return;
        }

        for(let i = sanTiaoCount-1;i>=0;i--){
            var maxSanTiaoScore = tree.listSanTiao[i];
            for(let j=danPaiCount-1;j>=1;j--){
                for(let k=j-1;k>=0;k--){
                    if(k != j){
                        var smallDanPaiScore = tree.listDanPai[j]; // 最大单牌
                        var bigDanPaiScore = tree.listDanPai[k]; //

                        var n = new  TreeNode();
                        n.normalType =  NormalType.SAN_TIAO;
                        n.sanTiao = new  SanTiao();
                        n.sanTiao.SanTiaoScore = maxSanTiaoScore;
                        n.sanTiao.Dan1Score = bigDanPaiScore;
                        n.sanTiao.Dan2Score = smallDanPaiScore;
                        for (const poker of tree.pokers) {
                            if (poker.Score == smallDanPaiScore || poker.Score == bigDanPaiScore || poker.Score == maxSanTiaoScore) {
                                n.pokers.push(poker);
                            }
                            else {
                                n.rest.push(poker);
                            }
                        }
                        tree.Nodes.push(n);
                    }
                }
            }


        }
        //var maxSanTiaoScore = tree.listSanTiao[sanTiaoCount - 1]; //最大的三条分数
        // var smallDanPaiScore = tree.listDanPai[0]; //最小的单牌
        // var bigDanPaiScore = tree.listDanPai[1]; //第二小的单牌

        
        
    }
    /**
     * 拆分出两对出来
     * @param tree
     * @returns
     */
    static SplitLiangDui(tree) {
        var danPaiCount = tree.listDanPai.length;
        var duiCount = tree.listDui.length;
        if (duiCount < 2) {
            return;
        }
        var danPaiScore = 0;
        var dui1Score = 0;
        var dui2Score = 0;

        if (danPaiCount == 0) {
            return;
        }
        //组成对子
        for(let j=duiCount-1;j>=1;j--){
            for(let k=j-1;k>=0;k--){
                if(k != j){
                    dui1Score = tree.listDui[j];
                    dui2Score = tree.listDui[k];
                    tree.listDanPai.forEach(e => {
                        // ////debugger
                        danPaiScore = e;

                        var n = new  TreeNode();
                        n.normalType =  NormalType.LIANG_DUI;
                        n.liangDui = new  LiangDui();
                        n.liangDui.Dui1Score = dui1Score;
                        n.liangDui.Dui2Score = dui2Score;
                        n.liangDui.DanScore = danPaiScore;
                        //单牌是拆出来的话，要防止单牌重复加入
                        var isAddDanPai = false;
                        for (const poker of tree.pokers) {
                            if (poker.Score == dui1Score || poker.Score == dui2Score) {
                                n.pokers.push(poker);
                            }
                            else if (poker.Score == danPaiScore && isAddDanPai == false) {
                                n.pokers.push(poker);
                                isAddDanPai = true;
                            }
                            else {
                                n.rest.push(poker);
                            }
                        }
                        tree.Nodes.push(n);

                    })
                }
            }
        }
        
    }
    /**
     * 从树中拆出一对来
     * @param tree
     */
    static SplitDui(tree) {
        var duiCount = tree.listDui.length;
        var danPaiCount = tree.listDanPai.length;
        if ((duiCount == 1 && danPaiCount >= 3) || (duiCount == 2 && danPaiCount >= 3) || (duiCount == 3 && danPaiCount >= 3)) {
            // var duiScore = 0;
            // if (duiCount == 1) {
            //     duiScore = tree.listDui[0];
            // }
            // else if (duiCount == 2) { //有两对时，取大的对
            //     duiScore = tree.listDui[1];
            // }
            // else if (duiCount == 3) {
            //     duiScore = tree.listDui[2];
            // }
            // //取大的单牌
            // var dan1Score = tree.listDanPai[0];
            // var dan2Score = tree.listDanPai[1];
            // var dan3Score = tree.listDanPai[2];
            for(let i=0;i< duiCount;i++){
                var duiScore = 0;
                duiScore = tree.listDui[i];
                var dan1Score = tree.listDanPai[0];
                var dan2Score = tree.listDanPai[1];
                var dan3Score = tree.listDanPai[2];
                var n = new  TreeNode();

                n.normalType =  NormalType.DUI_ZI;
                n.dui = new  Dui();
                n.dui.DuiScore = duiScore;
                n.dui.Dan1Score = dan1Score;
                n.dui.Dan2Score = dan2Score;
                n.dui.Dan3Score = dan3Score;
                for (const poker of tree.pokers) {
                    if (poker.Score == duiScore || poker.Score == dan1Score || poker.Score == dan2Score || poker.Score == dan3Score) {
                        n.pokers.push(poker);
                    }
                    else {
                        n.rest.push(poker);
                    }
                }
                tree.Nodes.push(n);

            }
            
            
        }
    }
    /**
    * 从树中拆出一对来
    * @param tree
    */
    static SplitWuLong(tree) {
        var duiCount = tree.listDui.length;
        var danPaiCount = tree.listDanPai.length;
        if (duiCount > 0 || danPaiCount < 5) {
            return;
        }
        //modify 循环生成乌龙
        for(let i1 = danPaiCount-1;i1 >= 4;i1--){
            for(let i2 = i1-1;i2 >= 3;i2--){
                for(let i3 = i2-1;i3 >= 2;i3--){
                    for(let i4 = i3-1;i4 >= 1;i4--){
                        for(let i5 = i4-1;i5 >= 0;i5--){
                            var dan1Score = tree.listDanPai[i1]; //最大的单牌
                            var dan2Score = tree.listDanPai[i2]; //第1小的单牌
                            var dan3Score = tree.listDanPai[i3]; //第2小的单牌
                            var dan4Score = tree.listDanPai[i4]; //第3小的单牌
                            var dan5Score = tree.listDanPai[i5]; //第4小的单牌
                            var n = new  TreeNode();
                            n.normalType =  NormalType.WU_LONG;
                            for (const poker of tree.pokers) {
                                if (poker.Score == dan1Score || poker.Score == dan2Score || poker.Score == dan3Score || poker.Score == dan4Score || poker.Score == dan5Score) {
                                    n.pokers.push(poker);
                                }
                                else {
                                    n.rest.push(poker);
                                }
                            }
                            tree.Nodes.push(n);
                        }
                    }
                }
            }
        }

        // var dan1Score = tree.listDanPai[danPaiCount - 1]; //最大的单牌
        // var dan2Score = tree.listDanPai[danPaiCount - 2]; //第1小的单牌
        // var dan3Score = tree.listDanPai[danPaiCount - 3]; //第2小的单牌
        // var dan4Score = tree.listDanPai[danPaiCount - 4]; //第3小的单牌
        // var dan5Score = tree.listDanPai[danPaiCount - 5]; //第4小的单牌
        // var n = new  TreeNode();
        // n.normalType =  NormalType.WU_LONG;
        // for (const poker of tree.pokers) {
        //     if (poker.Score == dan1Score || poker.Score == dan2Score || poker.Score == dan3Score || poker.Score == dan4Score || poker.Score == dan5Score) {
        //         n.pokers.push(poker);
        //     }
        //     else {
        //         n.rest.push(poker);
        //     }
        // }
        // tree.Nodes.push(n);
    }
}
class Api {
    /**
     * 计算该树是否特殊牌型
     * @param tree 牌的结构树
     * @returns
     */
    static CalSpecial(tree) {
        return  CalSpecial.CalSpecialResult(tree);
    }
    /**
     * 计算该树的普通牌型
     * @param tree 牌的结构树
     * @returns
     */
    static CalNormal(tree) {
        var resultList =  CalNormal.CalNormalResult(tree);
        // ////debugger
        var filterResultList =  CalNormal.SortFilterResult(resultList);
        return filterResultList;
    }
    /**
     * 将牌型转换成树节点（墩）
     * @param pokers 扑克牌
     * @returns
     */
    static PokerListToTreeNode(pokers) {
        var length = pokers.length;
        switch (length) {
            case 5:
                var tree = new  Tree(pokers);
                 CalNormal.Split(tree);
                return tree.Nodes[0];
            case 3:
                var n = new  TreeNode();
                n.pokers = pokers;
                if (pokers[0].Score == pokers[1].Score && pokers[1].Score == pokers[2].Score) {
                    n.normalType =  NormalType.SAN_TIAO;
                    n.sanTiao = new  SanTiao();
                    n.sanTiao.SanTiaoScore = pokers[0].Score;
                }
                else if (pokers[0].Score == pokers[1].Score) {
                    n.normalType =  NormalType.DUI_ZI;
                    n.dui = new  Dui();
                    n.dui.DuiScore = pokers[1].Score;
                    n.dui.Dan3Score = pokers[2].Score;
                }
                else if (pokers[0].Score == pokers[2].Score) {
                    n.normalType =  NormalType.DUI_ZI;
                    n.dui = new  Dui();
                    n.dui.DuiScore = pokers[0].Score;
                    n.dui.Dan3Score = pokers[1].Score;
                }
                else if (pokers[1].Score == pokers[2].Score) {
                    n.normalType =  NormalType.DUI_ZI;
                    n.dui = new  Dui();
                    n.dui.DuiScore = pokers[1].Score;
                    n.dui.Dan3Score = pokers[0].Score;
                }
                else {
                    n.normalType =  NormalType.WU_LONG;
                }
                return n;
            default:
                return null;
        }
    }
    /**
     * 将ASCII型的扑克id转成扑克数据结构
     * @param nums
     * @returns
     */
    static PokersFromAscii(nums) {
        var target = new Array();
        for (const num of nums) {
            var hua = (num >> 4) + 1;
            var point = num & 0x0F;
            var poker = new  Poker(point, hua);
            target.push(poker);
        }
        return target;
    }
}
export default class Thirteen {
	// 
    str = '';
    start(pokers,zhuangNum,playerNum){ //牌堆，庄家编号,玩家数
        pokers = this.transform(pokers);
        let players = []; //玩家数组
        
        for(let i=0;i<playerNum;i++){
            players.push({
                id : i+1, //玩家编号
                cards : [],
                isZhuang : i+1 == zhuangNum?true:false, //是否为庄家
                paixing:[],
                score: 0, //得分
                special:false, //特殊牌
                specialPai: '', //特殊牌型
                beiNum:0, //倍数
                HeadbeiNum:0, //
                MiddlebeiNum:0,
                TailbeiNum:0,
                paiStr:''
            });
        }

        let faCardCountArr = []; //每轮发牌
        //获取发牌方式
        // if(JSON.stringify(paramsObj.faCardCount) != "{}"&&JSON.stringify(paramsObj.faCardCount) != "null"){
        //     paramsObj.faCardCount.fapailunci.forEach((e,i) => {
        //         faCardCountArr.push(Number(e.split('-')[0]));
        //     })
        // }else{
        //     faCardCountArr = [1,1,1,1,1,1,1,1,1,1,1,1,1];
        // }
        faCardCountArr = [1,1,1,1,1,1,1,1,1,1,1,1,1];//每轮一张牌
        faCardCountArr.forEach((fapaNum,i) => {
            for(let j=0;j<playerNum;j++){
                players[j%playerNum].cards.push(...pokers.splice(0,fapaNum))
            }
        })
        players.forEach(p => {
            this.str+=this.generateScore(p)+'\n' //计算牌型

        })
        let winner = this.getWinner(players) //获取冠军
        let winPai = winner.id +'--'+ winner.paiStr;
        if(winPai.special){
            winPai = winPai+ '-----'+ winner.specialPai
        }
        winPai = '冠军是玩家'+ winPai+ '赢取倍数'+winner.beiNum;
        let a = document.createElement('div');
        a.appendChild(document.createTextNode(winPai))
        document.getElementById('res').appendChild(a);
        let result = []

        players.forEach((e,i) => {
            let winPai = '玩家'+e.id +'--'+ e.paiStr;
            if(winPai.special){
                winPai = winPai+ '-----'+ e.specialPai
            }
            winPai = winPai+ '赢取倍数'+e.beiNum
            let a = document.createElement('div');
            a.appendChild(document.createTextNode(winPai))
            document.getElementById('res').appendChild(a);

            console.log(winPai)
            let TailPokerDesc = [];
            let MiddlePokerDesc = [];
            let HeadPokerDesc = [];
            e.cards = this.retransform( e.cards);
            if(!e.special){
                for (const poker of e.paixing.Tail.pokers) {
                    TailPokerDesc.push(poker.Desc);
                }
                for (const poker of e.paixing.Middle.pokers) {
                    MiddlePokerDesc.push(poker.Desc);
                }
                for (const poker of e.paixing.Head.pokers) {
                    HeadPokerDesc.push(poker.Desc);
                }
                TailPokerDesc = this.retransform(TailPokerDesc);
                MiddlePokerDesc = this.retransform(MiddlePokerDesc);
                HeadPokerDesc = this.retransform(HeadPokerDesc);
            }else{
                e.specialPai = e.cards.toString()+"-"+e.specialPai;
            }
            

            result.push({
                id:e.id,
                special: e.special, //是否为特殊牌型
                specialPai: e.specialPai,
                beiNum:e.beiNum, //赢得倍数 头 中 尾墩
                cards: e.cards,
                toudun: {
                    type: e.special?'':e.paixing.Tail.normalType,
                    pai: e.special?'':TailPokerDesc,
                    beiNum:e.TailbeiNum
                },
                middle:{
                    type: e.special?'':e.paixing.Middle.normalType,
                    pai: MiddlePokerDesc,
                    beiNum:e.MiddlebeiNum
                },
                tail:{
                    type: e.special?'':e.paixing.Head.normalType,
                    pai: HeadPokerDesc,
                    beiNum:e.HeadbeiNum
                }
            })
        })
        return {
            result:result,
            winner:winner.id,
            extParam:{

            }
        }
    }
    generateScore(play){//计算玩家得分
        var pokers = this.DecodePokers(play.cards);
        var tree = new Tree(pokers);
        var specialResult = Api.CalSpecial(tree);
        
        if (specialResult.IsSpecial) {
            
            var paiXinag = Util.SpecialTypeToString(specialResult.SpecialType);

            play.special = true;
            // ////debugger
            play.paiStr = play.cards.toString();
            switch (specialResult.SpecialType) {
                case SpecialType.ZhiZunQingLong:
                    play.score = 1000000;
                    play.specialPai = "一条龙";
                    play.beiNum = 7;
                    break;
                case SpecialType.YiTiaoLong:
                    play.score = 1000000;
                    play.specialPai = "一条龙"
                    play.beiNum = 7;
                    break;
                case SpecialType.QuanXiao:
                    play.score = 100000;  
                    play.specialPai = "全小2到10"
                    play.beiNum = 4;
                    break;

                case SpecialType.LiuDuiBan:
                    play.score = 100000
                    play.specialPai = '六对半'; 
                    play.beiNum = 4;
                    break;

                case SpecialType.SanSunZi:
                    play.specialPai = "三顺子";
                    play.score = 100000
                    play.beiNum = 4;
                    break;

                case SpecialType.SanTongHua:
                    play.specialPai = "三同花"; 
                    play.score = 100000
                    play.beiNum = 4;
                    break;

                default:
            }
            let temp = play.isZhuang?'-庄家':''
            temp ="玩家"+play.id+temp+"--\u724C\u578B[".concat(0, "]=> ").concat(play.paiStr = play.cards.toString()+'----------'+ paiXinag)
            console.log(temp);
            return temp;
        }
        else{
            var resultList = Api.CalNormal(tree);
            // console.log(resultList[0])
            play.score = resultList[0].BestScore;
            play.paixing = resultList[0];
            var result = resultList[0];
            var resultStr = result.ToString();
            play.paiStr = resultStr;
            let temp = play.isZhuang?'-庄家':''
            // temp ="玩家"+play.id+temp+"--\u724C\u578B[".concat(0, "]=> ").concat(resultStr)
            temp ="玩家"+play.id+temp;
            console.log(temp);
            for (var index = 0; index < resultList.length; index++) {
                var result = resultList[index];
                // console.log(result)
                var resultStr = result.ToString();
                console.log("\u724C\u578B[".concat(index, "]=> ").concat(resultStr));
            }
            return temp;
        }
    }

    transform(pokers){

        pokers = pokers.map(e => {
            let ar = e.split('-')
            if(ar[0] == "梅花"){
                ar[0] = '♣'
            }else if(ar[0] == '红桃'){
                ar[0] = '♥'
            }else if(ar[0] == '黑桃'){
                ar[0] = '♠'
            }else if(ar[0] == '方片'){
                ar[0] = '♦'
            }
            if(Number(ar[1]) == 10){
                e =ar[0]+ 'T'
            }else{
                e = ar[0]+ar[1];
            }
            return e;
        })
        return pokers;

    }

    retransform(pokers){

        pokers = pokers.map(e => {
            let ar = e.split('')
            if(ar[0] == "♣"){
                ar[0]= '梅花-'
            }else if(ar[0] == '♥'){
                ar[0] = '红桃-'
            }else if(ar[0] == '♠'){
                ar[0] = '黑桃-'
            }else if(ar[0] == '♦'){
                ar[0] = '方块-'
            }
            if(ar[1] == 'T'){
                e = ar[0] + '10'
            }else{
                e = ar[0]+ar[1];
            }
            return e;
        })
        return pokers;

    }

    DecodePokers (testPokerStr) {
        var testPokers = new Array();
        // /
        var pokerStrList = testPokerStr
        for (var _i = 0, pokerStrList_1 = pokerStrList; _i < pokerStrList_1.length; _i++) {
            var pokerStr = pokerStrList_1[_i];
            var huaDesc = pokerStr[0];
            var hua = Util.StringToPokerHua(huaDesc);
            var pointDesc = pokerStr[1];
            var point = Util.StringToPokerPoint(pointDesc);
            var poker = new Poker(point, hua);
            testPokers.push(poker);
        }
        return testPokers;
    };

    getWinner(players){ //计算获胜者
        let zhuangIndex = 0; //庄家ID
        let special = false;
        let winner = 0;
        let maxCount = new Map();

        let maxscore = 0; //特殊牌型的最高分数
        players.forEach((e,i) => {
            //找出庄家
            if(e.isZhuang){
                zhuangIndex = i;
            }
            if(e.special == true){
                maxscore = maxscore < e.score?e.score:maxscore; //找出最大分数值的人
                special = true;
                maxCount.set(i,e.score)
            }
        })
        if(special){
            let maxPlayerTemp = [];
            if(maxCount.size > 0){
                for (let key of maxCount.keys()) {
                    if(maxCount.get(key) == maxscore){
                        maxPlayerTemp.push(Number(key));
                    }
                }
            }
            if(maxPlayerTemp.length == 1){ //只有一个特殊牌型
                return players[maxPlayerTemp[0]];
            }
            if(maxPlayerTemp.indexOf(zhuangIndex) != -1){ //有多个有特殊牌型 有庄家在里面
                return players[zhuangIndex];
            }else{ 
                maxPlayerTemp.sort((a,b) => {
                    return a-b;
                })
                return players[maxPlayerTemp[0]]; //返回编号在前的玩家
            }
        }
        let maxType = 0;
        maxCount = new Map();
        players.forEach((e,i) => { //无特殊牌型，先比底墩
            
            //找出最大牌型
            maxType = e.paixing.Head.normalType>maxType?e.paixing.Head.normalType:maxType;
        })
        //最大牌型的人数
        /**
         * {
         *   索引index : 分数
         * }
         */
        players.forEach((e,i) => {
            if(e.paixing.Head.normalType == maxType){
                maxCount.set(i,0);
            } 
        })
        if(maxCount.size > 1){//比底牌
            let maxScore = 0;
            for (let key of maxCount.keys()) {
                let scores = this.getScore(players[key].paixing.Head.pokers,maxType);
                if(maxScore < scores){ //获取最大分数
                    maxScore = scores;
                }
                maxCount.set(key,scores) ;
            }
            let maxPlayerTemp = []; 
            maxCount.forEach(function(value, key) {
                if(maxScore == value){
                    maxPlayerTemp.push(Number(key));
                }
            })

            if(maxPlayerTemp.length == 1){ //只有一个最大牌
                winner = maxPlayerTemp[0];
            }else{
                if(maxPlayerTemp.indexOf(zhuangIndex) != -1){ //分数一样庄家大
                    winner = zhuangIndex;
                }else{ 
                    maxPlayerTemp.sort((a,b) => {
                        return a-b;
                    })
                    winner = maxPlayerTemp[0]; //返回编号在前的玩家
        
                }
            }
            


        }else{
            for (let key of maxCount.keys()) {
                winner = Number(key);
            }
        }
        let beiNum = 0;
        switch(maxType) {
            case NormalType.TONG_HUA_SHUN: //同花顺
                beiNum = 5;
                break;
            case NormalType.TIE_ZHI: //炸弹
                beiNum = 4;
                break;
            case NormalType.HU_LU:
                beiNum = 1;
                break;
            default:
                beiNum = 1;
        }
        ////debugger
        players[winner].HeadbeiNum = beiNum;
        
        //------------------------------------------中墩------------------

        maxType = 0;
        winner = 0;
        //最大牌型的人数
        maxCount = new Map();
        players.forEach((e,i) => { //无特殊牌型，先比中顿
            //找出最大牌型
            maxType = e.paixing.Middle.normalType>maxType?e.paixing.Middle.normalType:maxType;
        })
        
        /**
         * {
         *   索引index : 分数
         * }
         */
        players.forEach((e,i) => {
            if(e.paixing.Middle.normalType == maxType){
                maxCount.set(i,0);
            } 
        })
        if(maxCount.size > 1){//比底牌
            
            
            let maxScore = 0;
            for (let key of maxCount.keys()) {
                let scores = this.getScore(players[key].paixing.Middle.pokers,maxType);
                if(maxScore < scores){ //获取最大分数
                    maxScore = scores;
                }
                maxCount.set(key,scores) ;
            }
            let maxPlayerTemp = []; 
            maxCount.forEach(function(value, key) {
                if(maxScore == value){
                    maxPlayerTemp.push(Number(key));
                }
            })

            if(maxPlayerTemp.length == 1){ //只有一个最大牌
                winner = maxPlayerTemp[0];
            }else{
                if(maxPlayerTemp.indexOf(zhuangIndex) != -1){ //分数一样庄家大
                    winner = zhuangIndex;
                }else{ 
                    maxPlayerTemp.sort((a,b) => {
                        return a-b;
                    })
                    winner = maxPlayerTemp[0]; //返回编号在前的玩家
        
                }
            }
            
        }else{
            for (let key of maxCount.keys()) {
                winner = Number(key);
            }
        }
        beiNum = 0;
        switch(maxType) {
            case NormalType.TONG_HUA_SHUN: //同花顺
                beiNum = 10;
                break;
            case NormalType.TIE_ZHI: //炸弹
                beiNum = 8;
                break;
            case NormalType.HU_LU:
                beiNum = 2;
                break;
            default:
                beiNum = 1;
        }
        players[winner].MiddlebeiNum = beiNum;
        
        //------------------------------尾墩----------------------------------------------------
        maxType = 0;
        winner = 0;
        //最大牌型的人数
        maxCount = new Map();
        players.forEach((e,i) => { //无特殊牌型，先比尾墩 
            //找出最大牌型
            maxType = e.paixing.Tail.normalType>maxType?e.paixing.Tail.normalType:maxType;
        })
        /**
         * {
         *   索引index : 分数
         * }
         */
        players.forEach((e,i) => {
            if(e.paixing.Tail.normalType == maxType){
                maxCount.set(i,0);
            } 
        })
        winner = 0;
        if(maxCount.size > 1){//比底牌
            let maxScore = 0;
            for (let key of maxCount.keys()) {
                let scores = this.getScore(players[key].paixing.Tail.pokers,maxType);
                if(maxScore < scores){ //获取最大分数
                    maxScore = scores;
                }
                maxCount.set(key,scores) ;
            }
            let maxPlayerTemp = []; 
            maxCount.forEach(function(value, key) {
                if(maxScore == value){
                    maxPlayerTemp.push(Number(key));
                }
            })

            if(maxPlayerTemp.length == 1){ //只有一个最大牌
                winner = maxPlayerTemp[0];
            }else{
                if(maxPlayerTemp.indexOf(zhuangIndex) != -1){ //分数一样庄家大
                    winner = zhuangIndex;
                }else{ 
                    maxPlayerTemp.sort((a,b) => {
                        return a-b;
                    })
                    winner = maxPlayerTemp[0]; //返回编号在前的玩家
        
                }
            }
            
        }else{
            for (let key of maxCount.keys()) {
                winner = Number(key);
            }
        }
        beiNum = 0;
        switch(maxType) {
            case NormalType.SAN_TIAO: //同花顺
                beiNum = 3;
                break;
            default:
                beiNum = 1;
        }
        players[winner].TailbeiNum = beiNum;
        
        //总赔率相加 找到赢家
        let maxBeinum = 0;
        let wIndex = 0;
        for( let i=0;i< players.length;i++){
            let a = players[i].HeadbeiNum + players[i].MiddlebeiNum + players[i].TailbeiNum;
            players[i].beiNum =  a;
            if(maxBeinum < a){
                maxBeinum = a;
            }
        }
        let winnerArr = [];
        players.forEach((e,i) => {
            if(e.beiNum == maxBeinum){
                winnerArr.push(i);
            }
        })
        if(winnerArr.length == 1){ //只有一个最大
            wIndex = winnerArr[0];
        }else{//分数一样 底墩大的赢
            let temp = 0;
            winnerArr.forEach((e,i) => {
                if(temp < players[e].HeadbeiNum){
                    temp =  players[e].HeadbeiNum;
                    wIndex = e;
                }
            })
             
        }
        return players[wIndex]

    }
    getScore(pks,maxType){//比牌型  玩家索引
        let scores = 0;
        if(pks.length == 3){ //尾墩
            if(maxType == NormalType.SAN_TIAO){ //三冲头
                scores = pks[0].Score*100
            }
            if(maxType == NormalType.DUI_ZI){ //对子
                if(pks[0].Score == pks[1].Score){
                    scores = pks[1].Score*100 + pks[2].Score;
                }
                if(pks[1].Score == pks[2].Score){
                    scores = pks[0].Score + pks[1].Score*100
                }
            }else{
                scores = pks[0].Score + pks[1].Score*100 + pks[2].Score * 10000;
            }
            return scores;
        }
        if(maxType == NormalType.TONG_HUA_SHUN || maxType == NormalType.TONG_HUA || maxType == NormalType.SHUN_ZI || maxType == NormalType.WU_LONG){ //最大牌型为同花顺
                // ////debugger
                scores = Number(pks[0].Score) + Number(pks[1].Score)*10 + Number(pks[2].Score)*100 + Number(pks[3].Score)*1000 + Number(pks[4].Score)*10000
        }
        if(maxType == NormalType.TIE_ZHI){ //最大牌型为炸弹
                if(pks[0].Score != pks[2].Score){
                    scores = pks[0].Score + pks[2].Score*100
                }else{
                    scores = pks[4].Score  + pks[3].Score *100
                }
                
        }

        if(maxType == NormalType.HU_LU){ //最大牌型为葫芦

                if(pks[1].Score != pks[2].Score && pks[0].Score == pks[1].Score){
                    scores = pks[0].Score + pks[2].Score*10000
                }else{
                    scores = pks[0].Score*10000 + pks[4].Score
                }
        }

        if(maxType == NormalType.SAN_TIAO){//最大牌型为三条
            
           
                if(pks[0].Score == pks[1].Score && pks[1].Score == pks[2].Score){
                    scores = pks[2].Score*10000 + pks[3].Score + pks[4].Score*100;
                }else if(pks[1].Score == pks[2].Score && pks[2].Score == pks[3].Score){
                    scores = pks[1].Score*10000 + pks[0].Score + pks[4].Score*100;
                }else if(pks==[2].Score == pks[3].Score && pks[3].Score == pks[4].Score){
                    scores = pks[4].Score*10000 + pks[0].Score + pks[1].Score*100;
                }

        }
        if(maxType == NormalType.LIANG_DUI){//最大牌型为两对
            
                if(pks[0].Score != pks[1].Score){
                    scores = pks[0].Score + pks[1].Score * 100 + pks[4].Score*10000
                }else if(pks[2] != pks[3]){
                    scores = pks[0].Score*100 + pks[1].Score + pks[4].Score*10000
                }else{
                    scores = pks[0].Score*100 + pks[2].Score*10000 + pks[4].Score
                }

        }
        if(maxType == NormalType.DUI_ZI){//最大牌型为对子
            
                if(pks[0].Score == pks[1].Score){//对子在开头
                    scores = pks[1].Score*1000000 + pks[2].Score + pks[3].Score*100 + pks[4].Score* 10000
                }else if(pks[1].Score == pks[2].Score){
                    scores = pks[1].Score*1000000 + pks[0].Score + pks[3].Score*100 + pks[4].Score* 10000
                }else if(pks[2].Score == pks[3].Score){
                    scores = pks[2].Score*1000000 + pks[0].Score + pks[1].Score*100 + pks[4].Score* 10000
                }else if(pks[3].Score == pks[4].Score){
                    scores = pks[3].Score*1000000 + pks[0].Score + pks[1].Score*100 + pks[2].Score* 10000
                }

        }
        return scores;
    }
}
