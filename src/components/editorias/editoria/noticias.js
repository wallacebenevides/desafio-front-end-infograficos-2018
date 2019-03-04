export class Noticias {

    constructor() {

        this._noticias = [];
        this._filtro = '';
        //Object.freeze(this);
    }

    adiciona(noticia) {
        this._noticias.push(noticia);
    }

    esvazia() {
        this._noticias = [];
    }
    ordena(criterio) {
        this._noticias.sort(criterio);
    }
    filtra(editoria='') {
        this._filtro = editoria;
    }

    get noticias() {
        if (this._filtro) {
            return [].concat(this._noticias).filter(noticia => noticia.editoria === this._filtro);
        }
        return [].concat(this._noticias);
    }
}