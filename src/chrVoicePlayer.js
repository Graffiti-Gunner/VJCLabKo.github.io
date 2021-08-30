var SongDB = null;
var lyricsManager = null;
function mkSongtrack(filterlogic) {
  this.filter = (v) => v[1].notInSongList != true;
  if (filterlogic) {
    this.filter = filterlogic;
  }
  this.t = [];
  console.log("mkSongtrack : ", "init...");
  console.log("mkSongtrack : ", "cheack Lang iskor");
  console.log("mkSongtrack : ", "iskor : " + isKor);
  for (let value of Object.entries(chrData.songs)) {
    this.t.push(this.filter(value) ? value : null);
  }
  this.t = this.t.filter(e => e != null);
  let tDB = {};
  let list = this.t;
  tDB.dir = ["./assets/music/"];
  tDB.tdelay = 2;
  tDB.tdata = [];
  tDB.list = [];
  tDB.tranners = [];
  tDB.authors = [];
  tDB.vmds = [];
  tDB.vmdAuthors = [];
  tDB.cams = [];
  tDB.camAuthors = [];
  tDB.songDelays = [];
  tDB.motionDelays = [];
  tDB.artists = [];
  tDB.lyricsRootDir = './assets/lyrics';
  tDB.lyricsPaths = [];
  tDB.OverRideMultiLine = [];
  tDB.ikSetups = [];
  for (i in list) {
    let title = list[i][0];
    let song = list[i][1].song;
    let vtt = list[i][1].vocalTranner;
    let author = list[i][1].author;
    let vmd = list[i][1].vmd;
    let cam = list[i][1].cam;
    let func = list[i][1].songOnloadFunc;
    let songDelay = list[i][1].delayTime;
    let motionDelay = list[i][1].motionDelay;
    let artist = list[i][1].artist;
    let vmdAuthor = list[i][1].vmdAuthor;
    let camAuthor = list[i][1].camAuthor;
    let lyricsPath = list[i][1].lyricsPath;
    let OverRideMultiLine = list[i][1].OVRMultiLineSetup;
    let ikSetups = list[i][1].disableIK?list[i][1].disableIK:null;
    if (isKor && list[i][1].kor) {
      title = list[i][1].kor.title ? list[i][1].kor.title : title;
      song = list[i][1].kor.song ? list[i][1].kor.song : song;
      vtt = list[i][1].kor.vocalTranner ? list[i][1].kor.vocalTranner : vtt;
      author = list[i][1].kor.author ? list[i][1].kor.author : author;
      songDelay = list[i][1].kor.songDelay ? list[i][1].kor.songDelay : songDelay;
      artist = list[i][1].kor.artist ? list[i][1].kor.artist : artist;
      lyricsPath = list[i][1].kor.lyricsPath ? list[i][1].kor.lyricsPath : lyricsPath;
    }
    lyricsPath = lyricsPath ? tDB.lyricsRootDir + lyricsPath : null;
    func = func ? func : null;
    tDB.tdata.push(title);
    tDB.list.push(list[i][1].fname + song);
    tDB.tranners.push(vtt ? vtt : null);
    tDB.authors.push(author ? author : null);
    tDB.vmds.push(vmd);
    tDB.vmdAuthors.push(vmdAuthor ? vmdAuthor : null);
    tDB.camAuthors.push(camAuthor ? camAuthor : null);
    tDB.cams.push(cam);
    tDB.songDelays.push(songDelay ? songDelay : 0);
    tDB.motionDelays.push(motionDelay ? motionDelay : 0);
    tDB.artists.push(artist ? artist : null);
    tDB.lyricsPaths.push(lyricsPath);
    tDB.OverRideMultiLine.push(OverRideMultiLine ? OverRideMultiLine : null);
    tDB.ikSetups.push(ikSetups);
  }
  this.data = tDB;
  console.log("mkSongtrack : ", "done");
}
function LyricPlayFn() {
  let dom_audio = document.querySelector('audio#VPlayer');
  lyricsManager.play(dom_audio.currentTime * 1000);
}
function removelyric() {
  let dom_lyric = document.getElementById('lyrics');
  if (dom_lyric) {
    dom_lyric.remove();
  }
  let dom_audio = document.querySelector('audio#VPlayer');
  if (dom_audio) {
    dom_audio.removeEventListener('play', LyricPlayFn);
  }
};

