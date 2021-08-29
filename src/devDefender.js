const devmode = {
    l: 0, r: 0, Protection: true,
    json: null
}
function consoleTextArtPrint(str) {
    const css = ["font-family: 'Saitamaar', 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;", "font-size: 12px;", "line-height: 12px;", "width: 100%;"];
    console.log("%c%s", css.join(' '), (str ? str.join('\n') : null));
}
function devToolsOpened(e) {
    let m = !isKor ? DevModeOnMessage[0] : DevModeOnMessage[1];
    let m1 = !isKor ? DevModeOnMessage[2][0] : DevModeOnMessage[3][0];
    let m2 = !isKor ? DevModeOnMessage[2][1] : DevModeOnMessage[3][1];
    console.error(m.join("\n"));
    alert(m.join("\n"));
    if (devmode.l >= 5 && devmode.r >= 5) {
        devmode.Protection = false;
        alert(m1);
    };
    if (devmode.Protection) {
        alert(m2)
        setTimeout(() => {
            window.location.assign('http://www.example.com'); //auto redirect for Prevent Hack.
        }, 2000);
        // uncomment to prevent opening dev.tools:
        e.preventDefault();
    } else {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', './assets/aamz.json', true);
        xhr.onload = () => {
            devmode.json = JSON.parse(xhr.responseText);
            json = devmode.json;
            json.etc[0].d[2] = isKor ? json.text[0][0].join('\n') : json.text[1][0].join('\n');
            let textbox = json.etc[0].d;
            consoleTextArtPrint(json.miku[0].d.concat(null, json.miku[1].d, textbox));
        }
        xhr.send(null);
    }
}
function devDefender(e) {
    if (
        // CMD + Alt + I (Chrome, Firefox, Safari)
        e.metaKey == true && e.altKey == true && e.keyCode == 73 ||
        // CMD + Alt + J (Chrome)
        e.metaKey == true && e.altKey == true && e.keyCode == 74 ||
        // CMD + Alt + C (Chrome)
        e.metaKey == true && e.altKey == true && e.keyCode == 67 ||
        // CMD + Shift + C (Chrome)
        e.metaKey == true && e.shiftKey == true && e.keyCode == 67 ||
        // Ctrl + Shift + I (Chrome, Firefox, Safari, Edge)
        e.ctrlKey == true && e.shiftKey == true && e.keyCode == 73 ||
        // Ctrl + Shift + J (Chrome, Edge)
        e.ctrlKey == true && e.shiftKey == true && e.keyCode == 74 ||
        // Ctrl + Shift + C (Chrome, Edge)
        e.ctrlKey == true && e.shiftKey == true && e.keyCode == 67 ||
        // F12 (Chome, Firefox, Edge)
        e.keyCode == 123 ||
        // CMD + Alt + U, Ctrl + U (View source: Chrome, Firefox, Safari, Edge)
        e.metaKey == true && e.altKey == true && e.keyCode == 85 ||
        e.ctrlKey == true && e.keyCode == 85
    ) {
        devToolsOpened(e);
    }
}
window.addEventListener('keydown', (e) => devDefender(e));