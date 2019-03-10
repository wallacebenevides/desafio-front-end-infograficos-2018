import { Component } from "../component";
import './header.scss';

export class HeaderComponent extends Component {
    constructor(parentElement) {
        super(parentElement);
        this.update();
    }

    render() {
        return `<div class="header__container limit">
                <div class="logo">
                    <a href="#">
                        <h1><img src="../../assets/img/logo-marca.png" alt="Minuto News"></h1>
                    </a>
                </div><!-- /.logo -->

                <nav role="navegacao">
                    <ul class="menu">
                        <li class="menu__item"><a href="#" class="menu__link">Início</a></li>
                        <li class="menu__item sub-menu"><a href="#" class="menu__link">Brasil</a>
                            <ul class="sub-menu__container">
                                <li class="sub-menu__item"><a href="#">SubMenu 01</a></li>
                                <li class="sub-menu__item"><a href="#">SubMenu 02</a></li>
                                <li class="sub-menu__item"><a href="#">SubMenu 03</a></li>
                                <li class="sub-menu__item"><a href="#">SubMenu 04</a></li>
                                <li class="sub-menu__item"><a href="#">SubMenu 05</a></li>
                            </ul>
                        </li>
                        <li class="menu__item"><a href="#" class="menu__link">Mundo</a></li>
                        <li class="menu__item"><a href="#" class="menu__link">Blogs</a></li>
                        <li class="menu__item"><a href="#" class="menu__link">Assine</a></li>
                    </ul>
                </nav>
            </div>`;
    }



}
