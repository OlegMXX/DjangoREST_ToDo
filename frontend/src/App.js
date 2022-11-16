import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js'
import TopNavPanel from './components/Menu.js'
import Footer from './components/Footer.js'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'authors': []
    }
  }


  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/authapp/')
      .then(response => {
        const authors = response.data
          this.setState(
          {
           'authors': authors
          }
        )
      }).catch(error => console.log(error))
  }



/*
    const authors = [
      {
        'username': 'Hover',
        'firstname': 'Петр',
        'lastname': 'Григорьев',
        'email':'hoverpeter@mail.ru'
      },
      {
        'username': 'Ninja',
        'firstname': 'Василий',
        'lastname': 'Иванов',
        'email':'ninjavano@mail.ru'
      },
    ]



    this.setState(
      {
      'authors': authors
      }
    )
  }
*/
  

  render () {
    return (
      <div>
        <TopNavPanel />
        <AuthorList authors={this.state.authors} />
        <Footer />
      </div>
    )
  }
}

export default App;
