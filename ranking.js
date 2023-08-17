function ind(i){i=Math.abs(i);var c=i%100;if(c>=10&&c<=20)return 'th';var d=i%10;if(d==1)return 'st';if(d==2)return 'nd';if(d==3)return 'rd';return 'th';};function st(i){var a="border-color:#",b="background-color:#";if(i==0)return a+"e4c900;"+b+"ffa;";else if(i==1)return a+"696969;"+b+"eee;";else if(i==2)return a+"ae5d00;"+b+"ffd7b0;";else return a+"31f1ff;"+b+"fff;";};function se(b,i,d,v,c){var e=b.cloneNode(true);e.style=st(i);e.querySelector('.r').innerHTML=(i+1)+'<span style="font-size:80%;">'+ind(i+1)+'</span>';e.querySelector('.n').textContent=d.length>10?(d.substr(0,10)+'...'):d;e.querySelector('.n').style="color:#"+getColor(d,c)+";";e.querySelector('.v').textContent=v;b.parentNode.appendChild(e);}
window.onload=function(){init();}
async function init(){
  var j=await getData('-all-');
  j=JSON.parse(JSON.stringify(j));
  j.sort((a,b)=>b.rate-a.rate);
  j.sort((a,b)=>b.ans-a.ans);
  var be=document.getElementById('r1');
  for(var i=0;i<j.length;i++){var d=j[i];d.id=decodeURI(d.id);se(be,i,d.id,d.ans+'問',d.cor);}
  j.sort((a,b)=>b.rate-a.rate);
  j.sort((a,b)=>b.cor-a.cor);
  be=document.getElementById('r2');
  for(var i=0;i<j.length;i++){var d=j[i];se(be,i,d.id,d.cor+'問',d.cor);}
  j.sort((a,b)=>b.cor-a.cor);
  j.sort((a,b)=>b.rate-a.rate);
  be=document.getElementById('r3');
  for(var i=0;i<j.length;i++){var d=j[i];se(be,i,d.id,(Math.floor(d.rate*100000)/1000).toFixed(3)+'%',d.cor);}
}