function changeSongPlay(index, ismiku) {
  let bb = document.querySelector("#character-detail > div.content.character-detail > div.character-voice.jp-character-container > div:nth-child(4) > button.btn-voice.jp-playing");
  if (bb && bb.className.indexOf("jp-playing") != -1) {
    bb.classList.remove("jp-playing");
    bb.firstChild.className = "fas fa-play-circle";
  }
  //remove lyric;
  removelyric();
  changeSongLyric(index, ismiku)
};

function addVoiceList(t, DB) {
  var bb = document.querySelector("#character-detail > div.content.character-detail > div.character-voice.jp-character-container > button");
  if (bb) {
    bb.remove();
  }
  let ul = document.createElement('ul');
  let src = DB.dir;
  ul.setAttribute("id", "voicelist");
  ul.setAttribute("style", "display:none;");
  if (src[3]) {
    // for Lucy
    for (i = 0; i < src[3]; i++) {
      var li = document.createElement('li');
      var langp = !isKor ? "jp/lucy" : "ko/lucy";
      console.log(langp);
      li.innerHTML = "<a href='" + src[0] + "/" + (langp) + "_" + (src[1] + i) + src[2] + "'>" + i + "</a>";
      ul.appendChild(li);
    }
  } else {
    // for Miku or else.
    let p = document.querySelector('#VPlayer');
    if (p) {
      p.src = DB.dir + DB.list[0];
    }
    for (i = 0; i < DB.list.length; i++) {
      var li = document.createElement('li');
      li.innerHTML = "<a href='" + DB.dir + DB.list[i] + "'>" + i + "</a>";
      ul.appendChild(li);
    }
  }
  t.append(ul);
};
function changeSongLyric(index, ismiku) {
  //ismiku
  let lyricSetup = {
    isPlayer: true,
    isMiku: ismiku
  }
  removelyric();
  lyricInit(index, lyricSetup);
}
function loadLyricsFile(path, lyricSetup) {
  let req = new XMLHttpRequest();
  console.log("Load :", "Lyrics Loading....");
  try {
    req.open('GET', path, true);
    console.log(path);
    req.onload = () => {
      console.log("Load :", "Done!");
      renderingLrc(req.responseText, null, lyricSetup);
    };
    req.send(null);
  } catch (error) {
    return null;
  }
}

function lyricInit(selectIndex, lyricSetup) {
  removelyric();
  if (!lyricSetup) {
    lyricSetup = {
      isPlayer: true,
      isMiku: false
    }
  };
  //isLyrics Fileis exists?
  if (SongDB.lyricsPaths[selectIndex] != null) {
    lyricSetup.OverRideMultiLine = SongDB.OverRideMultiLine[selectIndex] != null ? true : false;
    loadLyricsFile(SongDB.lyricsPaths[selectIndex], lyricSetup);
  }
  //base.append()
};
function appendLyricDom(lyricSetup) {
  removelyric();
  let t = document.querySelector('#character-detail > div.content.character-detail');
  let lywEl = document.createElement('div');
  lywEl.id = 'lyrics';
  lywEl.style.position = 'absolute';
  if (!lyricSetup.fontWightLv) {
    lyricSetup.fontWightLv = 3;
  }
  if (!isMobile()) {
    lyricSetup.fontWightLv = 5;
  }
  switch (lyricSetup.fontWightLv) {
    case 0:
      break;
    case 1:
      //h4
      lywEl.style.fontSize = '1rem';
      break;
    case 2:
      //h3
      lywEl.style.fontSize = '1.17rem';
      break;
    case 3:
      lywEl.style.fontSize = '1.25rem';
      break;
    case 4:
      //h2
      lywEl.style.fontSize = '1.5rem';
      break;
    case 5:
      //h1
      lywEl.style.fontSize = '2rem';
      break;
  }
  t.appendChild(lywEl)
};

