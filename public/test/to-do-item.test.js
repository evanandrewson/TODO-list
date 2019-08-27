import ToDoItem from '../src/components/ToDoItem.js';

const test = QUnit.test;

QUnit.module('render to do item');

test('render to do item', assert => {
    // arrange
    const todo = {
        id: 1,
        item: 'do laundry',
        completed: false
    };
    const expected = `
    <li class="to-do">
        // eslint-disable-next-line no-useless-escape
        <span class="\">do laundry</span>
        <div>
            <button class="inactive-button">
                Make Inactive
            </button>
            <button class="remove-button">
                🗑
            </button>
        </div>
    </li>
    `;
    // act
    const toDoItem = new ToDoItem({ todo });
    const html = toDoItem.renderHTML();
    
    // assert
    assert.htmlEqual(html, expected);
});