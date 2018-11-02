import { View } from './View.js';

export class FiltroView extends View {

    template(model) {
        return '<option value="">Editoria</option>' + model.itens.map(item =>
            `<option value="${item}">${item}</option>`
        ).join('');
    }
}