import { Editorias } from '../domain/editoria/Editorias';
import { Bind } from '../util/Bind';
import { EditoriaService } from '../domain/editoria/EditoriaService';
import { EditoriasView } from '../ui/views/EditoriasView';
import { MensagemView } from '../ui/views/MensagemView';
import { SlideView } from '../ui/views/SlideView';
import { Mensagem } from '../ui/models/Mensagem';

import { Slides } from "../ui/models/Slides";

class EditoriaController {
    constructor() {
        let $ = document.querySelector.bind(document);
        this._ordemAtual = '';

        this._editoriaService = new EditoriaService()

        this._editorias = new Bind(
            new Editorias(),
            new EditoriasView($("#editoriasView")),
            'esvazia', 'adiciona', 'ordena', 'inverteOrdem'
        );

        this._slides = new Bind(
            new Slides(),
            new SlideView($("#slideView")),
            'esvazia', 'adiciona', 'ordena', 'inverteOrdem'
        );

        /* this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($("#mensagemView")),
            'texto'); */

        this._init();
    }

    _init() {

        this._editoriaService.obtemEditorias()
            .then(editorias =>
                editorias.forEach(editoria =>
                    this._editorias.adiciona(editoria)
                ))
            .catch(erro => this._exibeErro(erro));

        this._editoriaService.obtemSlides()
            .then(imagens =>
                imagens.forEach(imagem =>
                    this._slides.adiciona(imagem)
                ))
            .catch(erro => this._exibeErro(erro));



        this._initMap();
        this._initGrafico();

    }

    ordena(campo) {
        if (this._ordemAtual != campo)
            this._editorias.ordena((a, b) => a[campo] - b[campo]);
        else
            this._editorias.inverteOrdem();

        this._ordemAtual = campo;
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
        var beachMarker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: image
        });
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