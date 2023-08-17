let d,qn=0,qs,can=0,wan=0;
function init(){
  let q=location.search;
  let v=q.split('=')[1];
  v=decodeURI(v);
  document.title="市高クイ研自主練サイト | "+v;
  document.getElementById("genre").textContent="ジャンル："+v;
  let rURL='json/'+v.replace('-','/')+'.json';
  let r=new XMLHttpRequest();
  r.open('GET',rURL);
  r.responseType='json';
  r.send();
  r.onload=function(){
    d=r.response;
    d=JSON.parse(JSON.stringify(d));
    d=d.quiz;
    qs=d.length;
    const shuffleArray=(ar)=>{
      const cloneArray=[...ar];
      for(let i=cloneArray.length-1;i>=0;i--){
        let ra=Math.floor(Math.random()*(i+1));
        let ts=cloneArray[i];
        cloneArray[i]=cloneArray[ra];
        cloneArray[ra]=ts;
      }
      return cloneArray;
    }
    d=shuffleArray(d);
    displayQuiz();
  }
}
window.onload=function(){
  init();
  document.getElementById("sub").onclick=function(){
    if(document.getElementById("sub").textContent=="解答") {
      let aw=document.getElementById("aa").value.replace(/[Ａ-Ｚａ-ｚ０-９]/g,function(s){return String.fromCharCode(s.charCodeAt(0)-0xFEE0);});
      let c=d[qn].ans.split('/');
      if(c.includes(aw)){
        if(c.length==1){document.getElementById("af").textContent="正解です。";}
        else{document.getElementById("af").textContent="正解です。なお、以下は全て正解です："+d[qn].ans;}
        can+=1;
      }else{
        document.getElementById("af").textContent="不正解です。正解は："+d[qn].ans;
        wan+=1;
      }
      document.getElementById("next").disabled=false;
      document.getElementById("sub").disabled=true;
    }else{
      if(document.getElementById("aa").value!=""){
        localStorage.setItem('local_user_id',document.getElementById("aa").value);
        document.getElementById("sub").disabled=true;
        saveData(document.getElementById("aa").value,can+wan,can);
        document.getElementById("aa").value="送信しました";
      }
    }
  }
  document.getElementById("next").onclick=function(){
    if(document.getElementById("next").textContent=="次へ"){
      if(qs==qn+1) {
        document.getElementById("sub").disabled=false;
        document.getElementById("sub").textContent="送信";
        document.getElementById("next").disabled=false;
        document.getElementById("next").textContent="再開";
        if(localStorage.getItem('local_user_id')){document.getElementById("aa").value=localStorage.getItem('local_user_id');}
        else{document.getElementById("aa").value='';}
        document.getElementById("af").innerHTML="全問題終了です。<br>今回の成績："+can+"問正解／"+wan+"問不正解で、正解率"+(can/qs*100).toFixed(2)+"%でした。"+"<br>成績を記録する場合は上の入力欄にニックネーム(記号使用不可)を入力して、「送信」を押してください。"+"また、再度同じセットに解答する場合は「再開」を押してください。";
      }else{
        qn+=1;
        displayQuiz();
      }
    }else{
      qn=0;
      can=0;
      wan=0;
      document.getElementById("sub").textContent="解答";
      document.getElementById("next").textContent="次へ";
      displayQuiz();
    }
  }
}
function displayQuiz(){
  if(qn==0){
    const shuffleArray=(ar)=>{
      const cloneArray=[...ar];
      for(let i=cloneArray.length-1;i>=0;i--){
        let ra=Math.floor(Math.random()*(i+1));
        let ts=cloneArray[i];
        cloneArray[i]=cloneArray[ra];
        cloneArray[ra]=ts;
      }
      return cloneArray;
    }
    d=shuffleArray(d);
  }
  document.getElementById("next").disabled=true;
  document.getElementById("sub").disabled=false;
  document.getElementById("qnum").textContent=(qn+1)+"問目/"+qs+"問中";
  document.getElementById("qtext").textContent=d[qn].text;
  document.getElementById("aa").value="";
  document.getElementById("af").textContent="";
}
