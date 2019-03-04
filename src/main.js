//const json = require('./noticias.json');
import '../assets/JSON/noticias.json';
import './style';//carrega os arquivos de folha de estilo
import App from "./app/App";
var app = App();

var oderna = app.ordena.bind(app);

document.querySelector("#ordenar").onchange = oderna;