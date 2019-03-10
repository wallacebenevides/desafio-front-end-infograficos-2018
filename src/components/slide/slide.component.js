import { Component } from '../component';
import { Bind } from "../../util/Bind";
import { Slides } from "./slides";
import './slide.scss';

export class SlideComponent extends Component {

    constructor(parentElement) {
        super(parentElement);
        this._slide = new Bind(
            new Slides(),
            this,
            'esvazia', 'adiciona', 'next', 'prev', 'slideTo'
        );
        this.initAutoSlide();
        return this._slide;
    }

    initAutoSlide() {
       this._timer = setInterval(() => {
        this._slide.next();
        }, 3000);
    }
    refreshAutoSlide() {
        clearInterval(this._timer);
        this.initAutoSlide()
    }

    slideNext() {
        this._slide.next();
        this.refreshAutoSlide();
    }
    slidePrev() {
        this._slide.prev();
        this.refreshAutoSlide();
    }
    slideTo(index) {
        this._slide.slideTo(index);
        this.refreshAutoSlide();
    }

    render(slides) {

        return slides.imagens.map((foto, i) =>
            `
            <div data-index="${i}"  class="slide__content">
                <div class="slide__item ${slides.slideIndex == i ? "active" : ""}">
                    <img src="assets/img/slide/${foto}"/>
                </div>
            </div>
            `).join('') +
            `
            <a data-direcao="prev" (click)="slidePrev()" class="prev">❮</a>
            <a data-direcao="next" (click)="slideNext()" class="next">❯</a>
            <div class="slide__pagination">
                <ol>
                    ${slides.imagens.map((foto, i) =>
                `<li data-index=" ${i}" (click)="slideTo(${i})" class=${slides.slideIndex == i ? "'active'" : ""} ></li>`
            ).join('')}
                </ol>
            </div >
            `
    }
}
