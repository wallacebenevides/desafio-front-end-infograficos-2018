import { obrigatorio } from '../../util/index.js';
import { resolveNoticiaAPI } from "./Noticia";


export class Editoria {

    constructor(
        _nome = obrigatorio('nome'),
        _id = obrigatorio('id'),
        _noticias = obrigatorio('noticias')) {

        Object.assign(this, { _nome, _id })
        this._noticias = [].concat(_noticias);
        Object.freeze(this);
    }

    get nome() {

        return this._nome;
    }

    get id() {

        return this._id;
    }

    get noticias() {

        return this._noticias;
    }
}

export const resolveEditoriaAPI = (editoria) => {
    return editoria['Notícias']
        .map(resolveNoticiaAPI(editoria['Editoria']))
}