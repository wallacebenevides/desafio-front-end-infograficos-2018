import { Component } from "../component";
import { Bind, List } from "../../util";
import { isFunction } from "../../util/helpers/common-helpers";
import './select.scss';

export class SelectComponent extends Component {
    constructor(parentElement, name) {
        super(parentElement);
        this._name = name;
        this.onchange; //eventEmitter que precisa ser implementado
        this._select = new Bind(new List(), this, 'adiciona');
    }

    set options(items) {
        this._select.esvazia();
        for (const item of items) {
            this._select.adiciona(item);
        }
    }
    change(event) {

        if (isFunction(this.onchange)) {
            this.onchange(event);
        }
    }

    updateParentElement(parentElement) {
        super.updateParentElement(parentElement);
        this._select.updadeBindView();
    }

    render(list) {

        return `<select (change)="change(event)" name="${this._name}"  class="campo">
            ${list.itens.map(item => `<option value="${item}">${item.toUpperCase()}</option>`).join('')}
        </select>`;
    }
}
