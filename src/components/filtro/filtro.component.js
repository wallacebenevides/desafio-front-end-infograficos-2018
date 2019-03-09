import { Component } from '../component';
import { Bind } from "../../util/Bind";
import { List } from "../../util/List";
import { SelectComponent } from '../select/select.component';

export class FiltroComponent extends Component {

    constructor(parentElement) {
        super(parentElement, () => {
            this._noticias = noticias;
            this._filtro = new Bind(
                new List(),
                this,
                'adiciona'
            );
            return this._filtro;
        });
    }

    componentDidMount() {
        this._selectEditorias = new SelectComponent(this._parentElement.querySelector('select-editorias'));
        this._selectOrdem = new SelectComponent(this._parentElement.querySelector('select-ordem'));
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
                <select-editorias>
                </select-editorias>
                <select name="ordenar" class="campo">
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
