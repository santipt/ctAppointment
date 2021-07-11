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
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

// Importing usefull functions
import convertDateFormat from '../../utils/convertDateFormat';

export default function VisitCard(props) {


    const [medications, setMedications] = useState([]);
    const [toggleAccordion, setToggleAccordion] = useState(false);
    // In order to verify that the forEach is runned only once
    const [firstLoad, setFirstLoad] = useState(true);

    const handleToggleAccordion = () => setToggleAccordion(!toggleAccordion);

    function handleAddNewMedication(e) {
        e.preventDefault() // In order to not refresh
        setMedications(medications => [...medications, {addMedication: true}]);
    }

    function updateMedicationList(medicationId) {
        setMedications(medications.filter(({ _id }) => _id !== medicationId));
    }

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
            <Accordion>
                <Card className="visit_card_container">
                    <Accordion.Toggle onClick={handleToggleAccordion} className="header_card_container" as={Card.Header} eventKey="0" >
                        <Card.Title className="title_visit_card">{convertDateFormat(props.dateOfVisit)}</Card.Title>
                        {toggleAccordion ? <BsChevronUp size={20} color="black" /> : <BsChevronDown size={20} color="black" />}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Card.Text>Consult: {props.consult}</Card.Text>
                            <Card.Text>Reason of visit: {props.reasonOfVisit}</Card.Text>
                            {/* MEDICATIONS */}
                            <Form.Group className="mb-3" >
                                <div className="mb-4 header_medication">
                                    <Form.Label className="font-weight-bold ">Medications</Form.Label>
                                    <Button onClick={handleAddNewMedication} variant="outline-dark" type="submit" className="ml-3 add_medication_button">
                                        Add new medication
                                    </Button>
                                </div>
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
                                                        medicationData={val}
                                                        updateMedicationList={updateMedicationList}
                                                    ></MedicationCard>
                                                </Col>
                                            )
                                        }) : null}
                                </Row>
                            </Form.Group>
                            <Button variant="outline-danger" onClick={props.closeModal}>
                                Delete visit
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