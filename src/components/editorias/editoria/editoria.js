import { required } from '../../../util/index';

export class Editoria {

    constructor(
        _nome = required('nome'),
        _id = required('id'),
        _noticias = required('noticias')) {

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
