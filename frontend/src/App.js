import React from 'react';
import logo from './logo.svg';
import './App.css';
import TopNavPanel from './components/Menu';
import Footer from './components/Footer';
import AuthorList from './components/Author.js';
import TodoList from './components/Todo.js';
import ProjectList from './components/Project';
import NotFound404 from './components/NotFound404';
import LoginForm from './components/Auth';
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";
import axios from 'axios';
import {BrowserRouter, Route, Routes, Link, Navigate} from "react-router-dom"
import Cookies from "universal-cookie";


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'authors': [],
            'todoes': [],
            'projects': [],
            'token': ''
        }
    }

    create_todo(text, project, created_by) {
        const headers = this.get_headers()
        const data = {text: text, project: project, created_by: created_by}
        axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers}).then(response => {
            this.load_data()
        }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }

    delete_todo(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers}).then(response => {
            this.load_data()
        }).catch(error => {
            this.setState({todoes: []})
        })
    }

    create_project(name, repo_link, authors) {
        const headers = this.get_headers()
        const data = {name: name, repo_link: repo_link, authors: authors}
        axios.post(`http://127.0.0.1:8000/api/project/`, data, {headers}).then(response => {
            this.load_data()
        }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })
    }


    delete_project(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/project/${id}`, {headers}).then(response => {
            this.load_data()
        }).catch(error => {
            this.setState({projects: []})
        })
    }


    logout() {
        this.set_token('')
        this.setState({'authors': []})
        this.setState({'todoes': []})
        this.setState({'projects': []})
    }

    is_auth() {
        return !!this.state.token

    }

    set_token(token) {
        console.log(token)
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())

    }

    get_token_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())

    }

    get_token(username, password) {
        const data = {username: username, password: password}
        console.log(data)
        axios.post('http://127.0.0.1:8000/api-token-auth/', data).then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))

    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers

    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/api/authors/', {headers})
            .then(response => {
                const authors = response.data
                this.setState(
                    {
                        'authors': authors
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
                this.setState(
                    {
                        'todoes': response.data
                    }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/project/', {headers})
            .then(response => {
                this.setState(
                    {
                        'projects': response.data
                    }
                )
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.get_token_storage()
    }

    render() {
        return (
            <div>
                <TopNavPanel/>
                <BrowserRouter>
                    <nav>
                        <li><Link to='/authors'>Authors</Link></li>
                        <li><Link to='/todoes'>Todoes</Link></li>
                        <li><Link to='/projects'>Projects</Link></li>
                        <li>{this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> :
                            <Link to='/login'>Login</Link>}</li>

                    </nav>
                    <Routes>
                        <Route exact path='/authors' element={<AuthorList authors={this.state.authors}/>}/>
                        <Route exact path='/todoes' element={<TodoList todoes={
                            this.state.todoes} delete_todo={(id) => this.delete_todo(id)}/>}/>
                        <Route exact path='/todoes/create' element={<TodoForm project={
                            this.state.project} created_by={this.state.created_by} create_todo={
                            (text, project, created_by) => this.create_todo(text, project, created_by)}/>}/>
                        <Route exact path='/projects' element={<ProjectList projects={
                            this.state.projects} delete_project={(id) => this.delete_project(id)}/>}/>
                        <Route exact path='/projects/create' element={<ProjectForm authors={
                            this.state.authors} create_project={
                            (name, repo_link, authors) => this.create_project(name, repo_link, authors)}/>}/>
                        <Route exact path='/login' element={<LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
                        <Route path='*' element={<NotFound404/>}/>
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;
