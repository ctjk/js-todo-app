import {getTodos, removeTodo, toggleTodo} from './todos'
import {getFilters} from './filters';

const renderTodos = () => {
    const todoEl = document.querySelector('#todos')    
    const filteredTodos = getTodos().filter(todo => 
        todo.text.toLowerCase().includes(getFilters().searchText.toLowerCase()) 
                && (!getFilters().hideCompleted || !todo.completed)
    )
    const incompleteTodos = getTodos().filter(todo => !todo.completed)

    todoEl.innerHTML = ''

    // print summary message
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))

    if (filteredTodos.length > 0) {
        // list filtered todos
        filteredTodos.forEach(todo => {
            todoEl.appendChild(generateTodoDOM(todo))
        });
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'There are no todos to show'
        emptyMessage.classList.add('empty-message')
        todoEl.appendChild(emptyMessage)
    }
}

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoTextEl = document.createElement('span')
    const removeButton = document.createElement('button')

    // set up checkbox
    checkbox.type = 'checkbox'  
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', e => {
        toggleTodo(todo.id)
        renderTodos()
    })
   
    // set up todo text
    todoTextEl.textContent = todo.text
    containerEl.appendChild(todoTextEl)
    
    // set up container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // set up remove buttom
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    removeButton.addEventListener('click', e =>{
        removeTodo(todo.id)
        renderTodos()
    })
    todoEl.appendChild(removeButton)
    
    return todoEl
}

const generateSummaryDOM = (incompleteTodos) => {
    const summaryEl = document.createElement('h2')
    const plural = incompleteTodos.length === 1 ? '' : 's'
    summaryEl.textContent = `You have ${incompleteTodos.length} todo${plural} left.`
    summaryEl.classList.add('list-title')
    return summaryEl
}

export {renderTodos}
