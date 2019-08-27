import Component from './Component.js';

class ToDoForm extends Component {

    onRender(dom) {
        const onAdd = this.props.onAdd;
        const form = dom.querySelector('form');
        const input = dom.querySelector('input[name=todo]');

        form.addEventListener('submit', event => {
            event.preventDefault();

            const todo = {
                item: input.value
            };

            onAdd(todo)
                .then(() => {
                    form.reset();
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }
    renderHTML() {
        return /*html*/`
        <section>
            <form class="todo-form">
                <input name="todo" required>
                <button>Add</button>
            </form>
        </section>
        `;
    }
}

export default ToDoForm;