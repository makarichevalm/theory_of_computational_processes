function output() {
  var reg = /^#(010)+#$/;
  let str = document.getElementById('str').value;
  res = reg.test(str);
  document.querySelector('.out').innerHTML = 'Вы ввели: ' + str + '<br>' + res;
  document.getElementById('str').value = '';
}
