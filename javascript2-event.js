// EX 4-서로 다른 기능의 여러 버튼을 가진 화면에서 이벤트를 처리하는 방법
window.addEventListener("load", function() {

    var section = document.querySelector("#section4");
    var noticeList = section.querySelector(".notice-list");
    var tbody = section.querySelector(".notice-list tbody");

    var selButton = section.querySelectorAll("sel-button");
    var editButton = section.querySelectorAll("edit-button");
    var delButton = section.querySelectorAll("del-button");

    tbody.onclick = function(e) {

        // 이벤트가 발생하는 특정 노드가 가지고 있는 기본 행위를 차단하겠다는 함수
        // ex) 'a' 태그에서 페이지가 reload되는 현상을 막음
        e.preventDefault();

        var target = e.target;

        if(target.nodeName != "A") return;

        //document.body.classList.contains
        if(target.classList.contains("sel-button")) {
            var tr = target.parentElement;
            for(; tr.nodeName != "TR"; tr=tr.parentElement);
            tr.style.background = "yellow";
        } else if(target.classList.contains("edit-button")) {

        } else if(target.classList.contains("del-button")) {

        } else {
        
        };

    };

});


// Ex 3-이벤트 버블링 멈추기
window.addEventListener("load", function() { 

    var section = document.querySelector("#section3");

    var imgList = section.querySelector(".img-list");
    var currentImg = section.querySelector(".current-img");
    var addButton = section.querySelector(".add-button");

    // Bubbling으로 인해 "추가" 버튼을 클릭해도 해당 이벤트까지 같이 실행되는 문제가 발생함
    imgList.onclick = function(e) {
        console.log("imgList.onclick");
        if(e.target.nodeName != "IMG") return;

        currentImg.src = e.target.src;
    };

    addButton.onclick = function(e) {
        // 상위 노드로 해당 이벤트까지 전달되는 현상을 막음
        e.stopPropagation();

        console.log("addButton.onclick");
        var img = document.createElement("img");
        img.src = "./images/img1.jpg";
        currentImg.insertAdjacentElement("afterend", img);
    };

});

// 연습문제 1-선택된 레코드 삭제하기:event target
window.addEventListener("load", function() {

    var section = document.querySelector("#section2-1");
    //delButtons = section.querySelectorAll(".del-button");
    var noticeList = section.querySelector(".notice-list");

    noticeList.onclick = function(e) {
        if(e.target.nodeName != "INPUT") return;
        e.target.parentElement.parentElement.remove();
    };
});


// Ex 2-버블링을 이용한 사용자 이벤트 처리하기
window.addEventListener("load", function() { 

    var section = document.querySelector("#section2");

    var imgList = section.querySelector(".img-list");
    var currentImg = section.querySelector(".current-img");

    imgList.onclick = function(e) {
        // whitespace를 클릭하는 경우에 이벤트 방지
        if(e.target.nodeName != "IMG") return;

        currentImg.src = e.target.src;
    };

});

// 연습문제 1-선택된 레코드 삭제하기:event target
window.addEventListener("load", function() {

    var section = document.querySelector("#section1-1");
    var delButtons = section.querySelectorAll(".del-button");

    for(var i=0; i<delButtons.length; i++) {
        delButtons[i].onclick = function(e) {
            e.target.parentElement.parentElement.remove();
        };
    }
});

// Ex 1-선택된 이미지 보여주기:event target
window.addEventListener("load", function() { 

    var section = document.querySelector("#section1");

    var imgs = section.querySelectorAll(".img");
    var currentImg = section.querySelector(".current-img");

    // 똑같은 객체를 imgs객체만큼 반복하여 생성하기 때문에 올바른 코딩이 아님
    for(var i=0; i<imgs.length; i++) {
        imgs[i].onclick = function(e) {
            currentImg.src = e.target.src;
        };
    }

});