/*
 *
 * Created by Stone
 * https://github.com/bolan9999
 * Email: bolan999999@gmail.com
 * Date: 2017/12/14
 *
 */

let message = [
  {
    title: "游戏推荐",
    subtitle: "热门游戏推荐：王者荣耀,英雄联盟"
  },
  {
    title: "通知提醒",
    subtitle: "您有一份快递已送达，请查收"
  },
  {
    title: "优惠活动",
    subtitle: "买999送0.1元，满9999立减100000元"
  },
  {
    title: "卡券消息",
    subtitle: "查看最新卡券福利消息，0元完全免费购机"
  },
  {
    title: "系统消息",
    subtitle: "您的智商已欠费停机，请充值！"
  }
];

let messages = [{ items: [] }];
for (let i = 0; i < 1000; ++i) {
  messages[0].items.push(message[Math.floor(Math.random() * 5)]);
}

let contacts = [
  {
    header: "A",
    items: [
      {
        name: "Apple",
        phone: "13333333333"
      },
      {
        name: "App",
        phone: "13333333443"
      },
      {
        name: "Aee",
        phone: "13333333553"
      },
      {
        name: "Aliy",
        phone: "13336633333"
      },
      {
        name: "Amliy",
        phone: "13333333003"
      },
      {
        name: "Anni",
        phone: "13123333333"
      },
      {
        name: "Akali",
        phone: "13322333333"
      },
      {
        name: "All",
        phone: "13333333333"
      },
      {
        name: "Aba",
        phone: "13333333310"
      },
      {
        name: "Appqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "B",
    items: [
      {
        name: "Bpple",
        phone: "13333333333"
      },
      {
        name: "Bpp",
        phone: "13333333443"
      },
      {
        name: "Bee",
        phone: "13333333553"
      },
      {
        name: "Bliy",
        phone: "13336633333"
      },
      {
        name: "Bmliy",
        phone: "13333333003"
      },
      {
        name: "Bnni",
        phone: "13123333333"
      },
      {
        name: "Bkali",
        phone: "13322333333"
      },
      {
        name: "Bll",
        phone: "13333333333"
      },
      {
        name: "Bba",
        phone: "13333333310"
      },
      {
        name: "Bppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "C",
    items: [
      {
        name: "Cpple",
        phone: "13333333333"
      },
      {
        name: "Cpp",
        phone: "13333333443"
      },
      {
        name: "Cee",
        phone: "13333333553"
      },
      {
        name: "Cliy",
        phone: "13336633333"
      },
      {
        name: "Cmliy",
        phone: "13333333003"
      },
      {
        name: "Cnni",
        phone: "13123333333"
      },
      {
        name: "Ckali",
        phone: "13322333333"
      },
      {
        name: "Cll",
        phone: "13333333333"
      },
      {
        name: "Cba",
        phone: "13333333310"
      },
      {
        name: "Cppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "D",
    items: [
      {
        name: "Dpple",
        phone: "13333333333"
      },
      {
        name: "Dpp",
        phone: "13333333443"
      },
      {
        name: "Dee",
        phone: "13333333553"
      },
      {
        name: "Dliy",
        phone: "13336633333"
      },
      {
        name: "Dmliy",
        phone: "13333333003"
      },
      {
        name: "Dnni",
        phone: "13123333333"
      },
      {
        name: "Dkali",
        phone: "13322333333"
      },
      {
        name: "Dll",
        phone: "13333333333"
      },
      {
        name: "Dba",
        phone: "13333333310"
      },
      {
        name: "Dppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "E",
    items: [
      {
        name: "Epple",
        phone: "13333333333"
      },
      {
        name: "Epp",
        phone: "13333333443"
      },
      {
        name: "Eee",
        phone: "13333333553"
      },
      {
        name: "Eliy",
        phone: "13336633333"
      },
      {
        name: "Emliy",
        phone: "13333333003"
      },
      {
        name: "Enni",
        phone: "13123333333"
      },
      {
        name: "Ekali",
        phone: "13322333333"
      },
      {
        name: "Ell",
        phone: "13333333333"
      },
      {
        name: "Eba",
        phone: "13333333310"
      },
      {
        name: "Eppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "F",
    items: [
      {
        name: "Fpple",
        phone: "13333333333"
      },
      {
        name: "Fpp",
        phone: "13333333443"
      },
      {
        name: "Fee",
        phone: "13333333553"
      },
      {
        name: "Fliy",
        phone: "13336633333"
      },
      {
        name: "Fmliy",
        phone: "13333333003"
      },
      {
        name: "Fnni",
        phone: "13123333333"
      },
      {
        name: "Fkali",
        phone: "13322333333"
      },
      {
        name: "Fll",
        phone: "13333333333"
      },
      {
        name: "Fba",
        phone: "13333333310"
      },
      {
        name: "Fppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "G",
    items: [
      {
        name: "Gpple",
        phone: "13333333333"
      },
      {
        name: "Gpp",
        phone: "13333333443"
      },
      {
        name: "Gee",
        phone: "13333333553"
      },
      {
        name: "Gliy",
        phone: "13336633333"
      },
      {
        name: "Gmliy",
        phone: "13333333003"
      },
      {
        name: "Gnni",
        phone: "13123333333"
      },
      {
        name: "Gkali",
        phone: "13322333333"
      },
      {
        name: "Gll",
        phone: "13333333333"
      },
      {
        name: "Gba",
        phone: "13333333310"
      },
      {
        name: "Gppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "H",
    items: [
      {
        name: "Hpple",
        phone: "13333333333"
      },
      {
        name: "Hpp",
        phone: "13333333443"
      },
      {
        name: "Hee",
        phone: "13333333553"
      },
      {
        name: "Hliy",
        phone: "13336633333"
      },
      {
        name: "Hmliy",
        phone: "13333333003"
      },
      {
        name: "Hnni",
        phone: "13123333333"
      },
      {
        name: "Hkali",
        phone: "13322333333"
      },
      {
        name: "Hll",
        phone: "13333333333"
      },
      {
        name: "Hba",
        phone: "13333333310"
      },
      {
        name: "Hppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "I",
    items: [
      {
        name: "Ipple",
        phone: "13333333333"
      },
      {
        name: "Ipp",
        phone: "13333333443"
      },
      {
        name: "Iee",
        phone: "13333333553"
      },
      {
        name: "Iliy",
        phone: "13336633333"
      },
      {
        name: "Imliy",
        phone: "13333333003"
      },
      {
        name: "Inni",
        phone: "13123333333"
      },
      {
        name: "Ikali",
        phone: "13322333333"
      },
      {
        name: "Ill",
        phone: "13333333333"
      },
      {
        name: "Iba",
        phone: "13333333310"
      },
      {
        name: "Ippqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "J",
    items: [
      {
        name: "Jpple",
        phone: "13333333333"
      },
      {
        name: "Jpp",
        phone: "13333333443"
      },
      {
        name: "Jee",
        phone: "13333333553"
      },
      {
        name: "Jliy",
        phone: "13336633333"
      },
      {
        name: "Jmliy",
        phone: "13333333003"
      },
      {
        name: "Jnni",
        phone: "13123333333"
      },
      {
        name: "Jkali",
        phone: "13322333333"
      },
      {
        name: "Jll",
        phone: "13333333333"
      },
      {
        name: "Jba",
        phone: "13333333310"
      },
      {
        name: "Jppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "K",
    items: [
      {
        name: "Kpple",
        phone: "13333333333"
      },
      {
        name: "Kpp",
        phone: "13333333443"
      },
      {
        name: "Kee",
        phone: "13333333553"
      },
      {
        name: "Kliy",
        phone: "13336633333"
      },
      {
        name: "Kmliy",
        phone: "13333333003"
      },
      {
        name: "Knni",
        phone: "13123333333"
      },
      {
        name: "Kkali",
        phone: "13322333333"
      },
      {
        name: "Kll",
        phone: "13333333333"
      },
      {
        name: "Kba",
        phone: "13333333310"
      },
      {
        name: "Kppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "L",
    items: [
      {
        name: "Lpple",
        phone: "13333333333"
      },
      {
        name: "Lpp",
        phone: "13333333443"
      },
      {
        name: "Lee",
        phone: "13333333553"
      },
      {
        name: "Lliy",
        phone: "13336633333"
      },
      {
        name: "Lmliy",
        phone: "13333333003"
      },
      {
        name: "Lnni",
        phone: "13123333333"
      },
      {
        name: "Lkali",
        phone: "13322333333"
      },
      {
        name: "Lll",
        phone: "13333333333"
      },
      {
        name: "Lba",
        phone: "13333333310"
      },
      {
        name: "Lppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "M",
    items: [
      {
        name: "Mpple",
        phone: "13333333333"
      },
      {
        name: "Mpp",
        phone: "13333333443"
      },
      {
        name: "Mee",
        phone: "13333333553"
      },
      {
        name: "Mliy",
        phone: "13336633333"
      },
      {
        name: "Mmliy",
        phone: "13333333003"
      },
      {
        name: "Mnni",
        phone: "13123333333"
      },
      {
        name: "Mkali",
        phone: "13322333333"
      },
      {
        name: "Mll",
        phone: "13333333333"
      },
      {
        name: "Mba",
        phone: "13333333310"
      },
      {
        name: "Mppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "N",
    items: [
      {
        name: "Npple",
        phone: "13333333333"
      },
      {
        name: "Npp",
        phone: "13333333443"
      },
      {
        name: "Nee",
        phone: "13333333553"
      },
      {
        name: "Nliy",
        phone: "13336633333"
      },
      {
        name: "Nmliy",
        phone: "13333333003"
      },
      {
        name: "Nnni",
        phone: "13123333333"
      },
      {
        name: "Nkali",
        phone: "13322333333"
      },
      {
        name: "Nll",
        phone: "13333333333"
      },
      {
        name: "Nba",
        phone: "13333333310"
      },
      {
        name: "Nppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "O",
    items: [
      {
        name: "Opple",
        phone: "13333333333"
      },
      {
        name: "Opp",
        phone: "13333333443"
      },
      {
        name: "Oee",
        phone: "13333333553"
      },
      {
        name: "Oliy",
        phone: "13336633333"
      },
      {
        name: "Omliy",
        phone: "13333333003"
      },
      {
        name: "Onni",
        phone: "13123333333"
      },
      {
        name: "Okali",
        phone: "13322333333"
      },
      {
        name: "Oll",
        phone: "13333333333"
      },
      {
        name: "Oba",
        phone: "13333333310"
      },
      {
        name: "Oppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "P",
    items: [
      {
        name: "Ppple",
        phone: "13333333333"
      },
      {
        name: "Ppp",
        phone: "13333333443"
      },
      {
        name: "Pee",
        phone: "13333333553"
      },
      {
        name: "Pliy",
        phone: "13336633333"
      },
      {
        name: "Pmliy",
        phone: "13333333003"
      },
      {
        name: "Pnni",
        phone: "13123333333"
      },
      {
        name: "Pkali",
        phone: "13322333333"
      },
      {
        name: "Pll",
        phone: "13333333333"
      },
      {
        name: "Pba",
        phone: "13333333310"
      },
      {
        name: "Pppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "Q",
    items: [
      {
        name: "Qpple",
        phone: "13333333333"
      },
      {
        name: "Qpp",
        phone: "13333333443"
      },
      {
        name: "Qee",
        phone: "13333333553"
      },
      {
        name: "Qliy",
        phone: "13336633333"
      },
      {
        name: "Qmliy",
        phone: "13333333003"
      },
      {
        name: "Qnni",
        phone: "13123333333"
      },
      {
        name: "Qkali",
        phone: "13322333333"
      },
      {
        name: "Qll",
        phone: "13333333333"
      },
      {
        name: "Qba",
        phone: "13333333310"
      },
      {
        name: "Qppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "R",
    items: [
      {
        name: "Rpple",
        phone: "13333333333"
      },
      {
        name: "Rpp",
        phone: "13333333443"
      },
      {
        name: "Ree",
        phone: "13333333553"
      },
      {
        name: "Rliy",
        phone: "13336633333"
      },
      {
        name: "Rmliy",
        phone: "13333333003"
      },
      {
        name: "Rnni",
        phone: "13123333333"
      },
      {
        name: "Rkali",
        phone: "13322333333"
      },
      {
        name: "Rll",
        phone: "13333333333"
      },
      {
        name: "Rba",
        phone: "13333333310"
      },
      {
        name: "Rppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "S",
    items: [
      {
        name: "Spple",
        phone: "13333333333"
      },
      {
        name: "Spp",
        phone: "13333333443"
      },
      {
        name: "See",
        phone: "13333333553"
      },
      {
        name: "Sliy",
        phone: "13336633333"
      },
      {
        name: "Smliy",
        phone: "13333333003"
      },
      {
        name: "Snni",
        phone: "13123333333"
      },
      {
        name: "Skali",
        phone: "13322333333"
      },
      {
        name: "Sll",
        phone: "13333333333"
      },
      {
        name: "Sba",
        phone: "13333333310"
      },
      {
        name: "Sppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "T",
    items: [
      {
        name: "Tpple",
        phone: "13333333333"
      },
      {
        name: "Tpp",
        phone: "13333333443"
      },
      {
        name: "Tee",
        phone: "13333333553"
      },
      {
        name: "Tliy",
        phone: "13336633333"
      },
      {
        name: "Tmliy",
        phone: "13333333003"
      },
      {
        name: "Tnni",
        phone: "13123333333"
      },
      {
        name: "Tkali",
        phone: "13322333333"
      },
      {
        name: "Tll",
        phone: "13333333333"
      },
      {
        name: "Tba",
        phone: "13333333310"
      },
      {
        name: "Tppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "U",
    items: [
      {
        name: "Upple",
        phone: "13333333333"
      },
      {
        name: "Upp",
        phone: "13333333443"
      },
      {
        name: "Uee",
        phone: "13333333553"
      },
      {
        name: "Uliy",
        phone: "13336633333"
      },
      {
        name: "Umliy",
        phone: "13333333003"
      },
      {
        name: "Unni",
        phone: "13123333333"
      },
      {
        name: "Ukali",
        phone: "13322333333"
      },
      {
        name: "Ull",
        phone: "13333333333"
      },
      {
        name: "Uba",
        phone: "13333333310"
      },
      {
        name: "Uppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "V",
    items: [
      {
        name: "Vpple",
        phone: "13333333333"
      },
      {
        name: "Vpp",
        phone: "13333333443"
      },
      {
        name: "Vee",
        phone: "13333333553"
      },
      {
        name: "Vliy",
        phone: "13336633333"
      },
      {
        name: "Vmliy",
        phone: "13333333003"
      },
      {
        name: "Vnni",
        phone: "13123333333"
      },
      {
        name: "Vkali",
        phone: "13322333333"
      },
      {
        name: "Vll",
        phone: "13333333333"
      },
      {
        name: "Vba",
        phone: "13333333310"
      },
      {
        name: "Vppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "W",
    items: [
      {
        name: "Wpple",
        phone: "13333333333"
      },
      {
        name: "Wpp",
        phone: "13333333443"
      },
      {
        name: "Wee",
        phone: "13333333553"
      },
      {
        name: "Wliy",
        phone: "13336633333"
      },
      {
        name: "Wmliy",
        phone: "13333333003"
      },
      {
        name: "Wnni",
        phone: "13123333333"
      },
      {
        name: "Wkali",
        phone: "13322333333"
      },
      {
        name: "Wll",
        phone: "13333333333"
      },
      {
        name: "Wba",
        phone: "13333333310"
      },
      {
        name: "Wppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "X",
    items: [
      {
        name: "Xpple",
        phone: "13333333333"
      },
      {
        name: "Xpp",
        phone: "13333333443"
      },
      {
        name: "Xee",
        phone: "13333333553"
      },
      {
        name: "Xliy",
        phone: "13336633333"
      },
      {
        name: "Xmliy",
        phone: "13333333003"
      },
      {
        name: "Xnni",
        phone: "13123333333"
      },
      {
        name: "Xkali",
        phone: "13322333333"
      },
      {
        name: "Xll",
        phone: "13333333333"
      },
      {
        name: "Xba",
        phone: "13333333310"
      },
      {
        name: "Xppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "Y",
    items: [
      {
        name: "Ypple",
        phone: "13333333333"
      },
      {
        name: "Ypp",
        phone: "13333333443"
      },
      {
        name: "Yee",
        phone: "13333333553"
      },
      {
        name: "Yliy",
        phone: "13336633333"
      },
      {
        name: "Ymliy",
        phone: "13333333003"
      },
      {
        name: "Ynni",
        phone: "13123333333"
      },
      {
        name: "Ykali",
        phone: "13322333333"
      },
      {
        name: "Yll",
        phone: "13333333333"
      },
      {
        name: "Yba",
        phone: "13333333310"
      },
      {
        name: "Yppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "Z",
    items: [
      {
        name: "Zpple",
        phone: "13333333333"
      },
      {
        name: "Zpp",
        phone: "13333333443"
      },
      {
        name: "Zee",
        phone: "13333333553"
      },
      {
        name: "Zliy",
        phone: "13336633333"
      },
      {
        name: "Zmliy",
        phone: "13333333003"
      },
      {
        name: "Znni",
        phone: "13123333333"
      },
      {
        name: "Zkali",
        phone: "13322333333"
      },
      {
        name: "Zll",
        phone: "13333333333"
      },
      {
        name: "Zba",
        phone: "13333333310"
      },
      {
        name: "Zppqq",
        phone: "13333333333"
      }
    ]
  },
  {
    header: "#",
    items: [
      {
        name: "#pple",
        phone: "13333333333"
      },
      {
        name: "#pp",
        phone: "13333333443"
      },
      {
        name: "#ee",
        phone: "13333333553"
      },
      {
        name: "#liy",
        phone: "13336633333"
      },
      {
        name: "#mliy",
        phone: "13333333003"
      },
      {
        name: "#nni",
        phone: "13123333333"
      },
      {
        name: "#kali",
        phone: "13322333333"
      },
      {
        name: "#ll",
        phone: "13333333333"
      },
      {
        name: "#ba",
        phone: "13333333310"
      },
      {
        name: "#ppqq",
        phone: "13333333333"
      }
    ]
  }
];

let foods = [
  {
    header: "热销",
    items: [
      {
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  },
  {
    header: "加菜",
    items: [
      {
        title: "泡菜",
        subtitle: "含米饭一份",
        sales: "月销2020份",
        praise: "赞4",
        prise: "¥0.00",
        activity: ""
      },
      {
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        title: "加青菜",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  },
  {
    header: "米饭",
    items: [
      {
        title: "米饭",
        subtitle: "",
        sales: "月销22000份",
        praise: "赞4",
        prise: "¥2",
        activity: ""
      }
    ]
  },
  {
    header: "砂锅黄焖鸡套餐",
    items: [
      {
        title: "黄焖鸡小份加豆皮",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥20.86",
        activity: "8折优惠，限1份"
      },
      {
        title: "黄焖鸡小份加香菇",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "黄焖鸡小份加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        title: "黄焖鸡小份加青菜",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  },
  {
    header: "砂锅黄焖猪脚套餐",
    items: [
      {
        title: "黄焖猪脚小份加香菇",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥25.86",
        activity: "8折优惠，限1份"
      },
      {
        title: "黄焖猪脚小份加百事可乐",
        subtitle: "含米饭一份",
        sales: "月销2份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "黄焖猪脚小份加金针菇",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥24",
        activity: ""
      },
      {
        title: "黄焖猪脚小份加豆皮",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        title: "黄焖猪脚小份加青菜",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  },
  {
    header: "砂锅黄焖排骨套餐",
    items: [
      {
        title: "黄焖排骨小份加百事可乐",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥28.86",
        activity: "8折优惠，限1份"
      },
      {
        title: "黄焖排骨小份加香菇",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "黄焖排骨小份加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        title: "黄焖排骨小份加豆皮",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        title: "黄焖排骨小份加青菜",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  },
  {
    header: "招牌菜",
    items: [
      {
        title: "铁山坪麻辣跑山鸡",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        title: "奉节二师兄烤猪头",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  },
  {
    header: "热销1",
    items: [
      {
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  },
  {
    header: "热销2",
    items: [
      {
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  },
  {
    header: "热销3",
    items: [
      {
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  },
  {
    header: "热销4",
    items: [
      {
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  },
  {
    header: "热销5",
    items: [
      {
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  },
  {
    header: "热销6",
    items: [
      {
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  },
  {
    header: "热销7",
    items: [
      {
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  },
  {
    header: "热销8",
    items: [
      {
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  },
  {
    header: "热销9",
    items: [
      {
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  },
  {
    header: "热销10",
    items: [
      {
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  },
  {
    header: "热销11",
    items: [
      {
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  },
  {
    header: "热销12",
    items: [
      {
        title: "黄焖鸡米饭",
        subtitle: "含米饭一份",
        sales: "月销220份",
        praise: "赞4",
        prise: "¥18.86",
        activity: "8折优惠，限1份"
      },
      {
        title: "加豆皮",
        subtitle: "",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥3",
        activity: ""
      },
      {
        title: "加金针菇",
        subtitle: "",
        sales: "月销220份",
        praise: "赞2",
        prise: "¥4",
        activity: ""
      },
      {
        title: "黄焖排骨小份",
        subtitle: "含米饭一份",
        sales: "月销20份",
        praise: "赞1",
        prise: "¥18.76",
        activity: "8折优惠，限1份"
      },
      {
        title: "加香菇",
        subtitle: "",
        sales: "月销290份",
        praise: "赞4",
        prise: "¥5",
        activity: ""
      }
    ]
  }
];

export { messages, contacts, foods };
