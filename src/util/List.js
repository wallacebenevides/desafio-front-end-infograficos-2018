export class List {

    constructor() {
        this._itens = [];
        Object.freeze(this);
    }

    adiciona(item) {
        this._itens.push(item);
    }

    esvazia() {
        this._itens = [];
    }

    get itens() {
        return [].concat(this._itens);
    }
}