function renderingLrc(d, fn, lyricSetup) {

  let dom_audio = document.querySelector('audio#VPlayer');
  console.log("RenderingLyrics :", "init....");
  appendLyricDom(lyricSetup);
  let dom_lyric = document.querySelector('#lyrics');

  if (lyricSetup.isMiku) {
    dom_lyric.style.color = 'var(--miku-text-color)';
    dom_lyric.style.textShadow = 'var(--miku-text-shadow)';
  }
  let reg = /^\[[\d:.]*\](.*)$/gm;
  let treg = /\[([\d:.]*)\]/gm;
  let mat = [];
  let d2 = [];
  let prevT = '';
  lyricsManager = new Lyric({
    onPlay: function (line, text) {
      console.log(lrcLines[line].text + '\n' + (lrcLines[line].translation || ''));
      if (!isMobile()) {
        dom_lyric.style.fontSize = '2rem';
      } else {
        dom_lyric.style.fontSize = '1.25rem';
      }
      dom_lyric.innerHTML = text + '<br>' + (lrcLines[line].translation || '');
    },
    onSetLyric: function (lines) {
      lrcLines = lines;
      console.log(lines);
    },
    offset: 80
  })
  console.log(d);
  mat = d.match(reg);
  console.log(mat[0]);
  if (mat) {
    for (i in mat) {
      if (prevT != mat[i].match(treg)[0]) {
        prevT = mat[i].match(treg)[0];
        d2.push(mat[i])
      }
    }
    //console.log("test :",al.join('\n'));
    let trns = undefined;
    let l = mat.length;


    let isEven = (number) => ((number % 2) == 0) ? true : false;
    let x = Math.round(l * 0.25);
    // 1/4 == 홀수?
    let y = !isEven(x) ? x + 1 : x; //select point of 1/4 of song.
    let z = y + 1;
    let regTime = /\d{2}\:\d{2}\.\d{2,3}/g;
    isMultiLine = mat[y].match(regTime)[0] == mat[z].match(regTime)[0];
    if (lyricSetup.OverRideMultiLine) {
      isMultiLine = true;
    }
    console.log("check is MultiLine? :", isMultiLine);
    console.log("debugging the check :", {
      length: l,
      is_even: isEven(x),
      is_overriden: lyricSetup.OverRideMultiLine,
      '1/4 part Num': x,
      y: y,
      z: z,
      ab: ["A : " + mat[y], "B : " + mat[z]],

    });
    if (isMultiLine) {
      trns = d2.join('\n');
    }
    lyricsManager.setLyric(d, trns);
  } else {
    lyricsManager.setLyric(d);
  }
  console.log("RenderingLyrics :", "Ready!");
  if (fn) { fn() };
  dom_audio.addEventListener('play', LyricPlayFn);
  dom_audio.addEventListener("pause", function () {
    lyricsManager.pause();
  });
};

