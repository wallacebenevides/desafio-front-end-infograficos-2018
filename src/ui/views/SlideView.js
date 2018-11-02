import { View } from './View.js';

export class SlideView extends View {

    constructor(elemento) {
        super(elemento);
        console.log(elemento);
        elemento.addEventListener('click', (event) => {
            let direcao = event.target.getAttribute("data-direcao");
            console.log("direcao", direcao)
            if (direcao)
                this._slider(direcao);
        });
    }

    template(slides) {

        return slides.imagens.map((foto, i) =>
            `
            <div data-index="${i}"  class="slide__content">
                <div class="slide__item ${i === 0 ? "active" : ""}">
                <img src="./assets/slide/${foto}"/>
                </div>
            </div>
            `).join('') + `
            <div class="slide__control">
                <button type="button" class="slide__control--prev" data-direcao="prev" >
                    <span data-direcao="prev"  >&#10094;</span>
                </button>
                <button type="button" class="slide__control--next" data-direcao="next">
                    <span data-direcao="next">&#10095;</span>
                </button>
            </div>
            <div class="slide__pagination" >
                <ol>
                    ${slides.imagens.map((foto, i) =>
                `<li data-index=" ${i}" class=${i === 0 ? "'active'" : ""} ></li>`
            ).join('')}
                </ol>
            </div >
            `

    }
    _next(slide, item) {
        if (slide.next().length) {
            slide.removeClass("active").next().addClass("active");
            slideIndex = slide.next().attr("data-index");
            item.removeClass("active");
            item.eq(slideIndex).addClass("active");

        } else {
            slide.removeClass("active");
            slideIndex = 0;
            $itemSlide.eq(slideIndex).addClass("active"); // 0
            item.removeClass("active");
            item.eq(slideIndex).addClass("active");
        }
    }

    _prev(slide, item) {
        if (slide.index() > 0) {
            slide.removeClass("active").prev().addClass("active");
            slideIndex = slide.prev().attr("data-index");
            item.removeClass("active");
            item.eq(slideIndex).addClass("active");
        } else {
            slide.removeClass("active");
            slideIndex = $itemSlide.last().attr("data-index");
            $itemSlide.eq(slideIndex).addClass("active"); // 0
            item.removeClass("active");
            item.eq(slideIndex).addClass("active");
        }
    }
    _slider(dir) {

        var _liItem = this._elemento.querySelector("li");
        var _slideAtual = this._elemento.querySelector(".slide__item.active");
        // next
        (dir == "next" ? this._next(_slideAtual, _liItem) : "");
        //prev
        (dir == "prev" ? this._prev(_slideAtual, _liItem) : "");

        this._marcador(_liItem);
    }

    _marcador(event) {

        event.on("click", function () {
            if (!$(this).hasClass("active")) {
                var index = $(this).attr("data-index");
                $itemSlide.removeClass("active");
                event.removeClass("active");
                $itemSlide.eq(index).addClass("active"); // 0
                event.eq(index).addClass("active"); // 0
            };
        });
    }
}