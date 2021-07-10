import React from 'react';
import './MainPage.css';

export default class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <div>
                <h1>MainPage</h1>
            </div>
        );
    }
}