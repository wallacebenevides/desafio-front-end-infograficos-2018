import { Component } from '../component';

export class MensagemComponent extends Component {

    render(model) {

        return model.texto
            ? `<p class="alert alert-info">${model.texto}</p>`
            : `<p></p>`;
    }
}  