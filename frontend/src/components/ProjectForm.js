import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {name: '', repo_link: '', authors: []}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
        console.log(event.target.name)
        console.log(event.target.value)
    }

    handleAuthorChange(event) {

        if(!event.target.selectedOptions){
            this.setState({
                'authors': []
            })

            return;
        }
        let authors = []
        for(let i = 0; i < event.target.selectedOptions.length;i++){
            authors.push(event.target.selectedOptions.item(i).value)
            console.log(event.target.selectedOptions.item(i))
        }
        console.log(authors)
        this.setState(
            {'authors':authors}
        )
        console.log(this.state)
        console.log(this.state.authors.value)
    }


    handleSubmit(event) {
        this.props.create_project(this.state.name, this.state.repo_link,this.state.authors)
        console.log(this.state.authors)
            event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="name">name</label>
                    <input type="text" name="name" placeholder="name"
                        value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label htmlFor="repo_link">link</label>
                    <input type="text" name="repo_link" placeholder="repo_link"
                           value={this.state.repo_link} onChange={(event)=>this.handleChange(event)} />
                 </div>

                <select name="authors" multiple
                        onChange={(event) => this.handleAuthorChange(event)}>
                    {this.props.authors.map((item)=> <option
                        value={item.id}>{item.username}</option>)}
                </select>

                <input type="submit" value="Save" />
            </form>);
    }
}
    export default ProjectForm