var dURL='https://script.google.com/macros/s/AKfycbxT8uXkfokMD-Ae282E6o3Lg3Ct7Kpkt6uo5uZVbTdL3licnjY577Ud3ZZxqoeiwXVo/exec';async function getData(i){return await get(i);};async function get(i){const d={};d.method='GET';d.headers={'Accept':'application/json','Content-Type':'application/x-www-form-urlencoded',};const r=await fetch(dURL+"?id="+encodeURI(i),d).catch(e=>console.log(e));const j=await r.json();return j;};function saveData(i,a,c){post(i,a,c);};async function post(i,a,c){const d={};d.method='POST';d.headers={'Accept':'application/json','Content-Type':'application/x-www-form-urlencoded'};var p=new URLSearchParams();p.append('id',encodeURI(i));p.append('ans',a);p.append('cor',c);d.body=p;const r=await fetch(dURL,d).catch(e=>console.log(e));const j=await r.json();};
function getColor(i,c){
  var d=['Firmiana','Aludra'];
  if(d.includes(i))return "A0F";
  else if(c>=10000)return "F00";
  else if(c>=5000)return "F80";
  else if(c>=2000)return "AA0";
  else if(c>=1000)return "00F";
  else if(c>=500)return "0DD";
  else if(c>=300)return "0B0";
  else if(c>=200)return "AE5D00";
  else return "000";
}