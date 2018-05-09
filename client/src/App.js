import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import SplashPage from './components/layout/SplashPage'

import Register from './components/auth/Register'
import Login from './components/auth/Login'

import './app.css'

class App extends Component {
    render() {
        return (
            <Router>
                <div className="app">
                    <Navbar>
                        <Link to="/register" className="navbar-item">
                            Sign Up
                        </Link>
                        <Link to="/login" className="navbar-item">
                            Login
                        </Link>
                    </Navbar>
                    <main role="main">
                        <Route exact path="/" component={SplashPage} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </main>
                    <Footer />
                </div>
            </Router>
        )
    }
}

export default App
