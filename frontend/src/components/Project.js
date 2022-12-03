import React from 'react'

const ProjectItem = ({project}) => {
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
        </tr>
    )
}

const ProjectList = ({projects}) => {
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
 
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}
export default ProjectList