import React from 'react'
//import {BrowserRouter} from "react-router-dom"

function TopNavPanel() {
    return (
      //<BrowserRouter>
      <div class="topnav">
        <a class="active" href="/todoes">Todo</a>
        <a href="/authors">Authors</a>
        <a href="/projects">Projects</a>
        <a href="#about">About</a>
      </div>
      //</BrowserRouter>
    );
}


export default TopNavPanel