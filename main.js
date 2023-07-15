let data;
let qnum = 0;
let qsize;

function init() {
  let query = location.search;
  let value = query.split('=')[1];
  value = decodeURI(value);
 
  document.getElementById("genre").textContent = "ジャンル：" + value;

  let requestURL = 'json/' + value + '.json';
  let request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();

  request.onload = function () {
    data = request.response;
    data = JSON.parse(JSON.stringify(data));
    data = data.quiz;
    qsize = data.length;

    const shuffleArray = (array) => {
      const cloneArray = [...array];
  
      for (let i = cloneArray.length - 1; i >= 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        let tmpStorage = cloneArray[i];
        cloneArray[i] = cloneArray[rand];
        cloneArray[rand] = tmpStorage;
      }
  
      return cloneArray;
    }

    data = shuffleArray(data);
    displayQuiz();
  }
}

window.onload = function () {
  init();

  document.getElementById("sub").onclick = function(){
    let answ = document.getElementById("ansarea").value;
    if (answ == data[qnum].ans) {
      document.getElementById("ansfield").textContent = "正解です。";
    } else {
      document.getElementById("ansfield").textContent = "不正解です。正解は：" + data[qnum].ans;
    }
    document.getElementById("next").disabled = false;
  }

  document.getElementById("next").onclick = function(){
    if (qsize == qnum + 1) {
      document.getElementById("sub").disabled = true;
      document.getElementById("next").disabled = true;
      document.getElementById("ansfield").textContent = "全問題終了です。";
    } else {
      qnum += 1;
      displayQuiz();
    }
  }
}

function displayQuiz(){
  document.getElementById("next").disabled = true;
  document.getElementById("qnum").textContent = (qnum + 1) + "問目/" + qsize + "問中";
  document.getElementById("qtext").textContent = data[qnum].text;
  document.getElementById("ansarea").value = "";
  document.getElementById("ansfield").textContent = "";
}