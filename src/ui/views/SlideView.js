import { View } from './View.js';
import { currentInstance } from "../../controllers/EditoriaController";

export class SlideView extends View {

    constructor(elemento) {
        super(elemento);
        elemento.addEventListener('click', (event) => {
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
        });
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
            <a data-direcao="prev" class="prev">❮</a>
            <a data-direcao="next" class="next">❯</a>            
            <div class="slide__pagination">
                <ol>
                    ${slides.imagens.map((foto, i) =>
                `<li data-index=" ${i}" class=${slides.slideIndex == i ? "'active'" : ""} ></li>`
            ).join('')}
                </ol>
            </div >
            `
    }
}