export class View {

    constructor(_elemento) {

        this._elemento = _elemento;
    }

    update(model) {

        this._elemento.innerHTML = this.template(model);
    }

    template(model) {

        throw new Error('Você precisa implementar o método template');
    }
}  