import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import jwtDecode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import * as authActions from './actions/authActions'

import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import './app.css'

// Check for token
if (localStorage.jwtToken) {
    // Set the auth token header auth
    setAuthToken(localStorage.jwtToken)
    // Decode token and get user info and exp
    const decoded = jwtDecode(localStorage.jwtToken)
    // Set user and isAuthenticated
    store.dispatch(authActions.setCurrentUser(decoded))

    // Check for expired token
    const currentTime = Date.now() / 1000

    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(authActions.logoutUser())

        // Redirect to loginUser
        window.location.href = '/login'
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="app">
                        <Navbar />
                        <main role="main">
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/login" component={Login} />
                            <Route
                                component={Register}
                                exact
                                path="/register"
                            />
                        </main>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App
