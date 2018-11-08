
import {setFilters} from './filters'
import {renderTodos} from './views'
import {createTodo, loadTodos} from './todos';

renderTodos()

document.querySelector('#search-todo').addEventListener('input', e => {
    setFilters({searchText: e.target.value})
    renderTodos()
})

document.querySelector('#hide-completed').addEventListener('change', e => {
    setFilters({hideCompleted: e.target.checked})
    renderTodos()
})

document.querySelector('#add-todo').addEventListener('submit', function(e){
    const text = e.target.elements.newTodo.value.trim()
    e.preventDefault()
    if (text.length > 0) {
        createTodo(text)
        renderTodos()
        e.target.elements.newTodo.value = ''
    }
})

window.addEventListener('storage', e =>{
    if (e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})
