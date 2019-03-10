import { Component } from "../component";
import "./localizacao.scss";

export class LocalizacaoComponent extends Component {
    constructor(parentElement) {
        super(parentElement);
        this.update()
    }

    componentDidMount() {
        var myLatLng = { lat: -25.363, lng: 131.044 };
        var elemento = document.querySelector("#localizacao-content");
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

    render() {
        return `<div id="localizacao-content" class="limit">
        </div>`;

    }
}
