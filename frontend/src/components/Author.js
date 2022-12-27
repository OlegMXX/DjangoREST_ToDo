import React from 'react'

const AuthorItem = ({author}) => {
    return (
        <tr>
            <td>
                {author.id}
            </td>
            <td>
                {author.username}
            </td>
            <td>
                {author.firstname}
            </td>
            <td>
                {author.lastname}
            </td>
            <td>
                {author.email}
            </td>
        </tr>
    )
}

const AuthorList = ({authors}) => {
    return (
        <table>
            <td>
                id
            </td>
            <th>
                User name
            </th>
            <th>
                First name
            </th>
            <th>
                Last Name
            </th>
            <th>
                Email
            </th>
            {authors.map((author) => <AuthorItem author={author} />)}
        </table>
    )
}
export default AuthorList
