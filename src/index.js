require('./assets/style/scss/all.scss');
var say = require('./assets/script/say.js');

var app = document.getElementById('app');
app.innerText = say('Richie');
