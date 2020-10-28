function getnowTime(){
    return moment(new Date()).format('오늘은 YYYY년 M월 D일 a h시 m분 s초  입니다.');
}

setInterval(function(){
    if(window.loaded){document.querySelector("#masthead-content .time").innerHTML = getnowTime();}
},1000);
