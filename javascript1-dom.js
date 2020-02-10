// Ex10-클릭한 컬럼을 기준으로 레코드 정렬하기 #1
window.addEventListener("load", function() {

    var notices = [
        {"id":1, "title":"유투브에 끌려다니지 않으려고 했는데....ㅜㅜ..", "regDate":"2019-02-05", "writerId":"newlec", "hit":2}
      , {"id":2, "title":"자바스크립트란..", "regDate":"2019-02-02", "writerId":"newlec", "hit":0}
      , {"id":3, "title":"기본기가 튼튼해야....", "regDate":"2019-02-01", "writerId":"newlec", "hit":1}
      , {"id":4, "title":"근데 조회수가 ㅜㅜ..", "regDate":"2019-01-25", "writerId":"newlec", "hit":0}
    ];

    var section = document.querySelector("#section10");
    var notice = section.querySelectorAll(".notice-list");
    var tbodyNode = section.querySelector("tbody");
    var titldTd = section.querySelector(".title");

    var bindData = function() {

        var template = section.querySelector("template");

        for ( i = 0; i < notices.length; i++) {
            var cloneNode = document.importNode(template.content, true);
            var tds = cloneNode.querySelectorAll("td");

            tds[0].textContent = notices[i].id;
            //tds[1].innerHTML = '<a href="'+notice[0].id+'">'+ notice[0].title;

            var aNode = tds[1].children[0];
            aNode.href=notices[i].id;
            aNode.textContent = notices[i].title;

            tds[2].textContent = notices[i].regDate;
            tds[3].textContent = notices[i].writerId;
            tds[4].textContent = notices[i].hit;        

            tbodyNode.appendChild(cloneNode);
        }        
    };

    bindData();

    var titleSorted = false;

    titldTd.onclick = function() {

        // 기존값을 모두 삭제
        tbodyNode.innerHTML = "";

        if(!titleSorted) {
            titleSorted = true;
            notices.sort(function(a, b) {
                if(a.title < b.title) 
                    return -1;
                else if(a.title > b.title) 
                    return 1;
                else 
                    return 0;
            });
        } else {
            notices.reverse();
        }
        bindData();
    };

});

// Ex9-다중 노드선택 방법과 일괄삭제, 노드의 자리바꾸기
window.addEventListener("load", function() {

    var section = document.querySelector("#section9");
    var noticeList = section.querySelectorAll(".notice-list");
    var delButton = section.querySelector(".del-button");
    var swapButton = section.querySelector(".swap-button");
    var tbodyNode = section.querySelector("tbody");
    var allCheckbox = section.querySelector(".overall-checkbox");

    allCheckbox.onchange = function() {
        var inputs = tbodyNode.querySelectorAll("input[type='checkbox']");
        for(var i=0; i < inputs.length; i++) {
            inputs[i].checked = allCheckbox.checked;
        }
    };

    delButton.onclick = function() {
        // pseudo-class 사용하여 checked된 항목만 가져옴
        var inputs = tbodyNode.querySelectorAll("input[type='checkbox']:checked");

        for(var i=0; i<inputs.length; i++)
            inputs[i].parentElement.parentElement.remove();
    };

    swapButton.onclick = function() {

        var inputs = tbodyNode.querySelectorAll("input[type='checkbox']:checked");

        if(inputs.length != 2) {
            alert("2개만 선택해야 합니다.");
            return;
        }

        var trs = [];
        // 선택된 2개 checkbox의 부모의 부모인 'tr'을 trs배열에 담음
        for(var i=0; i<inputs.length; i++) {
            trs.push(inputs[i].parentElement.parentElement);
        }
        // 첫번째 'tr' 항목의 내용을 모두 복제함
        var cloneNode = trs[0].cloneNode(true);
        trs[1].replaceWith(cloneNode);
        trs[0].replaceWith(trs[1]);

    };    

});

