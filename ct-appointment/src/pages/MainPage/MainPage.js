import React, { useState, useEffect } from 'react';
import './MainPage.css';

// Importing components
import CardPatient from '../../components/CardPatient/CardPatient';
import ListItemPatient from '../../components/ListItemPatient/ListItemPatient';
import RegisterModal from '../../components/RegisterModal/RegisterModal';

// Importing Bootstrap components
import { Row, Col, Button, Form, Table, Dropdown, DropdownButton, Container } from 'react-bootstrap';

// Importing services
import { getAllPatients } from '../../services/PatientRoutes';

// Importing icons
import { BsList, BsFillGridFill, BsPlus } from "react-icons/bs";


export default function MainPage() {

    const [toggleView, setToggleView] = useState(false);
    const [listOfPatients, setListOfPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleShowRegisterModal = () => setShowRegisterModal(!showRegisterModal);
    const handleToggleView = () => setToggleView(!toggleView);

    function handleChangeFilter(e) {

        var patients = listOfPatients.filter(function (patient) {
            return patient.firstName.toLowerCase().startsWith(e.target.value.toLowerCase())
        });

        setFilteredPatients(patients)

    }

    // Like componentDidMount y componentDidUpdate
    useEffect(() => {

        // Getting a list of al the patients in the database
        getAllPatients().then(res => {
            //console.log(res)
            setListOfPatients(res)
            setFilteredPatients(res)
        }).catch(err => {
            alert(err)
        });

    }, []);

    return (
        <div>
            <Container className="header_container">
                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <h1>List of patients</h1>
                    </Col>
                    <Col>
                        <Button
                            className="register_button"
                            variant="outline-dark"
                            onClick={handleShowRegisterModal}><BsPlus  size={25}/></Button>
                    </Col>
                    <Col md="auto"></Col>
                    <Col md="auto">
                        <Form.Group>
                            <Form.Control className="filter" type="text" placeholder="Filter" onChange={handleChangeFilter} />
                        </Form.Group>
                    </Col>
                    {/* <Col xs lg="2">
                        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </DropdownButton>
                    </Col> */}
                    <Col md="auto">
                        <Button className="toggle_view_button" variant="outline-dark" onClick={handleToggleView}>{toggleView ? <BsFillGridFill  size={20}/> : <BsList  size={25}/>}</Button>
                    </Col>


                </Row>

            </Container>
            {!toggleView ? <Row className="patients_container" >
                {filteredPatients.map((val, i) => {
                    return (
                        <Col key={i} xs="3" className="mb-4">
                            <CardPatient
                                key={val._id}
                                firstName={val.firstName}
                                lastName={val.lastName}
                                lastVisit={val.updatedAt}
                                data={val}
                            ></CardPatient>
                        </Col>
                    )
                })}
            </Row> :
                <div className="table_container">
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Last visit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((val, i) => {
                                return (
                                    <ListItemPatient
                                        key={val._id}
                                        firstName={val.firstName}
                                        lastName={val.lastName}
                                        lastVisit={val.updatedAt}
                                        data={val}
                                    ></ListItemPatient>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            }
            <RegisterModal show={showRegisterModal} closeModal={handleShowRegisterModal}></RegisterModal>
        </div>
    );
}