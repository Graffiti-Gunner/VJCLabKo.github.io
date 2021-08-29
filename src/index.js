var chrNameNow = null;
var sIndex = 1;

const localLang = navigator.language;
var isKor = localLang == "ko-KR";
if (sessionStorage.getItem('lang') && sessionStorage.lang != "ko-KR") {
  isKor = false;
} else if (sessionStorage.lang == "ko-KR" || localLang == "ko-KR") {
  isKor = true;
}

const isMobile = () => {
  return document.body.clientWidth <= 510;
}
function getnowTime() {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  return new Date().toLocaleDateString((!isKor ? 'en-US' : 'ko-KR'), options)
}
const lastVersion = '0.131.3';
// function getModuleVer() {
//   let domparser = new DOMParser();
//   function reqListener() {
//     let doc = domparser.parseFromString(this.response, 'text/html');
//     let data = doc.querySelector('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l.order-1-ns.order-0 > div:nth-child(6) > p').innerText;
//     let diff = Math.abs(lastVersion - data);
//     if (diff >= 0.4) {
//       alert(['Call WebMaster to Say Update 3D Engine Module', 'Used now : ' + lastVersion, 'new version : ' + data].join('\n'));
//     }
//   }

//   var oReq = new XMLHttpRequest();
//   oReq.addEventListener("load", reqListener);
//   oReq.open("GET", "https://www.npmjs.com/package/three");
//   oReq.send();
// }
function langChange() {
  if (window.sessionStorage.getItem('lang')) {
    window.sessionStorage.removeItem('lang');
  }
  isKor = false;
  window.sessionStorage.lang = 'en-US';
  location.reload();
}
function toKor() {
  if (window.sessionStorage.getItem('lang')) {
    window.sessionStorage.removeItem('lang');
  }
  location.reload();
}
function headInit() {
  let h = document.querySelector("#Topnav > ul > li:nth-child(1) > a.mein_text");
  if (!h.innerText) {
    h.style.padding = "5px 5px 0";
  }
  // let iconnode = document.createElement("i");
  // iconnode.className = "fas fa-hourglass-start"; //fas fa-exclamation-triangle
  // document.getElementById("batteryLevel")
  //   .appendChild(iconnode);
  // let node = document.getElementById("batteryLevel");
  // node.style.color = "white";
  // node.style.backgroundColor = "transparent";
  // // node.style.width = 0;
  // node.style.display = "flex";
  // node.style.flexDirection = "column";
  // node.style.justifyContent = "center";
  // let dropdownMenu = document.createElement("ul");
  // dropdownMenu.className = 'dropdown';
  // dropdownMenu.innerHTML = "<label><input type='checkbox' name='use-internal-bms' value='false' onclick='onBMSSetupChange();'> use Internal</label>";
  // document.querySelector("ul.menu li:nth-child(4)")
  //   .appendChild(dropdownMenu);
  // bmsInit();
  let langsl = document.createElement('div');
  langsl.id = "langSel";
  let langbutt = document.createElement('button');
  langbutt.id = "langToENG";
  //localization
  if (isKor) {
    document.querySelector("#global-footer > nav > a#EULA").innerText = "이용약관";
    document.querySelector("#global-footer > nav > a#Policy").innerText = "개인정보 취급 방침";


    langbutt.innerText = '영어모드 (원곡을 들을 수 있음)';
    langbutt.onclick = () => langChange();

  } else {
    langbutt.innerText = "한국어모드 (Korean Mode)";
    langbutt.onclick = () => toKor();
  }
  langsl.appendChild(langbutt)
  document.getElementById('global-footer').appendChild(langsl)
  // setInterval(function(){
  //   if(window.loaded){document.querySelector(".nowTime").innerHTML = getnowTime();}
  // },1000);
  console.log(isMobile())
}
const isMiku = () => chrNameNow.some(e => e.includes("Miku"));
const isMMD = () => Boolean(!chrData.chrs[sIndex].img && chrData.chrs[sIndex].mmd);
// isKor = false;
//chr appending
function appendChrNameF(sIndex, lIndex) {
  const b = document.querySelector("#character-detail div div.content-title");
  b.appendChild(document.createElement("ul"));
  let chr = chrData.chrs[sIndex];
  chrNameNow = chr.name;
  document.querySelector('#character-detail > div.content.character-detail').dataset.name = chrNameNow[2].split(" ")[1];
  let t = document.querySelector("#character-detail div div.content-title ul");
  const idL = ["chrName", "EnName", "CV", "imageAuthor"];
  for (i in idL) {
    let e = document.createElement('li');
    e.id = idL[i];
    if (i == 0) {
      e.innerText = chr.name[isKor ? lIndex : 2];
    } else if (i == 1) {
      if (isKor) { e.innerText = chr.name[2] };
    } else if (i == 2 && chr.cv) {
      for (let j = 0; j < 2; j++) {
        let cvE = document.createElement('span');
        cvE.innerText = [(isKor ? "성우" : idL[i]) + " : ", (isKor ? chr.cv[lIndex] : chr.cv[1])][j];
        e.appendChild(cvE);
      }
    } else if (i == 3 && chr.img) {
      e.className = "image-author";
      e.innerText = (isKor ? "일러스트 : " : "illustrated by : ") + ((chr.imgAuthor) ? chr.imgAuthor : '[Unknown Author]');
    } else if (i == 3 && chr.mmd) {
      e.className = "image-author";
      e.innerText = (isKor ? "3D 모델링 : " : "3D Modeled by : ") + ((chr.mmd.dress.Author) ? chr.mmd.dress.Author : '[Unknown Author]');
    }
    t.appendChild(e);
  }
  if (chr.menuFn) {
    chr.menuFn(chr);
  }
}

