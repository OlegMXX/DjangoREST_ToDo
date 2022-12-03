import React from 'react'

const TodoItem = ({todo}) => {
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
        </tr>
    )
}

const TodoList = ({todoes}) => {
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
            {todoes.map((todo) => <TodoItem todo={todo} />)}
        </table>
    )
}
export default TodoList