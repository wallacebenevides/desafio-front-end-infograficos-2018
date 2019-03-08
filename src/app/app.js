import { EditoriaService } from "../components/editorias/editoria.service";
import { EditoriasComponent, SlideComponent } from '../components/index';
import { HeaderComponent } from "../components/header/header.component";
import { GraficoEditoriasComponent } from "../components/grafico-editorias/grafico-editorias.component";
import { ContatoComponent } from "../components/contato/contato.component";
import { LocalizacaoComponent } from "../components/locallizacao/localizacao.component";
import { FooterComponent } from "../components/footer/footer.component";
import "./app.scss";

class App {
    constructor() {
        let $ = document.querySelector.bind(document);

        this._header = new HeaderComponent($("header"));
        this._slides = new SlideComponent($('slide'));
        this._editoriaService = new EditoriaService();
        this._noticias = new EditoriasComponent($("editorias"));
        this._graficoEditorias = new GraficoEditoriasComponent($("grafico-editorias"));
        this._localizacao = new LocalizacaoComponent($('localizacao'));
        this._contato = new ContatoComponent($('contato'));
        this._footer = new FooterComponent($('footer'));

        /* this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            'texto'); */

        this._init();
    }

    _init() {

        this._editoriaService.obtemSlides()
            .then(imagens =>
                imagens.forEach(imagem =>
                    this._slides.adiciona(imagem)
                ))
            .catch(error => this._exibeErro(error));
    }

    _exibeErro(erro) {
        console.error(erro);
        this._mensagem.texto = erro.message;
    }
}

let app = new App();

export default function () {
    return app;
}