// Ex8-노드 삽입과 바꾸기
window.addEventListener("load", function() {

    var section = document.querySelector("#section8");
    var upButton = section.querySelector(".up-button");
    var downButton = section.querySelector(".down-button");
    var noticeList = section.querySelectorAll(".notice-list");
    var tbodyNode = section.querySelector("tbody");

    var currentNode = tbodyNode.firstElementChild;  //.children[0];

    
    downButton.onclick = function() {
        var nextNode = currentNode.nextElementSibling;

        if(nextNode == null) {
            alert("No more go down!");
            return;
        }
        // tbodyNode.removeChild(nextNode);
        // tbodyNode.insertBefore(nextNode, currentNode);
        currentNode.insertAdjacentElement("beforebegin", nextNode);
    };

    upButton.onclick = function() {

        var prevNode = currentNode.previousElementSibling;

        if(prevNode == null) {
            alert("No more go up-!");
            return;
        }
        //tbodyNode.removeChild(currentNode);
        //tbodyNode.insertBefore(currentNode, prevNode);
        currentNode.insertAdjacentElement("afterend", prevNode);
    };    

});

// Ex7-노드 복제와 템플릿 태그
window.addEventListener("load", function() {

    var notice = [
        {id:5, title:"퐈이야~~~~", regDate:"2019-02-11", writerId:"kimme5", hit:"10"}
      , {id:6, title:"나 좀 복제해줘~", regDate:"2019-02-11", writerId:"newlec", hit:"0"}
    ];

    var section = document.querySelector("#section7");
    var colneButton = section.querySelector(".clone-button");
    var templButton = section.querySelector(".template-button");
    var noticeList = section.querySelector(".notice-list");
    var tbodyNode = noticeList.querySelector("tbody");
    
    colneButton.onclick = function(){
        
        for ( i = 0; i < notice.length; i++) {
            // tbody노드 아래 첫번째 tr노드만 가져옴
            var trNode = tbodyNode.querySelector("tbody tr");
            // cloneNode: true - 하위 노드 모두 포함하여 복제함
            var cloneNode = trNode.cloneNode(true);
            var tds = cloneNode.querySelectorAll("td");

            tds[0].textContent = notice[i].id;
            //tds[1].innerHTML = '<a href="'+notice[0].id+'">'+ notice[0].title;

            var aNode = tds[1].children[0];
            aNode.href=notice[i].id;
            aNode.textContent = notice[i].title;

            tds[2].textContent = notice[i].regDate;
            tds[3].textContent = notice[i].writerId;
            tds[4].textContent = notice[i].hit;        

            //tbodyNode.appendChild(cloneNode);
            tbodyNode.append(cloneNode);
        }        

    };

    templButton.onclick = function(){
        var template = section.querySelector("template");
        var cloneNode = document.importNode(template.content, true);
        var tds = cloneNode.querySelectorAll("td");

        tds[0].textContent = notice[0].id;
        tds[1].innerHTML = '<a href="'+notice[0].id+'">'+ notice[0].title;
        tds[2].textContent = notice[0].regDate;
        tds[3].textContent = notice[0].writerId;
        tds[4].textContent = notice[0].hit;        

        tbodyNode.append(cloneNode);        
    };    

});

// Ex6-노드조작 : 메뉴추가(createTextNode, Element)
window.addEventListener("load", function() {
    var section = document.querySelector("#section6");
    var titleInput = section.querySelector(".title-input");
    var addButton = section.querySelector(".add-button");
    var delButton = section.querySelector(".del-button");
    var menuListUl = section.querySelector(".menu-list");

    addButton.onclick = function() {

        var title = titleInput.value;

        // ES5 Version
        // 기존의 객체에 새로운 객체를 생성하여 새로운 객체로 추가하는 형태로 메모리 관리에 부하를 줄 수 있음
        //menuListUl.innerHTML += '<li><a href="">' + title + '</a></li>';
        
        var html = '<a href="">' + title + '</a>';
        var li = document.createElement("li");
        li.innerHTML = html;
        
        //menuListUl.appendChild(li);
        menuListUl.append(li);

        // createNode를 통해 node로 생성하기 이전의 문자열이기 때문에 에러 발생함
        // menuListUl.appendChilde(title);    

        // append : 노드로 생성되기 이전의 문자열도 자동으로 노드로 변환하여 추가함
        //menuListUl.append(title);

        /* ElementNode객체 생성&추가 */
        // var title = titleInput.value;
        // var txtNode = document.createTextNode(title);
        // var aNode = document.createElement("a");

        // aNode.href = "";
        // aNode.appendChild(txtNode);

        // var liNode = document.createElement("li");
        // liNode.appendChild(aNode);
        
        // menuListUl.appendChild(liNode);

        /* TextNode객체 생성&추가 */
        // var title = titleInput.value;
        // var txtNode = document.createTextNode(title);
        // menuListDiv.appendChild(txtNode);
    };

    delButton.onclick = function() {
        //var txtNode = menuListUl.childNodes[0];
        //menuListUl.removeChild(txtNode);
        
        var liNode = menuListUl.children[0];
        //menuListUl.removeChild(liNode);
        liNode.remove();
    }; 

});

