import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import jwtDecode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'

import * as authActions from './actions/authActions'
import * as profileActions from './actions/profileActions'

import PrivateRoute from './components/common/PrivateRoute'
import Url from './constants/Url'

import Login from './views/auth/Login'

import CreateProfile from './views/profile/CreateProfile'
import EditProfile from './views/profile/EditProfile'
import DisplayProfile from './views/profile/DisplayProfile'

import Dashboard from './views/dashboard/Dashboard'
import AddEducation from './views/education/AddEducation'
import AddExperience from './views/experience/AddExperience'

import Footer from './components/layout/Footer'
import Landing from './views/landing/Landing'
import Navbar from './components/layout/Navbar'

import Register from './views/auth/Register'

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

        // Clear out current profile
        store.dispatch(profileActions.clearCurrentProfile())

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
                            <Route exact path={Url.HOME} component={Landing} />
                            <Route exact path={Url.LOGIN} component={Login} />
                            <Route
                                component={Register}
                                exact
                                path={Url.REGISTER}
                            />
                            <Switch>
                                <PrivateRoute
                                    exact
                                    path={Url.DASHBOARD}
                                    component={Dashboard}
                                />
                                <PrivateRoute
                                    exact
                                    path={Url.CREATE_PROFILE}
                                    component={CreateProfile}
                                />
                                <PrivateRoute
                                    exact
                                    path={`${Url.DISPLAY_PROFILE}/:handle`}
                                    component={DisplayProfile}
                                />
                                <PrivateRoute
                                    exact
                                    path={Url.EDIT_PROFILE}
                                    component={EditProfile}
                                />
                                <PrivateRoute
                                    exact
                                    path={Url.ADD_EDUCATION}
                                    component={AddEducation}
                                />
                                <PrivateRoute
                                    exact
                                    path={Url.ADD_EXPERIENCE}
                                    component={AddExperience}
                                />
                            </Switch>
                        </main>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App
