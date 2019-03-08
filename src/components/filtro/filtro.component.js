import { Component } from '../component';
import { Bind } from "../../util/Bind";
import { List } from "../../util/List";
import { EventEmitter } from '../../util/event-emitter';

export class FiltroComponent extends Component {

    constructor(parentElement, noticias) {
        super(parentElement);
        this._noticias = noticias;
        this._filtro = new Bind(
            new List(),
            this,
            'adiciona'
        );
        return this._filtro;
    }

    ordena(event) {
        let campo = event.target.value;
        let criterio;
        if (campo === 'recentes')
            criterio = (a, b) => b.data - a.data;
        if ((campo === 'antigas'))
            criterio = (a, b) => a.data - b.data;

        if (criterio)
            this._noticias.ordena(criterio);

        this.onchange = new EventEmitter()

        this.onchange.emit(campo);
    }

    filtra(event) {
        let campo = event.target.value;
        this._noticias.filtra(campo);
    }

    render(model) {

        const filtro = `
        <label for="filtrar">Filtrar Por:</label>
            <select (change)="filtra(event)" name="filtrar"  class="campo">
                <option value="" selected>Editoria</option>
                ${model.itens.map(item => `<option value="${item}">${item}</option>`).join('')}
            </select>
        `;
        return `
        <form action="" class="filtro">
            <div class="filtro__item">
                <label for="ordenar">Ordernar Por:</label>
                <select name="ordenar" id="ordenar" class="campo">
                    <option value="recentes">Recentes</option>
                    <option value="antigas">Antigas</option>
                </select>
            </div>
            <div id="filtrar" class="filtro__item">
                ${filtro}
            </div>
        </form>
        `;

    }
}
