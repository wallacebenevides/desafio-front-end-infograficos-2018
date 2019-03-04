import { EditoriaService } from "../domain/index";
import { EditoriasView, SlideView, FiltroView } from '../ui/index';

class EditoriaController {
    constructor() {
        let $ = document.querySelector.bind(document);

        this._editoriaService = new EditoriaService()

        this._noticias = new EditoriasView($("#editoriasView"));

        this._slides = new SlideView($("#slideView"));

        this._filtroList = new FiltroView($("#filtrar"), this._noticias);

        /* this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            'texto'); */

        this._init();
    }

    async _init() {

        // usando async await
        try {
            let noticias = await this._editoriaService.obtemNoticias();
            noticias.forEach(noticia => this._noticias.adiciona(noticia));

            let editorias = this._editoriaService.getEditorias();
            editorias.forEach(editoria => this._filtroList.adiciona(editoria));
        } catch (error) {
            this._exibeErro(erro);
        }

        this._editoriaService.obtemSlides()
            .then(imagens =>
                imagens.forEach(imagem =>
                    this._slides.adiciona(imagem)
                ))
            .catch(erro => this._exibeErro(erro));

        this._initMap();
        this._initGrafico();

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

    // Mapa
    _initMap() {

        var myLatLng = { lat: -25.363, lng: 131.044 };
        var elemento = document.querySelector(".localizacao");
        var map = new google.maps.Map(elemento, {
            center: myLatLng,
            zoom: 8
        });

        var image = './assets/img/marcador.png';
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image
        });
    }
    slideNext() {
        this._slides.next();
    }
    slidePrev() {
        this._slides.prev();
    }
    slideTo(index) {
        this._slides.slideTo(index);
    }

    /**
     * Carrega o gráfico
     */
    _initGrafico() {

        let dados = [
            { editoria: "Governo", quantidade: 75 },
            { editoria: "Carnaval", quantidade: 50 },
            { editoria: "Esporte", quantidade: 45 },
            { editoria: "Férias", quantidade: 30 },
            { editoria: "Outros", quantidade: 25 },
        ];

        let width = 200,
            barHeight = 30;

        let grafico = d3.select(".grafico__item")
            .attr("width", width)
            .attr("height", "300");

        let bar = grafico.selectAll("g")
            .data(dados)
            .enter()
            .append("g")
            .attr("transform", (d, i) => `translate(0, ${i * barHeight * 2})`);//margin

        bar.append("rect")
            .attr("height", barHeight)//width
            .style("width", (d) => d.quantidade * 3 + "px");//height

        bar.append("text")
            .attr("class", "text")
            .attr("x", (d, i) => d.quantidade / 2 + "px")
            .attr("y", "15")
            .attr("dy", ".35em")
            .text((d) => d.editoria);

        bar.append("text")
            .attr("transform", (d, i) => `translate(${d.quantidade * 3 - (d.quantidade * 3) * 0.15}, 0)`)
            .attr("class", "text")
            .attr("x", (d, i) => d.quantidade / 2 + "px")
            .attr("y", "15")
            .attr("dy", ".35em")
            .text((d) => d.quantidade);
    }

    _exibeErro(erro) {
        console.error(erro);
        this._mensagem.texto = erro.message;
    }
}

let editoriaController = new EditoriaController();

export function currentInstance() {
    return editoriaController;
}
