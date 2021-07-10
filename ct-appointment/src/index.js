import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';

// Importing pages
import MainPage from './pages/MainPage/MainPage'

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

class App extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/home">
                        <MainPage></MainPage>
                    </Route>
                    <Route path="/">
                        <MainPage></MainPage>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

// ========================================

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
