import { View } from './View.js';
import { Bind } from "../../util/Bind";
import { List } from "../../util/List";

export class FiltroView extends View {

    constructor(_parentElement, noticias) {
        super(_parentElement);
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
    }


    filtra(event) {
        let campo = event.target.value;
        this._noticias.filtra(campo);
    }

    template(model) {
        return `
                <label for="filtrar">Filtrar Por:</label>
                     <select (change)="filtra(event)" name="filtrar"  class="campo">
                        <option value="" selected>Editoria</option>
                        ${model.itens.map(item =>
            `<option value="${item}">${item}</option>`).join('')}
                    </select>
                    `
    }
}