function appendMenu(items) {
  let bmsst = document.querySelector("#Topnav > ul > li:nth-child(4) > a");
  bmsst.onclick = function () {
    var x = document.querySelector("ul.dropdown");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  let m = document.querySelector("#Topnav > ul > li:last-child > a");
  m.onclick = function () {
    let t = document.querySelector("header#Topnav");
    if (!t.className.includes("responsive")) {
      t.classList += " responsive";
    } else {
      t.classList.remove("responsive");
    }
  };

  const b = document.getElementById("banners");
  let btn = document.createElement('button');
  btn.id = 'mmdInitButton';
  btn.innerText = Textlocal.mmdinit[(!isKor ? 0 : 1)];
  btn.onclick = function () {
    document.querySelector('header').remove();
    document.querySelector('footer').remove();
    document.getElementById('masthead').remove();
    console.log("ready for Rendering. chosen Chr's Name :", LastChrName())
    rendererInit();
  }
  b.appendChild(btn);
};

function appendChr() {
  let toJtoS = (Json) => JSON.stringify(Json);
  let chrDB = LocChrLoad();
  console.log("LoadChr :", chrDB ? (["chrName : " + chrDB.name[0], "chrDress : " + toJtoS(chrDB.mmd.dress), "raw : " + toJtoS(chrDB)].join('\n')) : "EMPTY ChrDB")
  let chr = chrData.chrs[sIndex];
  let t = document.querySelector('#character-detail > div.content.character-detail > img');
  let br = document.querySelector("#character-detail > div.modal-btn.modal-btn--next");
  let bl = document.querySelector("#character-detail > div.modal-btn.modal-btn--prev");
  let tb = document.querySelector("#character-detail div div.content-title ul");
  let vc = document.querySelector("#character-detail > div.content.character-detail > div.character-voice.jp-character-container div");

  if (!t && chrData.chrs[sIndex].img) {
    let img = document.createElement('img')
    img.className = "character-detail__body";
    t = document.querySelector('#character-detail > div.content.character-detail div.content-title').insertAdjacentElement('afterend', img);
  }
  if (sIndex != chrData.chrs.length - 1) {
    br.style.opacity = 1;
    if (sIndex != 0) {
      bl.style.opacity = 1;
    }
  } else if (sIndex == chrData.chrs.length - 1) {
    br.style.opacity = 0.6;
    bl.style.opacity = 1;
  }
  if (sIndex == 0) {
    bl.style.opacity = 0.6;
  }

  if (chr.img) {
    t.src = chr.img;
  }

  let desc = document.querySelector("#character-detail > div.content.character-detail > div.character-voice.jp-character-container");

  if (chr.desc) {
    if (desc) {
      desc.remove();
    }
    if (!document.body.contains(desc)) {
      let e = document.createElement("div");
      e.className = "character-voice jp-character-container";
      desc = document.querySelector("#character-detail > div.content.character-detail").appendChild(e)
    }
    desc.appendChild(document.createElement("div"));
    desc.children[0].innerText = '"' + chr.desc[isKor ? 0 : 1].join("\n") + '"';
  } else {
    if (desc) {
      desc.remove();
    }
  }
  //ismmd
  if (isMMD()) {
    mmdInit(chr);
  } else {
    document.querySelector('#masthead').dataset.type = "img";
    addVoicePlayer(sIndex);
  }
  let btn = document.querySelector('.overlay#startButtonTop');
  br.onclick = function () {
    if (sIndex != chrData.chrs.length - 1) {
      if (btn) { btn.remove() };
      document.querySelector("#character-detail div div.content-title ul").remove();
      if (vc) { vc.remove(); }
      delete document.querySelector("#character-detail > div.content.character-detail").dataset.name;
      sIndex++;
      if (!chrData.chrs[sIndex].img) {
        if (t) { t.remove(); }
      }
      console.log("Button Event", "======== Character Changed ========")
      initChr(sIndex);
      if (btn && btn.dataset.isClicked == "true") {
        window.location.reload();
      }
      if (sIndex == chrData.chrs.length - 1) {
        br.onclick = () => {
          console.log("right button onPressed.");
          devmode.r++;
          if (devmode.r >= 5) {
            alert("disabled 2nd lock.");
            br.removeAttribute("onclick");
          };
        }
      }
    }
  };
  bl.onclick = function () {
    if (sIndex == 0) {
      bl.onclick = () => {
        console.log("left button onPressed.");
        devmode.l++;
        if (devmode.l >= 5) {
          alert("disabled 1st lock.");
          bl.removeAttribute("onclick");
        };
      };

    }
    if (sIndex > 0 && sIndex != 0) {
      if (btn && btn.dataset.isClicked == "true") {
        window.location.reload();
      } else {
        if (btn) { btn.remove() };
        document.querySelector("#character-detail div div.content-title ul").remove();

        if (vc) { vc.remove(); }
        delete document.querySelector("#character-detail > div.content.character-detail").dataset.name;
        if (t) { t.remove(); }
        console.log("Button Event", "======== Character Changed ========")
        sIndex--;
        if (!isMMD() && btn) {
          btn.remove();
        }
        initChr(sIndex)
      }
    }
  };
};

function initChr(sIndex, langN) {
  console.log("selected Index :", sIndex)
  appendChr();
  appendChrNameF(sIndex, !langN ? 0 : langN);
  let chrFn = null;
  console.log("init Chr Function module.")
  if (!chrFns) {
    throw Error("chrFns module is unmounted")
  } else {
    chrFn = function () {
      console.log("Chr Function :", "isMiku -> " + isMiku());
      console.log("Chr Function :", "isMMD -> " + isMMD());
      chrFns[chrData.chrs[sIndex].name[2].split(" ")[1]]();
    };
  }
  chrFn();

};

function onXhrLoadLog(xhr) {
  if (xhr.lengthComputable) {
    const percentComplete = xhr.loaded / xhr.total * 100;
    const precent = Math.round(percentComplete, 2);
    const reqName = xhr.target.responseURL;

    const fName = decodeURI(reqName.replace(/.*\/assets\/(models|music)?\/(.*)/gm, "$2"));
    const fNameLo = String(fName.toLowerCase());
    const fType = (fNameLo.includes('.pmx') | fNameLo.includes('.pmd')) ? "Character model" : (fNameLo.includes("camera") | fNameLo.includes("カメラ")) ? "Camera motion" : (fNameLo.includes('motion') | fNameLo.includes('.vmd') | fNameLo.includes('モーション')) ? "Model motion" : (fNameLo.includes('.mp3') | fNameLo.includes('.wav')) ? "Song" : "Unknown";

    console.log(fType + " -> " + fName + " is " + precent + '% downloaded');
  }
};

function displaySongInfo(db) {
  let b = document.getElementById("info");
  let sn = document.createElement("a");
  sn.id = 'songName';
  let sa = document.createElement("a");
  sa.id = 'songAuthor';
  let an = document.createElement("a");
  an.id = 'artistName';
  let sdn = document.createElement("a");
  sdn.id = 'songDancerName';
  let sdd = document.createElement("a");
  sdd.id = 'songDancerDress';
  let ma = document.createElement("a");
  ma.id = 'motionAuthor';
  let ca = document.createElement("a");
  ca.id = 'camAuthor';
  if (db) {
    sn.innerText = "SongName : " + db.songData.songname;
    b.appendChild(sn);
    if (db.songData.author) {
      sa.innerText = "Author : " + db.songData.author
      // sn.insertAdjacentElement('afterend',sa);
      b.appendChild(document.createElement("br"));
      b.appendChild(sa);
    }
    b.appendChild(document.createElement("br"));
    an.innerText = "Artist : " + (db.songData.artist ? db.songData.artist : "[Unknown Artist]");
    if (db.songData.tranner) {
      an.innerText += " (VocalTranned by " + db.songData.tranner + ")";
    }
    b.appendChild(an);
    b.appendChild(document.createElement("br"));
    sdn.innerText = "songDancer : " + db.mmd.chrName;
    b.appendChild(sdn);
    b.appendChild(document.createElement("br"));
    sdd.innerText = "Dress : " + db.mmd.chrDressName;
    b.appendChild(sdd);
    b.appendChild(document.createElement("br"));
    ma.innerText = "Motion : " + (db.mmd.vmdAuthor ? db.mmd.vmdAuthor : "[Unknown Author]");
    b.appendChild(ma);
    b.appendChild(document.createElement("br"));
    ca.innerText = "Camera : " + (db.mmd.camAuthor ? db.mmd.camAuthor : "[Unknown Author]");
    b.appendChild(ca);
  }
}

function getLastGitCommit() {
  let url = 'https://api.github.com/repos/jomin398/jomin398.github.io/branches/master';
  let req = new XMLHttpRequest();
  let res = null;
  function display(s){
    let commitText = '[Updateing.....]';
    let commitDate = new Date();
    let commitDateText = commitDate.toLocaleString();
    if(s){
      s = JSON.parse(s);
      commitText = s.commit.commit.message;
      commitDate = new Date(s.commit.commit.committer.date);
      commitDateText =  commitDate.toLocaleString();
      commitText += ' ('+commitDateText+')';
    }
    
    let tg = document.querySelector('#global-footer');
    let w = document.createElement('div');
    w.id = 'githubLastCommit';
    if (document.getElementById('githubLastCommit')) {
      document.getElementById('githubLastCommit').remove();
    }
    let text1 = document.createElement('spen');
    text1.innerText = 'Last Update : ';
    let text2 = document.createElement('spen');
    text2.innerText = commitText;
    w.append(text1, text2);
    tg.appendChild(w);
  }
  req.open('GET', url, true);
  req.onload = ()=> {
    res = req.responseText;
    display(res)
  }
  req.send(null);
}
//html init
window.onload = function () {
  if (isKor) {
    document.title = document.head.querySelector('meta[property="og:title"]').content;
  }
  devmode.l = 0; devmode.r = 0; devmode.on = true;
  showMein(5000);
  console.log("Charactor DB Count :", chrData.chrs.length)
  appendMenu(["character", "mmd"]);
  initChr(sIndex);
  headInit();
  getLastGitCommit();
  // getModuleVer();
};
