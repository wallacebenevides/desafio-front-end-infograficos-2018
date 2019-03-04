import { View } from './View.js';
import { currentInstance } from "../../controllers/EditoriaController";
import { Bind } from "../../util/Bind";
import { Slides } from "../models/Slides";

export class SlideView extends View {

    constructor(_parentElement) {
        super(_parentElement);
        this._slide = new Bind(
            new Slides(),
            this,
            'esvazia', 'adiciona', 'next', 'prev', 'slideTo'
        );
        return this._slide;

        /* elemento.addEventListener('click', (event) => {
            let target = event.target;

            //Marcador
            if (target.nodeName == 'LI') {
                let index = target.getAttribute("data-index");
                currentInstance().slideTo(index);
            }
            //Setas
            let direcao = target.getAttribute("data-direcao");
            if (direcao === 'next')
                currentInstance().slideNext();
            if (direcao === 'prev')
                currentInstance().slidePrev();
        }); */
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

    template(slides) {

        return slides.imagens.map((foto, i) =>
            `
            <div data-index="${i}"  class="slide__content">
                <div class="slide__item ${slides.slideIndex == i ? "active" : ""}">
                    <img src="./assets/slide/${foto}"/>
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