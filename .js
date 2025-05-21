fetch("http://127.0.0.1:5500/res.js")
  .then(res => res.text())
  .then(code => eval(code));


