import { Component } from "../component";
import { Bind, List } from "../../util";
import { isFunction } from "../../util/helpers/common-helpers";

export class SelectComponent extends Component {
    constructor(parentElement, name) {
        super(parentElement);
        this._name = name;
        this.onchange; //eventEmitter que precisa ser implementado
        this._select = new Bind(new List(), this, 'adiciona');
    }

    set options(items) {
        for (const item of items) {
            this._select.adiciona(item);
        }
    }
    change(event) {
        if(isFunction(this.onchange)){
            this.onchange(event);
        }
    }

    render(list) {

        return `
        <select (change)="onChange(event)" name="${this._name}"  class="campo">
            ${list.itens.map(item => `<option value="${item}">${item.toUpperCase()}</option>`).join('')}
        </select>
        `;
    }
}