// Ex5 : element 노드의 속성 & CSS 속성 변경
window.addEventListener("load", function() {
    var section = document.querySelector("#section5");
    var srcInput = section.querySelector(".src-input");
    var imgSelect = section.querySelector(".img-select");
    var changeButton = section.querySelector(".change-button");
    var img = section.querySelector(".img");
    var colorInput = section.querySelector(".color-input");

    changeButton.onclick = function(){
        img.src = "./images/" + srcInput.value;
        //img.src = "./images/" + imgSelect.value;
        
        //img.style.border-color=?; --> 할 수 없음
        //img.style["border-color"] = colorInput.value;
        img.style.borderColor = colorInput.value;

        console.log(img.className);

    };

});

// Ex4 : childNodes를 이용한 노드 선택
window.addEventListener("load", function() {
    var section4 = document.querySelector("#section4");
    var box = section4.querySelector(".box");
    

    // children은 tag 속성의 노드만을 자식으로 인식함
    var input1 = box.children[0];
    var input2 = box.children[1];
    
    /* 1st test : #text 역시 'div' 노드내의 childnode이므로, whitespace가 0번째 위치에 나오는 에러 발생
    var input1 = box.childNodes[0];
    var input2 = box.childNodes[1];
    */
    input1.value = "Hello";
    input2.value = "OKay";

});

// Ex3 : Selectors API Level1
window.addEventListener("load", function() {
    var section3 = document.getElementById("section3");
    
    /* 1st - class 속성을 통해 값을 얻어옴
    var txtX = section3.querySelector(".txt-x");
    var txtY = section3.querySelector(".txt-y");
    var btnAdd = section3.querySelector(".btn-add");
    var txtSum = section3.querySelector(".txt-sum");
    */
    
    // 2nd - name 속성을 통해 값을 얻어옴
    var txtX = section3.querySelector("input[name='x']");
    var txtY = section3.querySelector("input[name='y']");
    var btnAdd = section3.querySelector("input[name='btn-add']");
    var txtSum = section3.querySelector("input[name='sum']");

    btnAdd.onclick = function() {
        var x = parseInt(txtX.value);
        var y = parseInt(txtY.value);

        txtSum.value = x + y;

    };
});

// Ex2: 엘리먼트 선택방법 계산하기
window.addEventListener("load", function() {
    var section2 = document.getElementById("section2");

    var txtX = section2.getElementsByClassName("txt-x")[0];
    var txtY = section2.getElementsByClassName("txt-y")[0];
    var btnAdd = section2.getElementsByClassName("btn-add")[0];
    var txtSum = section2.getElementsByClassName("txt-sum")[0];

    /*
    var inputs = section2.getElementsByTagName("input")

    var txtX = inputs[0];
    var txtY = inputs[1];
    var btnAdd = inputs[2];
    var txtSum = inputs[3];
    */
    btnAdd.onclick = function() {
        var x = parseInt(txtX.value);
        var y = parseInt(txtY.value);

        txtSum.value = x + y;

    };
});

// Ex1 : 계산기 프로그램
window.addEventListener("load", function() {
    var txtX = document.getElementById("txt-x");
    var txtY = document.getElementById("txt-y");
    var btnAdd = document.getElementById("btn-add");
    var txtSum = document.getElementById("txt-sum");

    btnAdd.onclick = function() {
        var x = parseInt(txtX.value);
        var y = parseInt(txtY.value);

        txtSum.value = x + y;

    };
});