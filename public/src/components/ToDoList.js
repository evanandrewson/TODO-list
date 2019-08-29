import Component from './Component.js';
import ToDoItem from './ToDoItem.js';

class ToDoList extends Component {
    onRender(list) {
        const todos = this.props.todos;
        const onUpdate = this.props.onUpdate;

        todos.forEach(todo => {
            const toDoItem = new ToDoItem({ todo, onUpdate });
            list.appendChild(toDoItem.renderDOM());
        });
    }
    renderHTML() {
        return /*html*/`
            <ul class="to-do"></ul>
        `;
    }
}

export default ToDoList;