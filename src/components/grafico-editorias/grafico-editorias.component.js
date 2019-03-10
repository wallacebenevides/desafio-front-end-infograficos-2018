import { Bind } from "../../util";
import { Component } from "../component";
import './grafico-editorias.scss';

export class GraficoEditoriasComponent extends Component {
    constructor(parentElement) {
        super(parentElement);
        new Bind({}, this);
    }

    componentDidMount() {
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

    render(model) {
        return `<div class="limit">
                <div class="header__titulo">
                    <h2 class="font-1">Editorias mais Acessados</h2>
                </div>
                <div class="grafico-editoria-content">
                    <div class="grafico">
                        <svg class="grafico__item"></svg>
                    </div>

                    <div class="conteudo">
                        <div class="test">
                            <h2>Título Aqui</h2>
                            <p>
                                Mussum Ipsum, cacilds vidis litro abertis.
                                Sapien in monti palavris qui num significa
                                nadis i pareci latim. Mauris nec dolor in
                                eros commodo tempor. Aenean aliquam molestie
                                leo, vitae iaculis nisl.
                            </p>
                            <p>Mussum Ipsum, cacilds vidis litro abertis.
                                Sapien in monti palavris qui num significa
                                nadis i pareci latim. Mauris nec dolor in
                                eros commodo tempor. Aenean aliquam molestie
                                leo, vitae iaculis nisl.</p>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}
