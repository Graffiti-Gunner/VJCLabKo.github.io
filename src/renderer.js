const rendererSetup = {
    songData: {},
    mmd: {},
    // songName: null,
    // songPath: null,
    // chrModel: null,
    // chrDressName: null,
    // vmdPath: null,
    // camPath: null,
    // chrOffset: null,
    // songDelay: null,
    // motionDelay: null,
};
function genRendererSetup(db, i) {
    rendererSetup.songData = {};
    rendererSetup.mmd = {};
    console.log(db);
    let songname = db.tdata[i];
    console.log("song : " + songname);
    console.log("index :", i);
    let locChrData = LocChrLoad();
    if (!locChrData) {
        LocChrSave(chrData.chrs[2]);
        locChrData = LocChrLoad();
    }
    let chrDrass = locChrData.mmd.dress;
    let modelPath = chrDrass.foName + chrDrass.mmdFilename;
    // rendererSetup.chrModel = modelPath;
    // rendererSetup.songPath = db.dir[0] + db.list[i];
    // rendererSetup.vmdPath = db.dir[0] + db.list[i].split("/")[0] + db.vmds[i];
    // rendererSetup.camPath = db.dir[0] + db.list[i].split("/")[0] + db.cams[i];
    // rendererSetup.chrOffset = locChrData.mmd.dress.chrOffset ? chr.mmd.dress.chrOffset : null;
    // rendererSetup.songDelay = db.songDelays[i];
    // rendererSetup.motionDelay = db.motionDelays[i];
    // rendererSetup.chrDressName = locChrData.mmd.dress.name;

    //mmd
    rendererSetup.mmd.chrModel = modelPath;
    rendererSetup.mmd.vmdPath = db.dir[0] + db.list[i].split("/")[0] + db.vmds[i];
    rendererSetup.mmd.camPath = db.dir[0] + db.list[i].split("/")[0] + db.cams[i];
    rendererSetup.mmd.vmdAuthor = db.vmdAuthors[i];
    rendererSetup.mmd.camAuthor = db.camAuthors[i];
    rendererSetup.mmd.chrOffset = locChrData.mmd.dress.chrOffset ? chr.mmd.dress.chrOffset : null;
    rendererSetup.mmd.songDelay = db.songDelays[i];
    rendererSetup.mmd.motionDelay = db.motionDelays[i] ? db.motionDelays[i] : 0;
    rendererSetup.mmd.chrDressName = locChrData.mmd.dress.name;
    rendererSetup.mmd.chrName = locChrData.name[1];
    rendererSetup.mmd.stage = null;
    rendererSetup.mmd.ikSetup = db.ikSetups[i]?db.ikSetups[i]:false;
    //song
    rendererSetup.songData.songPath = db.dir[0] + db.list[i];
    rendererSetup.songData.songname = db.tdata[i];
    if (db.tranners[i]) {
        rendererSetup.songData.tranner = db.tranners[i];
    }
    rendererSetup.songData.author = db.authors[i];
    rendererSetup.songData.artist = db.artists[i];
    if (rendererSetup.songData.songPath.includes('Ray')) {
        rendererSetup.songData.cFN = function () {
            guiChr.ik = false;
            helper.enable('ik', false);
            guiMenuChanged();
        }
    }
}

const rendererInit = function () {
    let chr = LocChrLoad();

    //genarate db with filtered not existing vmd file of each songs.
    let db = new mkSongtrack((v) => { return v[1].vmd != null }).data;
    //select default song.
    genRendererSetup(db, 0);
    // init Select;
    let songlist = db.tdata;

    let songSelectWraper = document.createElement("select");
    songSelectWraper.id = "songs";
    for (let i in songlist) {
        let choices = document.createElement("option");
        choices.id = i;
        choices.innerText = songlist[i];
        if (i == 0) {
            choices.setAttribute('selected', 'selected');
        }
        songSelectWraper.appendChild(choices);
    }
    let setup = document.getElementById("setup");
    setup.style.display = "block";
    setup.style.padding = "10% 0";

    let bt = document.createElement('button');
    bt.id = 'startButton';
    bt.style.marginRight = '10px';
    bt.innerText = Textlocal.mmdShowConfirm[0][(!isKor ? 0 : 1)];
    bt.onclick = () => {
        let d = document.querySelector("#setup select#songs");
        let i = d.selectedIndex;
        genRendererSetup(db, i);
        console.log("final chosen Character:", LocChrLoad());

        d = document.querySelector("#setup select#stageSl");
        v = d.options[d.selectedIndex].value;
        if (d.selectedIndex != 0) {
            console.log(chrData.stages[d.selectedIndex]);
            rendererSetup.mmd.stage = {};
            rendererSetup.mmd.stage.name = chrData.stages[d.selectedIndex - 1].name;
            rendererSetup.mmd.stage.author = (chrData.stages[d.selectedIndex - 1].author ? chrData.stages[d.selectedIndex - 1].author : "[Unknown Author]");
            rendererSetup.mmd.stage.path = chrData.stages[d.selectedIndex - 1].path;
            rendererSetup.mmd.stage.pos = chrData.stages[d.selectedIndex - 1].pos;
            console.log(v);
        }
        document.getElementById("setup").remove();
        console.log("final rendererSetup:", rendererSetup);
        console.log("songParam:", rendererSetup.songData);

        let cFN = null;
        window.readyComp(rendererSetup, true, cFN ? cFN : undefined);
    }
    let stageSl = document.createElement('select');
    stageSl.name = 'stages';
    stageSl.id = 'stageSl';
    stageFiles = Array.from(chrData.stages, x => x.path);
    let sli = document.createElement('option');
    sli.value = null;
    sli.appendChild(document.createTextNode('none'));
    sli.selected = true;
    stageSl.appendChild(sli);
    for (i in stageFiles) {
        let reg = /.*\/([^\\\/]+)\/.*/gm;
        sli = document.createElement('option');
        sli.value = stageFiles[i];
        sli.appendChild(document.createTextNode(stageFiles[i].replace(reg, "$1")))
        stageSl.appendChild(sli)
    }
    let goback = document.createElement('button');
    goback.id = 'returnButton';
    goback.style.marginLeft = '10px';
    goback.innerText = Textlocal.mmdShowConfirm[1][(!isKor ? 0 : 1)];
    goback.onclick = () => {
        location.reload();
    }
    setup.append(document.createElement("label").innerText = "Choose a song : ",
        songSelectWraper,
        document.createElement('br'),
        document.createElement("label").innerText = "Choose a stage : ",
        stageSl,
        document.createElement('br'),
        bt, goback);
}
