window.onload = function () {
  init();
}

async function init() {
  var id = localStorage.getItem('local_user_id');
  if (id) {
    var data = await getData(id);
    var json = JSON.parse(JSON.stringify(data));
    document.getElementById('user_data_name').textContent = decodeURI(json.id);
    document.getElementById('user_data_name').style = 'color: #' + getColor(decodeURI(json.id), json.cor);
    document.getElementById('user_data_detail').innerHTML = 
      '累計解答問題数：<span style="font-size: 110%; font-weight: bold;">' + json.ans + '問</span> / '
      + '累計正解問題数：<span style="font-size: 110%; font-weight: bold;">' + json.cor + '問</span> / '
      + '正解率：<span style="font-size: 110%; font-weight: bold;">' + (Math.floor(json.rate * 100000) / 1000).toFixed(3) + '%</span>';
  } else {
    document.getElementById('user_data_name').textContent = 'ユーザ未登録';
  }
}
