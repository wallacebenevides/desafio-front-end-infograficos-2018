import { htmlToElements } from "../util/helpers/domHelpers";
import { isFunction } from "../util/helpers/common-helpers";

const ATTRIBUTE_NAME = 'data-events';

export class Component {

    constructor(parentElement, doBeforeDidMount) {
        this._parentElement = parentElement;
        this._doBeforeDidMount = doBeforeDidMount;
        this._didMount = false;
    }

    update(model) {
        // ciclo de vida do component
        this.componentWillMount();

        let template = this.render(model);
        let events = new Map();
        let pattern = /\(([a-z]+)\)=["|']([a-zA-Z]+)\((\w*)\)["|']/;
        let regex = new RegExp(pattern, 'gm')
        let m;

        while ((m = regex.exec(template)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            // The result can be accessed through the `m`-variable.
            const [match, event, call, params] = m;

            const key = event + call + params;

            events.set(key, { event, call, params });

            template = template.split(match).join(`${ATTRIBUTE_NAME}="${key}"`);

            /* m.forEach((match, groupIndex) => {
                console.log(`Found match, group ${groupIndex}: ${match}`);
            }); */
        }

        // events.forEach((value, key) => console.log(value, key))
        if (events.size) {
            // console.log(template);
            let nodeList = htmlToElements(template);
            const addEvent = (node) => {
                if (node.hasAttribute && node.hasAttribute(ATTRIBUTE_NAME)) {
                    let key = node.getAttribute(ATTRIBUTE_NAME);
                    node.removeAttribute(ATTRIBUTE_NAME);
                    const { event, call, params } = events.get(key);
                    node.addEventListener(event, (event) => {
                        if (params === 'event') {
                            return this[call](event);
                        }
                        this[call](params);
                    });
                }
            }

            //console.log(nodeList);
            for (const node of nodeList) {
                if (node.nodeName === '#text') continue;

                addEvent(node);
                node.querySelectorAll(`*[${ATTRIBUTE_NAME}]`)
                    .forEach(addEvent);

                let childNode;

                for (const cNode of this._parentElement.childNodes) {
                    if (cNode.nodeType === node.nodeType
                        && cNode.nodeName === node.nodeName
                        && cNode.nodeValue === node.nodeValue
                        && cNode.localName === node.localName
                        && cNode.namespaceURI === node.namespaceURI
                        && cNode.prefix === node.prefix
                        && cNode.attributes.length === node.attributes.length
                        && cNode
                            .getAttributeNames()
                            .every(name => cNode.getAttribute(name) == node.getAttribute(name))
                    ) {
                        childNode = cNode;
                        break;
                    }
                }
                if (!childNode) {
                    this._parentElement.appendChild(node);
                } else if (!childNode.isEqualNode(node)) {
                    this._parentElement.replaceChild(node, childNode);
                }

            }
            return;

        }
        console.log(this._parentElement)
        this._parentElement.innerHTML = template;

        // ciclo de vida do component
        if (!this._didMount) {
            if (isFunction(this._doBeforeDidMount)){
                this._doBeforeDidMount();
            }
            this.componentDidMount();
            this._didMount = true;
        }
        this.componentChangeMount();
    }

    /**
     * Esse metódo será executado antes da criação do componente
     */
    componentWillMount() { }

    /**
     * Esse metódo será executado apenas uma vez após a criação do componente
     */
    componentDidMount() { }

    /**
     * Esse metódo será executado toda vez que houver mudancas no componente
     */
    componentChangeMount() { }

    render(model) {

        throw new Error('Você precisa implementar o método template');
    }
}
