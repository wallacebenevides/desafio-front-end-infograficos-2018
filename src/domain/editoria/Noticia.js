import { obrigatorio, normalizaData } from '../../util/index';

export class Noticia {

    constructor(
        _data = obrigatorio('data'),
        _foto = obrigatorio('foto'),
        _texto = obrigatorio('texto'),
        _titulo = obrigatorio('titulo'),
        _editoria = obrigatorio('editoria')
    ) {
        Object.assign(this, { _data, _foto, _texto, _titulo, _editoria });
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
    get editoria() {
        return this._editoria;
    }
}

export const resolveNoticiaAPI = (editoria) => (noticia) => {

    return new Noticia(
        normalizaData(noticia['Data de publicação']),
        noticia['Foto'],
        noticia['Texto'],
        noticia['Título'],
        editoria
    )
}