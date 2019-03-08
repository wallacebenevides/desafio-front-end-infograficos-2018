import { ApplicationError,  http, normalizaData } from '../../util/index';
import { Noticia } from "./editoria/noticia";
import "../../util/helpers/arrayHelpers";

const NOTICIAS_URL = "assets/JSON/noticias.json";
const FOTOS_URL = "assets/JSON/slide.json";

export class EditoriaService {

    obtemNoticias() {

        return http
            .get(NOTICIAS_URL)
            .then(dados => dados[0]['Editorias'])
            .then(editorias =>
                editorias.map(editoria =>
                    resolveEditoriaAPI(editoria)
                ).$flat().sort(ordenaRecentes)
            );
    }

    obtemSlides() {
        return http
            .get(FOTOS_URL)
            .then(
                dados => dados[0]['imagens']);
    }
}

const resolveNoticiaAPI = (editoria) => (noticia) => {
    return new Noticia(
        normalizaData(noticia['Data de publicação']),
        noticia['Foto'],
        noticia['Texto'],
        noticia['Título'],
        editoria

    )
}

const resolveEditoriaAPI = (editoria) => {
    return editoria['Notícias']
        .map(resolveNoticiaAPI(editoria['Editoria']))
}


const ordenaRecentes = (a, b) => b.data - a.data;
const ordenaAntigas = (a, b) => b.data - a.data;
