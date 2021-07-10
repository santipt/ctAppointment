import React, { useState, useEffect } from 'react';
import './MainPage.css';

// Importing components
import CardPatient from '../../components/CardPatient';

// Importing Bootstrap components
import { Row, Col, Button } from 'react-bootstrap';

// Importing services
import { getAllPatients } from '../../services/PatientRoutes';


export default function MainPage() {
    const [listOfPatients, setListOfPatients] = useState([]);

    // Like componentDidMount y componentDidUpdate
    useEffect(() => {
        // Getting a list of al the patients in the database
        getAllPatients().then(res => {
            console.log(res)
            setListOfPatients(res)
        }).catch(err => {
            alert(err)
        });
    }, []);

    return (
        <div>
            <Row className="header_container">
                <h1>List of patients</h1>
                <Button className="register_button" variant="outline-dark">Register new patient</Button>
            </Row>
            <Row className="patients_container" >
                {listOfPatients.map((val, i) => {
                    return (
                        <Col key={i} xs="3" className="mb-4">
                            <CardPatient
                                key={val._id}
                                firstName={val.firstName}
                                lastName={val.lastName}
                                lastVisit={val.updatedAt}></CardPatient>
                        </Col>
                    )
                })}
                {/* <Col xs="3" className="mb-4">
                    <CreateClassButton square id={props.history.location.state}></CreateClassButton>
                </Col> */}
            </Row>
        </div>
    );
}