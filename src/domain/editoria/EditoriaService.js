import { ApplicationException, HttpService } from '../../util/index';
import { resolveEditoriaAPI, ordenaRecentes } from "../index";
import "../../util/arrayHelpers";

const NOTICIAS_URL = "assets/JSON/noticias.json";
const FOTOS_URL = "assets/JSON/slide.json";

export class EditoriaService {

    constructor() {
        this._http = new HttpService();
        this._editorias = [];
    }

    obtemNoticias() {

        return this._http
            .get(NOTICIAS_URL)
            .then(dados => dados[0]['Editorias'])
            .then(editorias => {
                this._editorias = editorias.map(e => e['Editoria']);
                return editorias;
            })
            .then(editorias =>
                editorias.map(editoria =>
                    resolveEditoriaAPI(editoria)
                ).$flat().sort(ordenaRecentes),
                err => {

                    throw new ApplicationException('Não foi possível obter as negociações da semana');
                }
            );
    }

    getEditorias() {
        return [].concat(this._editorias);
    }

    obtemSlides() {
        return this._http
            .get(FOTOS_URL)
            .then(
                dados => dados[0]['imagens'],
                err => {

                    throw new ApplicationException('Não foi possível carregar as imagens do slide');
                });

    }


}