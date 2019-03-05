import { Component } from '../component';
import { Bind } from "../../util/Bind";
import { Slides } from "./slides";
import './slide.scss';

export class SlideComponent extends Component {

    constructor(_parentElement) {
        super(_parentElement);
        this._slide = new Bind(
            new Slides(),
            this,
            'esvazia', 'adiciona', 'next', 'prev', 'slideTo'
        );
        return this._slide;
    }

    slideNext() {
        this._slide.next();
    }
    slidePrev() {
        this._slide.prev();
    }
    slideTo(index) {
        this._slide.slideTo(index);
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