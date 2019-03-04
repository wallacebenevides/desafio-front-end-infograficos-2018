//const json = require('./noticias.json');
import './assets/JSON/noticias.json';
import 'reset-css/reset.css';
import App from "./app/app";
var app = App();

var oderna = app.ordena.bind(app);

document.querySelector("#ordenar").onchange = oderna;