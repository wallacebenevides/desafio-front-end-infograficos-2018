import { required } from '../../../util/index';

export class Noticia {

    constructor(
        _data = required('data'),
        _foto = required('foto'),
        _texto = required('texto'),
        _titulo = required('titulo'),
        _editoria = required('editoria')
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
