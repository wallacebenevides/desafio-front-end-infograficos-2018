import { obrigatorio } from '../../util/index.js';
import { normalizaData } from "../../util/dateHelpers";

export class Noticia {

    constructor(
        _data = obrigatorio('data'),
        _foto = obrigatorio('foto'),
        _texto = obrigatorio('texto'),
        _titulo = obrigatorio('titulo')
    ) {
        Object.assign(this, { _data, _foto, _texto, _titulo });
        Object.freeze(this);
    }

    get data() {

        return this._data;
    }

    get foto() {

        return this._foto;
    }

    get texto() {

        return this._texto;
    }
    get titulo() {

        return this._titulo;
    }
}

export const resolveNoticiaAPI = (noticia) => {

    return new Noticia(
        normalizaData(noticia['Data de publicação']),
        noticia['Foto'],
        noticia['Texto'],
        noticia['Título']
    )
}