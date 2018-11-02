export class Editorias {

    constructor() {

        this._noticias = [];
        Object.freeze(this);
    }


    adiciona(editoria) {
        console.log(editoria)
        this._noticias.push(editoria);
    }

    esvazia() {
        this._noticias = [];
    }
    ordena(criterio) {
        this._noticias.sort(criterio);
    }
    inverteOrdem() {
        this._noticias.reverse();
    }

    get editorias() {
        return [].concat(this._noticias);
    }
}