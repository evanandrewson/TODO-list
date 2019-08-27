import Component from './Component.js';

class ToDoItem extends Component {
    onRender(dom) {
        const todo = this.props.todo;
        const onUpdate = this.props.onUpdate;

        const inactiveButton = dom.querySelector('.inactive-button');
        inactiveButton.addEventListener('click', () => {
            todo.completed = !todo.completed;
            onUpdate(todo);
        });
    }
    renderHTML() {
        const todo = this.props.todo;

        return /*html*/`
        <li class="cat-type">
            <span class="${todo.completed ? 'inactive' : ''}">${todo.item}</span>
            <div>
                <button class="inactive-button">
                    Make ${todo.completed ? 'Active' : 'Inactive'}
                </button>
                <button class="remove-button">
                    🗑
                </button>
            </div>
        </li>
        `;
    }
}

export default ToDoItem;