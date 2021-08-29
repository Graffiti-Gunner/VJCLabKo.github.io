var setGUIFUNC = null;

function initMiku() {
  let thisChr = chrData.chrs[sIndex];
  let h = document.querySelector("#Topnav > ul > li:nth-child(1) > a.mein_text");
  if (!h.innerText) {
    h.removeAttribute("style");
    h.children[0].remove();
    h.append(document.createTextNode("初音ミク"))
  }
  let n1 = document.getElementById("chrName");
  n1.innerHTML += " (<span id='jpname'>" + chrData.chrs[sIndex].name[1] + "</span>)";

  let dn = document.createElement('li');
  if (thisChr.mmd) {
    dn.appendChild(document.createTextNode(("Dress No." + thisChr.mmd.dress.no) + " (" + thisChr.mmd.dress.name + ")"));
    console.log(thisChr)
    document.querySelector("#character-detail > div.content.character-detail > div > ul").appendChild(dn);
  };
  document.querySelector("#banners").style.background = "#009090";
  console.log("미쿠에요!");
  //setGUIFUNC = () => document.querySelector('body > div.dg.ac > div > ul > li').style.borderLeft= "3px solid #30bea6";
}
const chrFns = {
  Lucy: function () {
    let n = document.getElementById("EnName");
    n.style.fontFamily = "Dancing Script";
    n.style.fontSize = "1.5rem";
    n.parentElement.children[0].style.textShadow = '3px 3px 5px #d1d5fa';
    n.style.textShadow = '3px 3px 5px #d1d5fa';
    document.querySelector("#banners").style.background = "#e3d2e4";

    // <audio id="VPlayer" preload="auto" tabindex="0" controls="" type="audio/mpeg"
    //                 src="./assets/sound/chr_Lucy/ko/lucy0931_kr.mp3">
    //                 Sorry, your browser does not support HTML5 audio.
    //             </audio>
    console.log("루시에요!")
  },
  Miku: initMiku
}