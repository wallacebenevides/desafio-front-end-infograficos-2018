export class Slides {

    constructor() {

        this._slides = [];
        Object.freeze(this);
    }


    adiciona(imagem) {
        this._slides.push(imagem);
    }

    esvazia() {
        this._slides = [];
    }
    ordena(criterio) {
        this._slides.sort(criterio);
    }
    inverteOrdem() {
        this._slides.reverse();
    }

    get imagens() {
        return [].concat(this._slides);
    }
}