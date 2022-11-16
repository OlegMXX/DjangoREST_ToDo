import React from 'react'


const AuthorItem = ({author}) => {
    return (
        <tr>
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
            <th>
                Username
            </th>
            <th>
                First name
            </th>
            <th>
                Last name
            </th>
            <th>
                Email
            </th>
            {authors.map((author) => <AuthorItem author={author} />)}
        </table>
    )
}

export default AuthorList
