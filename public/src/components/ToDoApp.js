import Component from './Component.js';
import Header from './Header.js';
import ToDoList from './ToDoList.js';
import { getToDos, addToDo, updateToDo } from '../services/to-do-api.js';
import ToDoForm from './ToDoForm.js';

class ToDoApp extends Component {
    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');

        const toDoForm = new ToDoForm({
            onAdd: todo => {
                return addToDo(todo)
                    .then(saved => {
                        const todos = this.state.todos;
                        todos.push(saved);
                        toDoList.update({ todos });
                    });
            }
        });
        main.appendChild(toDoForm.renderDOM());

        const toDoList = new ToDoList({
            todos: [],
            onUpdate: todo => {
                return updateToDo(todo)
                    .then(updated => {
                        const todos = this.state.todos;

                        const index = todos.indexOf(todo);
                        todos.splice(index, 1, updated);

                        toDoList.update({ todos });
                    });
            }
        });
        main.appendChild(toDoList.renderDOM());

        getToDos()
            .then(todos => {
                this.state.todos = todos;
                toDoList.update({ todos });
            })
            .catch(err => {
                console.log(err);
            });
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