const LastChrName = function () {
    let r = "Lucy";
    r = localStorage.chr ? JSON.parse(localStorage.chr).name[2].split(" ")[1] : r;
    return r;
}

const DevModeOnMessage = [
    [
        "WARNING, DO NOT DOWNLOAD ANY OTHER CONTENTS OF THIS SITE!",
        "WHICH ARE HAS OWN COPYRIGHTS, BY EACH 'READ ME' FILE.",
        "SHALL NOT BE REDISTRIBUTE AND REVERSE ENGINEERED"
    ],
    [
        "경고, 본 사이트의 컨텐츠, 내용물을 다운하거나 재배포, 재해석를 해서는 안됩니다.",
        "각각 파일들마다 'README.txt'에 해당 되는 저작권이 적혀있으며,",
        "컨텐츠마다 출처를 명시해 두었습니다."
    ],
    ["Devmode Defence is disabled.\nHappy Coding, Ma.s.. Devloper!", "Devmode is Detected,\nProtection Mode Activating..."],
    ["프로택션 모드가 해제되었습니다.\n코딩 열심히 해주세요 " + (LastChrName() == "Lucy" ? "주ㅇ..ㄴ " : "마스..ㅌ ") + "아니 개발자님!", "프로택션 모드가 활성되있습니다."]
]
const Textlocal = {
    mmdShowConfirm: [['show', '결정'], ['reset', '되돌아가기']],
    mmdinit: ["Do Miku Miku Dance!", "춤추게 해보기"],
    setup: {
        /**
         * shadow.add(effectControllerSky.directionalLight, 'x', -10, 10, 1).onChange(onShadowPosChange);
            shadow.add(effectControllerSky.directionalLight, 'y', -10, 10, 1).onChange(onShadowPosChange);
            shadow.add(effectControllerSky.directionalLight, 'z', -10, 10, 1).onChange(onShadowPosChange);
         */
        bkSky: [
            ["backgroud Sky Setup", "Sky Distance", "Sky Scale", "turbidity", "rayleigh", "mieCoefficient", "mieDirectionalG", "azimuth", "exposure", "Reset Setups", "Shadow Postion Setup", "Postion Reset"],
            ["하늘 설정", "하늘높이", "하늘 크기", "탁도", "고도(rayleigh)", "빛 산란", "빛 강도", "방위각(azimuth)", "노출", "설정 초기화", "그림자 위치 설정", "위치 초기화"]
        ],
        spotLight: [
            ["SpotLight Setup", "position", "angle", "intensity", "penumbra", "bias", "Reset Setups"],
            ["서포트 라이트 설정", "위치 설정", "각도", "강도", "반그림자(penumbra)", "편광 (bias)", "설정 초기화"]
        ],
        chrgui: [
            ["Character Setup", "animation", "Use Ik", "outline", "physics", "show IK bones", "show rigid bodies"],
            ["케릭터 설정", "애니메이션(동작)", "Ik본 사용", "윤곽선(outline)", "물리 활성화", "IK본(뼈대) 보이기", "강체(rigid) 보이기"]
        ],
        guiMein: [
            ["Show Fps", "info hide", "physics Reset", "Full Screen Mode"],
            ["FPS 보이기", "정보창 보이기", "물리 초기화", "전체화면 모드"]
        ],
        floor: [
            ["Floor Addtion Setup", "set MirroredFloor", "set NormalFloor", "Reset Floor"],
            ["바닥 추가 설정", "거울", "연습실 바닥", "초기화"]
        ]
    }
}
const chrData = {
    //Ray default time is 1.56s
    songs: {
        "みんなみくみくにしてあげる": {
            "kor": {
                "title": "모두 미쿠미쿠하게 해줄께(하게 할거야)♪",
                "song": "/모두 미쿠미쿠하게 해줄께♪ (by sodadayo20).mp3",
                "vocalTranner": "sodadayo20"
            },
            "fname": "みんなみくみくにしてあげる",
            "title": "みくみくにしてあげる(してやんよ)♪",
            "song": "/みんなみくみくにしてあげる♪ (JP).mp3",
            "vocalTranner": "ika_mo (鶴田加茂)",
            "author": "ika_mo (鶴田加茂)",
            "artist": "初音ミク",
            "lyricsPath": "/[初音ミク] みんなみくみくにしてあげる♪.lrc",
            "delayTime": 0
        },
        "Dear": {
            "kor": {
                "title": "소중한 너에게 (Dear)",
                "song": "/[初音ミク] Dear (korean by sodadayo20).mp3",
                "vocalTranner": "sodadayo20"
            },
            "fname": "Dear",
            "vmd": "/Dear_R Motion by bb1200nt.vmd",
            "cam": "/Camera by bb1200nt.vmd",
            "song": "/[初音ミク] Dear.mp3",
            "vmdAuthor": "bb1200nt",
            "camAuthor": "bb1200nt",
            "vocalTranner": "19's Sound Factory",
            "author": "19's Sound Factory",
            "artist": "初音ミク",
            "delayTime": 0,
            "lyricsPath": "/[初音ミク] Dear.lrc"
        },
        "Glass Bead": {
            "notInSongList": true,
            "kor": {
                "title": "유리구슬",
                "artist": "여자친구"
            },
            "fname": "GFRIEND - Glass Bead",
            "vmd": "/Glass Bead - Motion [LadieAlien].vmd",
            "cam": "/Glass Bead - Camera [LadieAlien].vmd",
            "song": "/GFriend - Glass Bead.mp3",
            "camAuthor": "LadieAlien",
            "artist": "GFRIEND",
            "delayTime": 0,
            "lyricsPath": "/[GFRIEND] Glass Bead.lrc"
        },
        "Happy Halloween": {
            "kor": {
                "song": "/[Miku] Happy Halloween (korean by sodadayo20).mp3",
                "vocalTranner": "sodadayo20"
            },
            "fname": "Happy Halloween",
            "vmd": "/Happy HalloweenMotion.vmd",
            "cam": "/Happy HalloweenCamera.vmd",
            "song": "/Happy Halloween Junky feat.鏡音リン.mp3",
            "vocalTranner": "Junky",
            "author": "Junky",
            "artist": "鏡音リン",
            "lyricsPath": "/[Junky] Happy Halloween.lrc",
            "delayTime": 0
        },
        "Yellow": {
            "fname": "Yellow",
            "vmd": "/Yellow - Motion.vmd",
            "cam": "/Yellow - Camera.vmd",
            "song": "/Yellow (by kz).mp3",
            "vmdAuthor": "itsuka nightcore",
            "camAuthor": "itsuka nightcore",
            "vocalTranner": "kz (Livetune)",
            "author": "kz (Livetune)",
            "artist": "初音ミク",
            "lyricsPath": "/[初音ミク] Yellow.lrc",
            "delayTime": 0
        },
        "LIKEY": {
            "notInSongList": true,
            "kor": {
                "artist": "트와이스",
                "lyricsPath": "/[TWICE] Likey.lrc"
            },
            "fname": "TWICE - LIKEY",
            "vmd": "/TWICE_LIKEY.vmd",
            "cam": "/Likey Camera Motion by Ayano01Tateyama.vmd",
            "song": "/TWICE_LIKEY.mp3",
            "camAuthor": "Ayano01Tateyama",
            "author": "sodadayo20",
            "artist": "TWICE",
            "delayTime": 0
        },
        "NO EXIT ORION": {
            "kor": {
                "song": "/[Miku Rin Una] NO EXIT ORION (Kor by Akihiko).mp3",
                "author": "하츠네 미쿠, 린, 우나",
                "vocalTranner": "sodadayo20"
            },
            "fname": "NO EXIT ORION",
            "song": "/[初音ミク] NO EXIT ORION (Jp by Meteor's Covers).mp3",
            "vocalTranner": "Meteor's Covers",
            "author": "Printemps",
            "artist": "初音ミク",
            "lyricsPath": "/[Miku Rin Una] NO EXIT ORION.lrc",
            "delayTime": 0
        },
        "Packaged": {
            "kor": {
                "song": "/[Miku] Packaged (ver Ko by sodadayo20).mp3",
                "vocalTranner": "sodadayo20"
            },
            "fname": "Packaged",
            "song": "/Miku v4x - Packaged.mp3",
            "vocalTranner": "kz (Livetune)",
            "author": "kz (Livetune)",
            "artist": "初音ミク",
            "delayTime": 0,
            "lyricsPath": "/[初音ミク] Packaged.lrc"
        },
        "Ray": {
            "kor": {
                "song": "/[Miku] Ray (Kor ver by sodadayo20).mp3",
                "vocalTranner": "sodadayo20"
            },
            "fname": "初音ミク - Ray",
            "vmd": "/ray_motion_Tda式初音ミク_盗賊つばき流MトレースモデルSPv1.08_表示枠整理_足全表示_20201225_144828.vmd",
            "cam": "/ray_Camera.vmd",
            "song": "/[Miku] Ray (Jpn by sodadayo20).mp3",
            "vmdAuthor": "팔성이",
            "camAuthor": "Soell",
            "vocalTranner": "sodadayo20 (ReCovered)",
            "author": "BUMP OF CHICKEN",
            "artist": "初音ミク",
            "delayTime": 2.06,
            "lyricsPath": "/[初音ミク] Ray.lrc",
            "OVRMultiLineSetup": true
        },
        "Roly poly": {
            "notInSongList": true,
            "kor": {
                "title": "롤리 폴리",
                "artist": "티아라"
            },
            "fname": "TARA - Roly poly",
            "vmd": "/Roly poly.vmd",
            "cam": "/Roly poly camera.vmd",
            "song": "/Roly Poly.mp3",
            "artist": "T-ARA",
            "delayTime": 3,
            "lyricsPath": "/[T-ARA] Roly Poly.lrc"
        },
        "Rough": {
            "notInSongList": true,
            "kor": {
                "title": "시간을 달려서",
                "artist": "여자친구"
            },
            "fname": "GFRIEND - Rough",
            "vmd": "/GFRIEND_Rough.vmd",
            "cam": "/GFRIEND_Rough_Camera.vmd",
            "song": "/GFRIEND_Rough.mp3",
            "author": "Su Ho Leem / Yong Bae Seo",
            "artist": "GFRIEND",
            "delayTime": 0,
            "lyricsPath": "/[GFRIEND] Rough.lrc"
        },
        "Snow Fairy Story": {
            "kor": {
                "title": "눈꽃 요정의 이야기 (Snow Fairy Story)",
                "song": "/[初音ミク] Snow Fairy Story (korean ver by sodadayo20).mp3",
                "vocalTranner": "sodadayo20"
            },
            "fname": "Snow Fairy Story",
            "vmd": "/Snow Fairy Story Motion by まいてぃ.vmd",
            "cam": "/SnowFairyStory Camera by 永瀬律 (りつ).vmd",
            "song": "/[初音ミク] Snow Fairy Story by 40mP.mp3",
            "vmdAuthor": "まいてぃ",
            "camAuthor": "永瀬律 (りつ)",
            "vocalTranner": "40mp",
            "author": "40mp",
            "artist": "初音ミク",
            "delayTime": 0
        },
        "Snow Halation": {
            "kor": {
                "title": "스노우 할레이션",
                "song": "/[Miku] Snow Halation (by jomin398).mp3",
                "vocalTranner": "sodadayo20"
            },
            "fname": "Snow halation",
            "song": "/[初音ミク] Snow halation (by BOHAN YU).mp3",
            "vocalTranner": "BOHAN YU",
            "author": "μ’s",
            "artist": "初音ミク",
            "delayTime": 0
        },
        "Start Dash": {
            "fname": "Start Dash",
            "vmd": "/ことりモーション.vmd",
            "cam": "/start dash Camera by roosjuh14290.vmd",
            "song": "/[Miku] Start-Dash!! (by sodadayo20).mp3",
            "vocalTranner": "sodadayo20",
            "author": "μ’s",
            "artist": "初音ミク",
            "delayTime": 0,
            "lyricsPath": "/[u's] start dash.lrc",
            "OVRMultiLineSetup": true
        },
        "Tell Your World": {
            "kor": {
                "song": "/Tell Your World (Korean Cover by sodadayo20).mp3",
                "vocalTranner": "sodadayo20"
            },
            "fname": "Tell_Your_World",
            "vmd": "/TellYourWorldMotion.vmd",
            "cam": "/TellYourWorldCameraMotion.vmd",
            "song": "/Tell your world.mp3",
            "vocalTranner": "kz (Livetune)",
            "author": "kz (Livetune)",
            "artist": "初音ミク",
            "delayTime": 2,
            "lyricsPath": "/[初音ミク] Tell your world.lrc"
        },
        "wavefile": {
            "kor": {
                "vocalTranner": "라마즈P"
            },
            "fname": "wavefile_shorts",
            "vmd": "/wavefile_v2.vmd",
            "cam": "/wavefile_camera.vmd",
            "song": "/wavefile_short.mp3",
            "vmdAuthor": "ラマーズP(LamazeP)",
            "camAuthor": "ラマーズP(LamazeP)",
            "vocalTranner": "ラマーズP(LamazeP)",
            "author": "ラマーズP(LamazeP)",
            "artist": "初音ミク",
            "delayTime": 5.33,
            "lyricsPath": "/[初音ミク] wavefile.lrc"
        },
        "ほうき星": {
            "kor": {
                "title": "혜성",
                "song": "/[初音ミク] ほうき星 (혜성 Korean by sodadayo20).mp3",
                "author": "윤하",
                "vocalTranner": "sodadayo20"
            },
            "fname": "ほうき星",
            "song": "/[初音ミク] ほうき星 (JP by tripshots).mp3",
            "vocalTranner": "tripshots (Livetune)",
            "author": "ユンナ (Epic Records Japan)",
            "artist": "初音ミク",
            "lyricsPath": "/[YunnHa] ほうき星.lrc",
            "delayTime": 0
        },
        "アスノヨゾラ哨戒班": {
            "kor": {
                "title": "내일 밤하늘의 초계반",
                "lyricsPath": "/[初音ミク] アスノヨゾラ哨戒班.lrc"
            },
            "fname": "アスノヨゾラ哨戒班",
            "song": "/[初音ミク] アスノヨゾラ哨戒班 (by sodadayo20).mp3",
            "vocalTranner": "sodadayo20",
            "author": "Orangestar",
            "artist": "初音ミク",
            "delayTime": 0
        },
        "サウンド": {
            "kor": {
                "title": "사운드 (Sound)"
            },
            "fname": "サウンド",
            "song": "/1. サウンド.mp3",
            "vocalTranner": "baker",
            "author": "baker",
            "artist": "初音ミク",
            "delayTime": 0,
            "lyricsPath": "/[初音ミク] サウンド.lrc"
        },
        "チューリングラブ": {
            "kor": {
                "title": "튜링러브",
                "author": "나유탄 성인, 나나오아카리"
            },
            "fname": "チューリングラブ",
            "song": "/チューリングラブ feat.初音ミク(by sodadayo20).mp3",
            "vocalTranner": "sodadayo20",
            "author": "ナユタン星人, ナナヲアカリ",
            "artist": "初音ミク",
            "delayTime": 0,
            "lyricsPath": "/[初音ミク] チューリングラブ.lrc"
        },
        "ツギハギスタッカート": {
            "kor": {
                "title": "누덕누덕 스타카토",
                "song": "/[Miku] 누덕누덕 스타카토.mp3",
                "vocalTranner": "sodadayo20"
            },
            "fname": "Patchwork_Staccato",
            "vmd": "/PatchworkStaccato_motion.vmd",
            "cam": "/Camera by MMD kip.vmd",
            "song": "/pv_912.mp3",
            "camAuthor": "kip",
            "vocalTranner": "とあ (toa)",
            "author": "とあ (toa)",
            "artist": "初音ミク",
            "delayTime": 0
        },
        "メルト": {
            "kor": {
                "title": "멜트",
                "song": "/[Miku] Melt (korean by sodadayo20).mp3",
                "vocalTranner": "sodadayo20",
                "author": "세가 (SEGA)"
            },
            "fname": "Melt",
            "vmd": "/mmd_Melt_motion.vmd",
            "cam": "/MELT CAMERA.vmd",
            "song": "/pv_005.mp3",
            "vmdAuthor": "Sega",
            "camAuthor": "Sega",
            "vocalTranner": "ryo (Supercell)",
            "author": "Sega",
            "artist": "初音ミク",
            "delayTime": 2
        },
        "ワールドイズマイン": {
            "kor": {
                "title": "이 새상은 내꺼! (World is Mine)",
                "song": "/[Miku] World is mine (korean by sodadayo20).mp3",
                "vocalTranner": "sodadayo20"
            },
            "fname": "ワールドイズマイン",
            "song": "/world is mine.mp3",
            "vocalTranner": "ryo (Supercell)",
            "author": "ryo (Supercell)",
            "artist": "初音ミク",
            "delayTime": 0
        },
        "勘違い性反希望症": {
            "kor": {
                "title": "착각성 반희망증",
                "song": "/[Miku] Kanchigai.mp3",
                "vocalTranner": "sodadayo20"
            },
            "fname": "勘違い性反希望症",
            "song": "/DECO_27 - 勘違い性反希望症 feat. 初音ミク.mp3",
            "vocalTranner": "DECO*27",
            "author": "DECO*27",
            "artist": "初音ミク",
            "lyricsPath": "/[初音ミク] 勘違い性反希望症.lrc",
            "delayTime": 0
        },
        "千本桜": {
            "kor": {
                "title": "천본앵",
                "song": "/[Miku] Senbonzakura (Korean by sodadayo20).mp3",
                "vocalTranner": "sodadayo20"
            },
            "fname": "千本桜",
            "vmd": "/motion data.vmd",
            "cam": "/camera.vmd",
            "song": "/[Miku] 千本桜 by 黒うさP.mp3",
            "vocalTranner": "黒うさP",
            "author": "黒うさP",
            "artist": "初音ミク",
            "delayTime": 0
        },
        "君色に染まる": {
            "kor": {
                "title": "너의 색으로 물들어",
                "song": "/君色に染まる_Miku ver Kor.mp3"
            },
            "fname": "君色に染まる",
            "vmd": "/modelBig.vmd",
            "cam": "/camera.vmd",
            "song": "/君色に染まる_Miku ver Kor.mp3",
            "vmdAuthor": "足太ぺんたさん",
            "camAuthor": "IcyFox",
            "author": "TOKOTOKO (西沢さんP)",
            "vocalTranner": "sodadayo20",
            "artist": "初音ミク",
            "delayTime": 0
        },
        "愛言葉Ⅲ": {
            "kor": {
                "title": "사랑의 말 3",
                "song": "/[Miku] 愛言葉Ⅲ (Korean by sodadayo20).mp3",
                "vocalTranner": "sodadayo20"
            },
            "fname": "愛言葉Ⅲ",
            "vmd": "/愛言葉Ⅲ Motion by 足太ぺんたさん.vmd",
            "cam": "/愛言葉Ⅲ Camera.vmd",
            "song": "/[Miku] 愛言葉Ⅲ By DECO27.mp3",
            "vmdAuthor": "足太ぺんたさん",
            "camAuthor": "ろっく",
            "vocalTranner": "DECO*27",
            "author": "DECO*27",
            "artist": "初音ミク",
            "delayTime": 0
        },
        "桜ノ雨": {
            "kor": {
                "title": "벚꽃의 비",
                "song": "/[Miku] Sakura no Ame (ver Ko by sodadayo20).mp3",
                "vocalTranner": "sodadayo20"
            },
            "fname": "桜ノ雨",
            "vmd": "/桜ノ雨(Lat式ミクVer2.31).vmd",
            "cam": "/桜ノ雨 カメラ(Camera).vmd",
            "song": "/桜ノ雨.mp3",
            "vmdAuthor": "如月 (nyotsu_kisaragi)",
            "camAuthor": "saizwong",
            "vocalTranner": "halyosy",
            "author": "halyosy",
            "artist": "初音ミク",
            "delayTime": 0,
            "lyricsPath": "/[初音ミク] 桜ノ雨.lrc"
        },
        "金曜日のおはよう": {
            "kor": {
                "title": "금요일의 아침인사",
                "song": "/[Miku] 금요일의 아침인사.mp3",
                "vocalTranner": "sodadayo20"
            },
            "fname": "金曜日のおはよう",
            "vmd": "/金曜日のおはようブレもーしょん.vmd",
            "cam": "/金曜日のおはよう_160cm_Camera by manabu.vmd",
            "song": "/金曜日のおはよう  another story ／HoneyWorks feat  成海聖奈CV 雨宮天.mp3",
            "vmdAuthor": "ブレン坊",
            "camAuthor": "manabu",
            "vocalTranner": "成海聖奈 (CV.雨宮天)",
            "author": "HoneyWorks",
            "artist": "初音ミク",
            "delayTime": 0,
            "lyricsPath": "/[HoneyWorks] 金曜日のおはよう.lrc"
        }
    },
    chrs: [
        {
            name: ["루시 발렌타인", "バレンタイン ルーシー", "Valentine Lucy"],
            img: "./images/03.racySG2.png",
            cv: ["노별이", "舞原ゆめ"],
            isHasVoicedDesc: true,
            desc: [
                ["루시의 목소리 들어보시겠어요?", "루시에겐 꿈 같은 이야기가 있답니다"],
                ["Would you like to hear Lucy's voice?", "Lucy has a dream-like storys"]
            ],
            tDB: {
                dir: ["./assets/voice/Lucy", 0, ".mp3", 16],
                tdelay: [1, 1, 2, 2, 1, 2, 3, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1],
                tdata: [
                    "루시는....",
                    "긴 꿈을 꾸고 있었던 것만 같아요.",
                    "아주 기나긴 꿈을,",
                    "꾸고 있었던 것만 같아요.",
                    "꿈 속의 루시는 외로웠어요.",
                    "즐겁게 지냈지만",
                    "마음 속에서는 허전함을 느끼고 있었어요.",
                    "항상 웃고 있었지만",
                    "연구소 안은 분명 즐거웠지만....",
                    "다들 루시를 따뜻하게 대해주셨지만...",
                    "...그래도 무언가가 채워지지 않았어요.",
                    "가슴 한 곳이 항상 텅 비어 있었어요.",
                    "그게 뭔지 항상 생각했어요.",
                    "항상 생각했지만...",
                    "그렇지만 항상 답은 나오지 않았어요.",
                    "....지금에서야,",
                    "루시는 이유를 깨달았어요.",
                    "여기 이 곳에 이렇게 오고 나서야...",
                    "루시가 잃어버렸던 것이 무엇이었는지를 알 수 있었어요.",
                    "오랜만이에요. 주인님."
                ]
            }
        },
        {
            name: ["하츠네 미쿠", "初音ミク", "Hatsune Miku"],
            cv: ["후지타 사키 (藤田 咲)", "藤田 咲 (ふじた さき)"],
            img: "./images/Chara_100158.png",
            isHasVoicedDesc: true,
            desc: [
                ["World Diva!", "부족하지만 잘 부탁드려요 마스터.", "저의 노래를 들어봐주세요!"],
                ["World Diva!", "I look forward to your kind co-op, Master.", "Please listen to my song!"]
            ],
            imgAuthor: "SEGA"
        },
        {
            name: ["하츠네 미쿠", "初音ミク", "Hatsune Miku"],
            cv: ["후지타 사키 (藤田 咲)", "藤田 咲 (ふじた さき)"],
            mmd: {
                dress: {
                    no: 0,
                    name: 'Tda式 V4X Ver 1.00',
                    foName: 'Tda式初音ミクV4X_Ver1.00',
                    mmdFilename: '/Tda式初音ミクV4X_Ver1.00.pmx',
                    Author: "TDA"
                }
            }
        },
        {
            name: ["아피미쿠", "あぴミク", "Api Miku"],
            cv: ["후지타 사키 (藤田 咲)", "藤田 咲 (ふじた さき)"],
            mmd: {
                dress: {
                    no: 0,
                    name: 'あぴミク',
                    foName: 'ApiMiku',
                    mmdFilename: '/Appearance Miku.pmx',
                    Author: "ままま"
                }
            }
        },
        {
            name: ["하츠네 미쿠", "初音ミク", "Hatsune Miku"],
            cv: ["후지타 사키 (藤田 咲)", "藤田 咲 (ふじた さき)"],
            mmd: {
                dress: {
                    no: 1,
                    name: 'School Uniform',
                    foName: 'School Uniform Miku',
                    mmdFilename: '/School Uniform Miku.pmx',
                }
            }
        },
        {
            name: ["하츠네 미쿠", "初音ミク", "Hatsune Miku"],
            cv: ["후지타 사키 (藤田 咲)", "藤田 咲 (ふじた さき)"],
            mmd: {
                dress: {
                    no: 2,
                    name: 'Tda式 初音ミク・アペンド Ver1.10',
                    foName: 'Tda式初音ミク・アペンドVer1.10',
                    mmdFilename: '/Tda式初音ミク・アペンド_Ver1.10.pmx',
                    Author: "TDA"
                }
            }
        },
        {
            name: ["하츠네 미쿠", "初音ミク", "Hatsune Miku"],
            cv: ["후지타 사키 (藤田 咲)", "藤田 咲 (ふじた さき)"],
            mmd: {
                dress: {
                    no: 3,
                    name: 'miku v2',
                    foName: 'miku_v2',
                    mmdFilename: '/miku_v2.pmd',
                    Author: "TDA"
                }
            },
        }
    ]
}
