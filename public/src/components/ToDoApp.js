import Component from './Component.js';
import Header from './Header.js';

class ToDoApp extends Component {
    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <main>
                </main>
            <div>
        `;
    }
}

export default ToDoApp;