import { Component } from "../component";
import "./contato.scss";

export class ContatoComponent extends Component {
    constructor(parentElement) {
        super(parentElement);
        this.update();
    }

    render() {
        return `<div class=" box__contato">
                <div class="enderecos">
                    <div class="endereco__item">
                        <h2 class="font-1">Entre em contato</h2>
                        <h3>Onde nos achar</h3>
                        <p>Rua dos Afeneiros, número 4 <br />00-91102 <br />little Whitning <br />Londres/
                            Inglatera</p>
                    </div>
                    <br />
                    <div class="endereco__item">
                        <p>(21) 4000-1234 <br />(21) 4000-1234</p>
                        <br />
                        <small>contato@minutonews.com.br</small>
                    </div>
                    <div class="endereco__item">
                        <p>Aberto de segunda a sexta das 09h as 19h</p>
                    </div>
                </div><!-- enderecos -->
            </div>

            <div class=box__formulario>
                <div class="formulario">
                    <h5>Mande uma mensagem</h5>
                    <form action="" class="form">
                        <label for="">Nome:</label>
                        <input type="text" name="nome" autocomplete="on">
                        <label for="">Email:</label>
                        <input type="email" name="email" autocomplete="on">
                        <label for="">Mensagem:</label>
                        <textarea name="mensagem" autocomplete="on" autocorrect="on" spellcheck="true" id="" cols="30"
                            rows="10"></textarea>
                        <button>Enviar</button>
                    </form>
                </div><!-- /.formulário -->

            </div>`;
    }
}
