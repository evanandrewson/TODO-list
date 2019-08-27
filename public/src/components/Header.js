import Component from './Component.js';

class Header extends Component {
    renderHTML() {
        return /*html*/`
        <header>
            <img src="./public/assets/logo.png" alt="logo">
            <h1>To Do List</h1>
        </header>
        `;
    }
}

export default Header;