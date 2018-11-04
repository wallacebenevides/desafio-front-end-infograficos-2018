export class Slides {

    constructor() {

        this._slides = [];
        this._slideIndex = 0;
        //Object.freeze(this);
    }


    adiciona(imagem) {
        this._slides.push(imagem);
    }

    esvazia() {
        this._slides = [];
    }

    next() {
        if (this._slideIndex === this._slides.length - 1) {
            this._slideIndex = 0;
            return;
        }
        this._slideIndex++;
    }

    prev() {
        if (this._slideIndex === 0) {
            this._slideIndex = this._slides.length -1;
            return;
        }
        this._slideIndex--;
    }
    slideTo(index) {
        // if (index !== this._slideIndex)
        this._slideIndex = index;
        console.log(index)

    }

    get slideIndex() {
        return this._slideIndex;
    }

    get imagens() {
        return [].concat(this._slides);
    }
}