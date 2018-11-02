export class Noticias {

    constructor() {

        this._noticias = [];
        Object.freeze(this);
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

    get noticias() {
        return [].concat(this._noticias);
    }
}

export const ordenaRecentes = (a, b) => b.data - a.data;
export const ordenaAntigas = (a, b) => b.data - a.data;