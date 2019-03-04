//const json = require('./noticias.json');
import '../assets/JSON/noticias.json';
import './style';//carrega os arquivos de folha de estilo
import { currentInstance } from "./controllers/EditoriaController";
var editoriaController = currentInstance();

var oderna = editoriaController.ordena.bind(editoriaController);
//var filtra = editoriaController.filtra.bind(editoriaController);

document.querySelector("#ordenar").onchange = oderna;
//document.querySelector("#filtrar").onchange = filtra;
