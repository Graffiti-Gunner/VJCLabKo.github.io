// save Chr to localStorage for mmd motion page;
function LocChrSave(chr) {
    if (localStorage.chr) {
        localStorage.removeItem("chr");
    }
    localStorage.chr = JSON.stringify(chr);
    console.log("LocChr:", "Changed =>" + localStorage.chr)
}

function LocChrLoad() {
    let r = null;
    if(localStorage.chr){
        r =JSON.parse(localStorage.chr);
    }
    return r;
}

function mmdInit(chr) {
    console.log("mmdLoader :", "init......");
    let chrDress = chr.mmd.dress;
    let mmdPath = chrDress.foName + chrDress.mmdFilename;

    document.querySelector('#masthead').dataset.type = "mmd";
    let bw = document.createElement('div');
    bw.className = 'overlay';
    bw.id = 'startButtonTop';
    let bt = document.createElement('button');
    bt.id = 'startButton';
    bt.innerText = 'Show?';
    bw.append(bt);
    document.querySelector("#character-detail > div.content.character-detail").append(bw);

    //.querySelector('.overlay#startButtonTop');
    // bw.style.removeProperty('display');
    document.getElementById("startButtonTop").onclick = () => {
        document.getElementById("global-footer").style.display = "none";
        LocChrSave(chr);
        document.getElementById("startButtonTop").dataset.isClicked = true;
        document.querySelector('.overlay#startButtonTop').style.display = "none";
        readyComp(mmdPath, true, (setGUIFUNC ? setGUIFUNC : undefined));
    }
}