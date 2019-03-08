import { Component } from '../component';
import { DateConverter, Bind } from '../../util';
import { Noticias } from "./editoria/noticias";
import { FiltroComponent } from "../filtro/filtro.component";
import "./editoriais.scss";

export class EditoriasComponent extends Component {
    constructor(parentElement) {
        super(parentElement);
        this._editorias = new Bind(
            new Noticias(),
            this,
            'esvazia', 'adiciona', 'ordena', 'filtra'
        );
        return this._editorias;
    }

    async componentWillMount() {
        // usando async await
        try {
            let noticias = await this._editoriaService.obtemNoticias();
            noticias.forEach(noticia => this._noticias.adiciona(noticia));
        } catch (error) {
            this._exibeErro(error);
        }
    }

    componentDidMount() {
        let filtroEl = document.querySelector("filtro");
        this._filtroList = new FiltroComponent(filtroEl, this._editorias).event()
        this.getEditoriasName()
            .forEach(editoria =>
                this._filtroList.adiciona(editoria)
            );
    }

    getEditoriasName() {
        console.log(this._editorias)
        return this._editorias.noticias().map(e => e['Editoria']);
    }

    render(model) {
        if (!model.noticias) return;
        const noticias = model.noticias.map(noticia =>
            `<div class="noticia__content">
                    <div class="noticia__item">
                        <div class="noticia__item--header">
                            <span class="item__header--data">${DateConverter.paraTexto(noticia.data)}</span>
                            <span class="item__header--editoria">${noticia.editoria}</span>
                        </div>
                        <div class="noticia__item-img">
                            <img src="assets/img/noticias/${noticia.foto}">
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
        ).join('');

        return `
        <div class="limit">
                <div class="editorias__header">
                    <div class="header__titulo">
                        <h2 class="font-1">Editorias</h2>
                    </div>
                    <filtro class="header__filtro">
                    </filtro>
                </div>
                <div class="noticias">
                    ${noticias}
                </div>
            </div>
        `;
    }

}

