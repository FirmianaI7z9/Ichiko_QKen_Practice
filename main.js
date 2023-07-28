//import saveData from 'database'

let data;
let qnum = 0;
let qsize;
let canum = 0, wanum = 0;

function init() {
  let query = location.search;
  let value = query.split('=')[1];
  value = decodeURI(value);
  document.title = "市高クイ研自主練サイト | " + value;
 
  document.getElementById("genre").textContent = "ジャンル：" + value;

  let requestURL = 'json/' + value.replace('-','/') + '.json';
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
    if(document.getElementById("sub").textContent == "解答") {
      let answ = document.getElementById("ansarea").value;
      let cans = data[qnum].ans.split('/');
      if (cans.includes(answ)) {
        if (cans.length == 1) {
          document.getElementById("ansfield").textContent = "正解です。";
        } else {
          document.getElementById("ansfield").textContent = "正解です。なお、以下は全て正解です：" + data[qnum].ans;
        }
        canum += 1;
      } else {
        document.getElementById("ansfield").textContent = "不正解です。正解は：" + data[qnum].ans;
        wanum += 1;
      }
      document.getElementById("next").disabled = false;
      document.getElementById("sub").disabled = true;
    } else {
      if (document.getElementById("ansarea").value != "") {
        localStorage.setItem('local_user_id', document.getElementById("ansarea").value);
        document.getElementById("sub").disabled = true;
        saveData(document.getElementById("ansarea").value, canum + wanum, canum);
        document.getElementById("ansarea").value = "送信しました";
      }
    }
  }

  document.getElementById("next").onclick = function(){
    if(document.getElementById("next").textContent == "次へ") {
      if (qsize == qnum + 1) {
        document.getElementById("sub").disabled = false;
        document.getElementById("sub").textContent = "送信";
        document.getElementById("next").disabled = false;
        document.getElementById("next").textContent = "再開";
        if (localStorage.getItem('local_user_id')) {
          document.getElementById("ansarea").value = localStorage.getItem('local_user_id');
        }
        else {
          document.getElementById("ansarea").value = '';
        }
        document.getElementById("ansfield").innerHTML = "全問題終了です。<br>今回の成績：" + canum + "問正解／"
          + wanum + "問不正解で、正解率" + (canum / qsize * 100).toFixed(3) + "%でした。"
          + "<br>成績を記録する場合は上の入力欄にニックネーム(記号使用不可)を入力して、「送信」を押してください。"
          + "また、再度同じセットに解答する場合は「再開」を押してください。";
      } else {
        qnum += 1;
        displayQuiz();
      }
    } else {
      qnum = 0;
      canum = 0;
      wanum = 0;
      document.getElementById("sub").textContent = "解答";
      document.getElementById("next").textContent = "次へ";
      displayQuiz();
    }
  }
}

function displayQuiz(){
  if(qnum == 0){
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
  }

  document.getElementById("next").disabled = true;
  document.getElementById("sub").disabled = false;
  document.getElementById("qnum").textContent = (qnum + 1) + "問目/" + qsize + "問中";
  document.getElementById("qtext").textContent = data[qnum].text;
  document.getElementById("ansarea").value = "";
  document.getElementById("ansfield").textContent = "";
}