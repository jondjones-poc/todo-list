const todos = document.getElementById('todos');
const input = document.getElementById('input');
const form = document.getElementById('form');

const updateStorage = () => {
    const lis = document.querySelectorAll('li');

    const itemToStore = [...lis].map(li => {
        return {
            text: li.innerText,
            completed: li.classList.contains('completed')
        }
    });
    localStorage.setItem('todos', JSON.stringify(itemToStore))
}

const addTodo = (todo) => {
    let text = input.value;
    if (todo) {
        text = todo.text
    }
    
    if (text) {
        const todoEl = document.createElement('li');
        if(todo && todo.completed) {
            todoEl.classList.add('completed')
        }
        
        todoEl.innerText = text;
        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateStorage();
        })
        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoEl.remove();
            updateStorage();
        })
        
        
        todos.appendChild(todoEl);
        input.value = '';

        updateStorage();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
})


const storedTodos = JSON.parse(localStorage.getItem('todos'))
if (storedTodos) {
    storedTodos.forEach(todo => addTodo(todo))
}