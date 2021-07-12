import React, { useState, useEffect } from 'react';
import './MainPage.css';

// Importing components
import PatientCard from '../../components/PatientCard/PatientCard';
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
            <div className="header_container">
                <div className="title_container">
                    <h1>List of patients</h1>
                    <Button
                        className="register_button"
                        variant="outline-dark"
                        onClick={handleShowRegisterModal}><BsPlus size={25} /></Button>
                </div>
                <div className="filter_container">
                    <Form.Group className="filter">
                        <Form.Control type="text" placeholder="Filter by name" onChange={handleChangeFilter} />
                    </Form.Group>
                    <Button className="toggle_view_button" variant="outline-dark" onClick={handleToggleView}>{toggleView ? <BsFillGridFill size={20} /> : <BsList size={25} />}</Button>
                </div>
            </div>
            {!toggleView ? <Row className="patients_container" >
                {filteredPatients != [] ?
                    filteredPatients.map((val, i) => {
                        return (
                            <Col key={i} xs="3" className="mb-4">
                                <PatientCard
                                    key={val._id}
                                    firstName={val.firstName}
                                    lastName={val.lastName}
                                    lastVisit={val.updatedAt}
                                    data={val}
                                ></PatientCard>
                            </Col>
                        )
                    }) : null
                }
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