var databaseURL = 'https://script.google.com/macros/s/AKfycbxfvN8lqybZ2YEsSC_D87iGuZNAzEdc3LQka4N5Y6AHYbhtejHmwPVM0_ZDM5agctQM/exec';

async function getData(id) {
  return await get(id);
}

async function get(id) {
  const data = {};
  data.method = 'GET';
  data.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const res = await fetch(databaseURL + "?id=" + encodeURI(id), data).catch(e => console.log(e));
  const json = await res.json();
  return json;
}

function saveData(id, ans, cor) {
  post(id, ans, cor);
}

async function post(id, ans, cor){
  const data = {};
  data.method = 'POST';
  data.headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  var params = new URLSearchParams();
  params.append('id', encodeURI(id));
  params.append('ans', ans);
  params.append('cor', cor);
  data.body = params;
  const res = await fetch(databaseURL, data).catch(e => console.log(e));
  const json = await res.json();
}

function getColor(id, cor) {
  var devs = ['Firmiana', 'Aludra'];
  if (devs.includes(id)) return "AA00FF";
  else if (cor >= 10000) return "FF0000";
  else if (cor >= 5000) return "FF8800";
  else if (cor >= 2000) return "AAAA00";
  else if (cor >= 1000) return "0000FF";
  else if (cor >= 500) return "00DDDD";
  else if (cor >= 300) return "00BB00";
  else if (cor >= 200) return "AE5D00";
  else return "000000";
}