window.onload = function () {
  init();
}

async function init() {
  var json = await getData('-all-');
  json = JSON.parse(JSON.stringify(json));

  // 解答数が同じ場合は正解率が高い方が上位
  json.sort((a,b) => b.rate - a.rate);
  json.sort((a,b) => b.ans - a.ans);

  var base_element = document.getElementById('rank1');
  for (var i = 0; i < json.length; i++) {
    var data = json[i];
    data.id = decodeURI(data.id);
    var clone_element = base_element.cloneNode(true);
    if (i == 0) clone_element.style = "border-color: #e4c900; background-color: #ffffaa;";
    else if (i == 1) clone_element.style = "border-color: #696969; background-color: #eeeeee;";
    else if (i == 2) clone_element.style = "border-color: #ae5d00; background-color: #ffd7b0;";
    else clone_element.style = "border-color: #31f1ff; background-color: #ffffff;";
    clone_element.querySelector('.rank').innerHTML = (i+1) + '<span style="font-size: 70%;">' + indicator(i+1) + '</span>';
    if (data.id.length > 10) data.id = data.id.substr(0,10) + '...';
    clone_element.querySelector('.name').textContent = data.id;
    clone_element.querySelector('.name').style = "color: #" + getColor(data.id, data.cor) + ";";
    clone_element.querySelector('.value').textContent = (data.ans).toLocaleString() + '問';
    base_element.parentNode.appendChild(clone_element);
  }

  // 正解数が同じ場合は正解率が高い方が上位
  json.sort((a,b) => b.rate - a.rate);
  json.sort((a,b) => b.cor - a.cor);

  base_element = document.getElementById('rank2');
  for (var i = 0; i < json.length; i++) {
    var data = json[i];
    var clone_element = base_element.cloneNode(true);
    if (i == 0) clone_element.style = "border-color: #e4c900; background-color: #ffffaa;";
    else if (i == 1) clone_element.style = "border-color: #696969; background-color: #eeeeee;";
    else if (i == 2) clone_element.style = "border-color: #ae5d00; background-color: #ffd7b0;";
    else clone_element.style = "border-color: #31f1ff; background-color: #ffffff;";
    clone_element.querySelector('.rank').innerHTML = (i+1) + '<span style="font-size: 80%;">' + indicator(i+1) + '</span>';
    clone_element.querySelector('.name').textContent = data.id;
    clone_element.querySelector('.name').style = "color: #" + getColor(data.id, data.cor) + ";";
    clone_element.querySelector('.value').textContent = (data.cor).toLocaleString() + '問';
    base_element.parentNode.appendChild(clone_element);
  }

  // 正解率が同じ場合は正解数が多い方が上位
  json.sort((a,b) => b.cor - a.cor);
  json.sort((a,b) => b.rate - a.rate);

  base_element = document.getElementById('rank3');
  for (var i = 0; i < json.length; i++) {
    var data = json[i];
    var clone_element = base_element.cloneNode(true);
    if (i == 0) clone_element.style = "border-color: #e4c900; background-color: #ffffaa;";
    else if (i == 1) clone_element.style = "border-color: #696969; background-color: #eeeeee;";
    else if (i == 2) clone_element.style = "border-color: #ae5d00; background-color: #ffd7b0;";
    else clone_element.style = "border-color: #31f1ff; background-color: #ffffff;";
    clone_element.querySelector('.rank').innerHTML = (i+1) + '<span style="font-size: 80%;">' + indicator(i+1) + '</span>';
    clone_element.querySelector('.name').textContent = data.id;
    clone_element.querySelector('.name').style = "color: #" + getColor(data.id, data.cor) + ";";
    clone_element.querySelector('.value').textContent = (Math.floor(data.rate * 100000) / 1000).toFixed(3) + '%';
    base_element.parentNode.appendChild(clone_element);
  }
}

function indicator(i) {
  i = Math.abs(i)
  var cent = i % 100
  if (cent >= 10 && cent <= 20) return 'th'
  var dec = i % 10
  if (dec === 1) return 'st'
  if (dec === 2) return 'nd'
  if (dec === 3) return 'rd'
  return 'th'
}