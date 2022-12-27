import React from 'react'

//text, active, project, created_by,
class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {text: '', project: '', created_by: ''}
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



    handleSubmit(event) {
        this.props.create_todo(this.state.text, this.state.project,this.state.created_by)
        console.log(this.state.authors)
            event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="text">text</label>
                    <input type="text" name="text" placeholder="text"
                        value={this.state.text} onChange={(event)=>this.handleChange(event)} />
                </div>

                <div className="form-group">
                    <label htmlFor="project">link</label>
                    <input type="number" name="project" placeholder="project"
                           value={this.state.project} onChange={(event)=>this.handleChange(event)} />
                 </div>

                <div className="form-group">
                    <label htmlFor="created by">link</label>
                    <input type="number" name="created_by" placeholder="created_by"
                           value={this.state.created_by} onChange={(event)=>this.handleChange(event)} />
                 </div>



                <input type="submit" value="Save" />
            </form>);
    }
}
    export default TodoForm