import React, { useState, useEffect } from 'react';
import './VisitCard.css';

// Importing components
import MedicationCard from '../MedicationCard/MedicationCard';

// Importing Bootstrap components
import { Card, Accordion, Button, Form, Col, Row } from 'react-bootstrap';

// Importing services
import { } from '../../services/VisitRoutes';
import { getAMedication } from '../../services/MedicationRoutes';

// Importing icons
import { BsFillTrashFill } from "react-icons/bs";

// Importing usefull functions
import convertDateFormat from '../../utils/convertDateFormat';

export default function VisitCard(props) {


    const [medications, setMedications] = useState([]);
    // In order to verify that the forEach is runned only once
    const [firstLoad, setFirstLoad] = useState(true);

    // Like componentDidMount y componentDidUpdate
    useEffect(() => {

        console.log("VISITS", props.visiData)

        // Getting the medication data
        if (props.visiData != undefined && props.visiData.prescribedMedication != undefined && firstLoad == true) {

            setFirstLoad(false)

            console.log("MEDICATION", props.visiData.prescribedMedication)

            var listOfMedications = props.visiData.prescribedMedication;

            listOfMedications.forEach(med => {
                getAMedication(med._id).then(res => {
                    console.log("MEDICATION INFO", res)
                    setMedications(medications => [...medications, res]);
                }).catch(err => {
                    alert(err)
                });
            })

        }
    }, []);

    if (props.visitData != []) {

        return (
            <Accordion defaultActiveKey="0">
                <Card className="visit_card_container">
                <Card.Header className="header_card_container">
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <Card.Title className="title_visit_card">{convertDateFormat(props.dateOfVisit)}</Card.Title>

                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                    <Card.Text>Consult: {props.consult}</Card.Text>
                    <Card.Text>Reason of visit: {props.reasonOfVisit}</Card.Text>
                    <Card.Text>Medications: {props.reasonOfVisit}</Card.Text>
                    {/* MEDICATIONS */}
                    <Form.Group className="mb-3" >
                        <Form.Label className="font-weight-bold">Medications</Form.Label>
                        <Button variant="outline-dark" type="submit" className="ml-3">
                            Add new medication
                        </Button>
                        <Row className="medications_container" >
                            {medications != [] ?
                                medications.map((val, i) => {
                                    return (
                                        <Col key={i} xs="4" className="mb-4">
                                            <MedicationCard
                                                key={val._id}
                                                name={val.name}
                                                dose={val.dose}
                                                packageSize={val.packageSize}
                                            ></MedicationCard>
                                        </Col>
                                    )
                                }) : null}
                        </Row>
                    </Form.Group>
                    <Button variant="secondary" onClick={props.closeModal}>
                        <BsFillTrashFill />
                    </Button>
                </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    } else {
        return (null)
    }

}