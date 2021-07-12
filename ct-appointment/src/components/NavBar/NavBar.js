import React from 'react';
import './NavBar.css';

import { Button, Navbar, Nav, NavDropdown, FormControl, Form, } from 'react-bootstrap';

export default function MyNavbar(props) {

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">CT APOINTMENT</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav activeKey={props.active}
                    className="mr-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/visits">All Visits</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}