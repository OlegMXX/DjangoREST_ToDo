import React from 'react'

const TodoItem = ({todo, delete_todo}) => {
    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {todo.created_at}
            </td>
            <td>
                {todo.updated_at}
            </td>
            <td>
                {todo.created_by}
            </td>
            <td>
                {todo.active}
            </td>
            <td>
                <button onClick={()=>delete_todo(todo.id)} type='button'>Delete</button>
            </td>

        </tr>
    )
}

const TodoList = ({todoes, delete_todo}) => {
    return (
        <table>
            <th>
                Project
            </th>
            <th>
                Text
            </th>
            <th>
                Created at
            </th>
            <th>
                Updated at
            </th>
            <th>
                Created by
            </th>
            <th>
                Active
            </th>
            <th>
            </th>
            {todoes.map((todo) => <TodoItem todo={todo} delete_todo={delete_todo} />)}
        </table>
    )
}
export default TodoList