import React from 'react'

const ProjectItem = ({project, delete_project}) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.repo_link}
            </td>
            <td>
                {project.authors}
            </td>
            <td>
                <button onClick={()=>delete_project(project.id)} type='button'>Delete</button>
            </td>

        </tr>
    )
}

const ProjectList = ({projects, delete_project}) => {
    return (
        <table>
            <th>
                Name
            </th>
            <th>
                Repo Link
            </th>
            <th>
                Authors
            </th>
            <th>
            </th>
 
            {projects.map((project) => <ProjectItem project={project} delete_project={delete_project}/>)}
        </table>
    )
}
export default ProjectList