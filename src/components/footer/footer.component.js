import { Component } from "../component";
import "./footer.scss";

export class FooterComponent extends Component {
    constructor(parentElement) {
        super(parentElement);
        this.update();
    }

    render() {
        return `<div class="footer limit">
            <p>&copy; Entrevista | Front End </p>
        </div>`;
    }

}
