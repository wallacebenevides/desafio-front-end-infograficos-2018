import { Component } from '../component';
import { DateConverter, Bind } from '../../util';
import { Noticias } from "./editoria/noticias";
import "./editoriais.scss";
import { EditoriaService } from './editoria.service';
import { Logger } from '../../util/logger';
import { SelectComponent } from '../select/select.component';

export class EditoriasComponent extends Component {
    constructor(parentElement) {
        super(parentElement);
        this._editorias = new Bind(
            new Noticias(),
            this,
            'setNoticias', 'adiciona', 'ordena', 'filtra'
        );
    }

    componentWillMount() {
        Logger.log('componentWillMount');
        this._editoriaService = new EditoriaService();
    }

    async componentDidMount() {
        Logger.log("componentDidMount")

        this._selectEditorias = new SelectComponent(this._parentElement.querySelector('select-editorias'), 'filtrar');
        this._selectEditorias.onchange = event => this.filtra(event);

        this._selectOrdem = new SelectComponent(this._parentElement.querySelector('select-ordem'), 'ordenar');

        this._selectOrdem.onchange = event => this.ordena(event);

        try {
            let noticias = await this._editoriaService.obtemNoticias()
            //noticias.forEach(noticia => this._editorias.adiciona(noticia))
            this._editorias.setNoticias(noticias);
            let options = this.getEditoriasName(noticias);
            this._selectOrdem.options = ['Recentes', 'Antigas'];
            this._selectEditorias.options = options

        } catch (error) {
            // TODO: exibe error ao usuário
            Logger.error(error);
        }
    }

    componentChangeMount() {
        Logger.info('componentChangeMount');

        let selectOrdem = this._parentElement.querySelector('select-ordem');
        selectOrdem && this._selectOrdem.updateParentElement(selectOrdem);

        let selectEditorias = this._parentElement.querySelector('select-editorias');
        selectEditorias && this._selectEditorias.updateParentElement(selectEditorias);
    }

    ordena(event) {
        let campo = event.target.value;
        let criterio;
        if (campo === 'Recentes')
            criterio = (a, b) => b.data - a.data;
        if ((campo === 'Antigas'))
            criterio = (a, b) => a.data - b.data;
        if (criterio)
            this._editorias.ordena(criterio);

    }

    filtra(event) {
        let campo = event.target.value;
        this._editorias.filtra(campo);

    }

    getEditoriasName(noticias) {
        return noticias.reduce((prev, current) => {
            return !prev.some(prevItem => prevItem === current.editoria) ? [...prev, current.editoria] : prev
        }, ['Editoria']);
    }

    render(model) {

        const noticias = model.noticias;

        if (!noticias) return;

        const filtro = `<form action="" class="filtro">
                            <div class="filtro__item">
                                <label for="ordenar">Ordernar Por:</label>
                                <select-ordem>
                                </select-ordem>
                            </div>
                            <div id="filtrar" class="filtro__item">
                                <label for="filtrar">Filtrar Por:</label>
                                <select-editorias>
                                </select-editorias>
                            </div>
                        </form>`;


        const noticiasTemp = noticias.map(noticia =>
            `<div class="noticia__content" >
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
            </div>`
        ).join('');

        return `<div class="limit" >
                <div class="editorias__header">
                    <div class="header__titulo">
                        <h2 class="font-1">Editorias</h2>
                    </div>
                    ${filtro}
                </div>
                <div class="noticias">
                    ${noticiasTemp}
                </div>
            </div>`;
    }
}

