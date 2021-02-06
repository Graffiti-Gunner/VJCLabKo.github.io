var debugMode = false;
var gdDlLink = {
    /**
    * 구글 드라이브 링크를 변환 해주는 기능입니다.
    * @author jomin398
    * @method trans 구글 드라이브 링크를 다이렉트 다운로드 링크로.
    * @method untrans trans 된 링크를 되돌리기.
    * 다이렉트
        > 원본 링크의 데이터파일을 바로 열어준다.
        > 응답의 값은 xml 형식이 아닐수도있고 바이너리일수있다.
        > untrans 메소드를 실행해 원본 링크를 반환해 파일정보를 가져와야된다.
    */
    trans: function(url) {
        /** 구글 드라이브 링크를 다이렉트 다운로드 링크로
        */
        let preUrl1 = "https://drive.google.com/uc?export=download&id=";
        let preUrl2 = "https://docs.google.com/document/d/";
        let preUrlend = "/export?format=txt";
        let FileID = url.split("/d/")[1].split("/")[0];
        //다이렉트가 아니면
        if(url.search("document") == -1) {
            /* 만약 Url이 text 문서가 아닐때*/
            return preUrl1 + FileID;
        } else {
            /* 만약 Url이 text일때 */
            return preUrl2 + FileID + preUrlend;
        }
    },
    isMatchtype:function(ourl,str){
            return Boolean(ourl.match(reg1).toString().replace(reg1, "$1") == str);
    },
    untrans: function(ourl) {
        let reg1 = /https:\/\/(docs|drive)/gm;
        let res = null;
        if(!ourl) {
            if(this.isMatchtype(ourl,"drive")) {
                let filter = "uc?export=download&id=";
                res = ourl.split(filter)[0] + "file/d/" + ourl.split(filter)[1];
            } else if(this.isMatchtype(ourl,"docs")) {
                res = ourl.replace("export?format=txt", "edit?usp=drivesdk");
            }
        }
        return res;
    }
}
function infodownloader(url,headers,outType){
/**
 * 링크를 다운해주는 기능입니다.
 * @author jomin398
 * @param {string} url https google drive....
 * @param {Object[]} headers http protocol headers
 * @param {string} outType set output type
 * @returns A Promise for the completion of the callback.
 */
let furl = (!debugMode)?url:'https://cors-anywhere.herokuapp.com/' +url;
if(!headers){
    headers = {"headers":{"X-Requested-With": "XMLHttpRequest"}};}
    let promiss = fetch(furl,headers);
    //let promiss = fetch(url,headers);
if(outType == 'json'){
    promiss = promiss.then(res=> {
        console.log(res)
        return res.text();
      })
      .then(res=> {
        let data = JSON.parse(res);
        console.log(data);
        return data;
        })
}else{
    promiss = fetch(furl,headers).then(res=> {
        console.log(res)
        return res.text();
      });
}
return promiss;
};
var DLM = {dl:infodownloader,gdMgr:gdDlLink};