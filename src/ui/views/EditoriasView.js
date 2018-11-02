import { View } from './View.js';
import { DateConverter } from '../../util/dateHelpers';
import "../../util/arrayHelpers";

export class EditoriasView extends View {


    constructor(elemento) {
        super(elemento);
        console.log(elemento);
        /* elemento.addEventListener('click', function(event) {
            if (event.target.nodeName == 'TH')
                currentInstance().ordena(event.target.textContent.toLowerCase());
        }); */
    }

    template(model) {
        if (!model.noticias) return;
        //sconsole.log(model.noticias)
        return model.noticias.map(noticia =>
            `<div class="noticia__content">
                    <div class="noticia__item">
                        <div class="noticia__item--header">
                            <span class="item__header--data">${DateConverter.paraTexto(noticia.data)}</span>
                            <span class="item__header--editoria">${noticia.editoria}</span>
                        </div>
                        <div class="noticia__item-img">
                            <img src="assets/noticias/${noticia.foto}">
                        </div>
                        <h2 class="noticia__item--titulo">${noticia.titulo}</h2>
                        <div class="noticia__item--conteudo">
                            <p>
                            ${noticia.texto}
                            </p>
                            <div class="">
                                <a href="#">Saiba Mais</a>
                            </div>
                        </div>
                    </div>
                </div>
                `
        ).join('')
    }

}