function addVoicePlayer(sindex) {
  console.log("chr Voice Module :", "init");
  var audio, playlist, tracks, current, playCount, DB, desc;
  function init(db, sindex) {
    let a = document.createElement("audio");
    a.id = 'VPlayer';
    a.preload = 'auto';
    a.tabIndex = 0;
    a.controls = false;
    a.controlsList = "nodownload";
    a.type = "audio/mpeg";
    a.src = "./assets/voice/Lucy/ko/lucy_0.mp3";
    desc = document.querySelector("#character-detail > div.content.character-detail > div.character-voice.jp-character-container");
    desc.style.flexDirection = 'column';
    desc.appendChild(a);
    audio = {};
    playlist = {};
    tracks = {};
    current = 0;
    playCount = 0;
    if (sindex == 0) { DB = db.chrs[sindex].tDB } else {
      DB = new mkSongtrack().data;
      SongDB = DB;
      console.log(DB);
      window.addEventListener('resize', () => {
        let dom_lyric = document.getElementById('lyrics');
        if (dom_lyric) {
          if (document.body.clientWidth >= 510) {
            dom_lyric.style.fontSize = '2rem';
          } else {
            dom_lyric.style.fontSize = '1.5rem';
          }
        }
      })
    }
  };

  function reflash(audioList, display, isMiku) {
    playlist = $(audioList);
    current = 0;
    playCount = 0;
    link = playlist.find('a')[0];
    audio[0].src = $(link).attr('href')
    chrDisplay(display, isMiku);
    changeSongPlay();
    console.log("chr Voice Module :", "reseted");
  };

  function chrDisplay(display, ismiku) {
    //init data;
    let sayBox = $(display);
    let delay = 2;
    if (DB.tdelay.length > 1) {
      delay = DB.tdelay[playCount];
    }
    let text = '';
    if (!ismiku) {
      console.log("tindex: " + playCount + " | tdelay : " + delay);
      if (delay >= 2) {
        for (let i = 0; i < delay - 1; i++) {
          text = (DB.tdata[playCount]);
          playCount++;
        }
      }
      //prints
      text = ((text == '') ? (DB.tdata[playCount]) : text + "<br/>" + DB.tdata[playCount]);
      sayBox.html(text);
      playCount++;
    } else {
      console.log("tindex: " + playCount);
      let songName = DB.tdata[playCount];
      let tranner = DB.tranners[playCount];
      let OrigAuthor = DB.authors[playCount];
      let titlePref = (!isKor ? "SongName : " : "노래 제목 : ");
      let trannerPref = null;

      if (songName == "金曜日のおはよう") {
        trannerPref = !isKor ? "singer : " : "보컬 : ";
      } else {
        trannerPref = !isKor ? "VocalTrained by " : "조교 : ";
      };
      authorPref = (!isKor ? "Orignal Author : " : "원곡/작곡 : ");
      text = [
        titlePref + songName,
        trannerPref + tranner,
        authorPref + OrigAuthor
      ].join("\n");
      document.querySelector(display).innerText = text;
    }
  };

  function Vinit(audioPlayer, audioList, scriptF, display, isMiku) {
    current = 0;
    audio = $(audioPlayer);
    playlist = $(audioList);
    tracks = playlist.find('li a');
    len = tracks.length;
    audio[0].volume = 1;
    console.log(document.querySelector(display).parentElement.parentElement);
    scriptF(display, isMiku);
    if (!isMiku) {
      audio[0].addEventListener('ended', function (e) {
        current++;
        if (current == len) {
          reflash(audioList, display, isMiku);
          // link = playlist.find('a')[0];
        } else {
          link = playlist.find('a')[current];
          scriptF(display, isMiku);
          run($(link), audio[0]);
        }
      });
    } else {
      audio[0].controls = true;
      let b2 = document.querySelector('#character-detail > div.content.character-detail > div.character-voice.jp-character-container > div:nth-child(4) > button.btn.next');
      let b1 = document.querySelector('#character-detail > div.content.character-detail > div.character-voice.jp-character-container > div:nth-child(4) > button.btn.prev');


      if (playCount == 0) {
        b1.style.opacity = 0.6;
      }

      b2.addEventListener('click', () => {
        if (playCount != len - 1) {
          playCount++;

          link = playlist.find('a')[playCount];
          audio[0].src = $(link).attr('href');
          audio[0].load();
          scriptF(display, isMiku);
          if (playCount == len - 1) {
            b1.removeAttribute("style")
            b2.style.opacity = 0.6;
          }
          changeSongPlay(playCount, isMiku);
        }
      })
      b1.addEventListener('click', () => {
        if (playCount != 0) {
          playCount--;

          link = playlist.find('a')[playCount];
          audio[0].src = $(link).attr('href');
          audio[0].load();
          scriptF(display, isMiku);
          if (playCount == 0) {
            b2.removeAttribute("style")
            b1.style.opacity = 0.6;
          }
          changeSongPlay(playCount, isMiku);
        }
      })
      changeSongLyric(playCount, isMiku);
      audio[0].addEventListener('ended', function (e) {
        changeSongPlay(playCount);
      });
      console.log(playCount)
    }
  };

  function run(link, player) {
    player.src = link.attr('href');
    audio[0].load();
    audio[0].play();
  };
  function listNoti(text) {
    let b = document.querySelector("#character-detail > div.content.character-detail > div.character-voice.jp-character-container");
    let e = document.createElement('div');
    e.className = 'balloon';
    e.id = 'infoNoti';
    e.appendChild(document.createTextNode(text));
    b.append(e);
    setTimeout(() => {
      b.querySelector('#infoNoti').remove();
    }, 4000);
  }
  function genBtn(t) {
    let btn = document.createElement("button");
    let myAudio = document.querySelector('#VPlayer');
    btn.className = "btn-voice";
    btn.onclick = function () {
      if (btn.dataset.init == "true") {
        bb = document.querySelector("#character-detail > div.content.character-detail > div.character-voice.jp-character-container > button");
        if (!bb) {
          bb = document.querySelector("#character-detail > div.content.character-detail > div.character-voice.jp-character-container > div:nth-child(4) > button.btn-voice");
        }
        bb.className += " jp-playing";
        if (myAudio.paused && myAudio.currentTime >= 0 && !myAudio.started) {
          myAudio.play();
          bb.firstChild.className = "fas fa-pause-circle";
          console.log("chr Voice Module :", "playing...");
        } else {
          if (lyricsManager) {
            lyricsManager.pause();
          }
          myAudio.pause();
          bb.classList.remove("jp-playing");
          bb.firstChild.className = "fas fa-play-circle";
        }
      } else if (!btn.dataset.init) {

        btn.dataset.init = true;
        if (!isMiku()) {
          Vinit('#VPlayer', '#voicelist', chrDisplay, '#character-detail > div.content.character-detail > div.character-voice.jp-character-container > div', false);
        } else {
          let songLength = DB.list.length - 1;
          let text = null;
          if (!isKor) { text = "More " + songLength + " songs are Listenable." } else {
            text = songLength + "곡 더 들어볼수 있어요!"
          }
          listNoti(text);
          Vinit('#VPlayer', '#voicelist', chrDisplay, '#character-detail > div.content.character-detail > div.character-voice.jp-character-container > div', true);
        }
      }
    }

    let tn = null;
    tn = document.createTextNode(isKor ? '샘플 보이스 재생' : "Play Voice");

    console.log(t.parentElement)
    if (sindex != 0) {
      tn = document.createTextNode(isKor ? '샘플 노래 재생' : "Play Song");
      let buttons = document.createElement('div');
      buttons.style.display = 'flex';
      let btn1 = document.createElement('button');
      btn1.className += "btn prev";
      btn1.style.opacity = 0.6;
      let icon1 = document.createElement("i");
      icon1.className = "fas fa-chevron-left";
      btn1.append(icon1)

      let btn2 = document.createElement('button');
      btn2.className += "btn next";
      let icon2 = document.createElement("i");
      icon2.className = "fas fa-chevron-right";
      btn2.append(icon2)

      buttons.append(btn1, btn, btn2);
      t.append(buttons)
    } else {

      t.append(btn);
    }
    let icon = document.createElement("i");
    icon.className = "fas fa-play-circle";
    btn.append(icon, tn);
  };

  if (chrData.chrs[sindex].tDB || chrData.songs) {
    init(chrData, sindex);
    addVoiceList(desc, DB);
    genBtn(desc);
  }

}
