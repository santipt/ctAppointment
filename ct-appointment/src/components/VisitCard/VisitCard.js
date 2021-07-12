import React, { useState, useEffect } from 'react';
import './VisitCard.css';

// Importing components
import MedicationCard from '../MedicationCard/MedicationCard';

// Importing Bootstrap components
import { Card, Accordion, Button, Form, Col, Row } from 'react-bootstrap';

// Importing services
import { addNewMedication } from '../../services/MedicationRoutes';
import { updateVisit } from '../../services/VisitRoutes';
import { getAMedication } from '../../services/MedicationRoutes';

// Importing icons
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

// Importing usefull functions
import convertDateFormat from '../../utils/convertDateFormat';

export default function VisitCard({ ...props }) {

    const [medications, setMedications] = useState([]);
    const [toggleAccordion, setToggleAccordion] = useState(false);
    // In order to verify that the forEach is runned only once
    const [firstLoad, setFirstLoad] = useState(true);

    const handleToggleAccordion = () => { setToggleAccordion(!toggleAccordion) };

    // ADDING NEW MEDICATION
    function handleAddNewMedicationCard(event) {
        event.preventDefault() // In order to not refresh

        if (!medications.some(m => m.addMedication === true)) {
            setMedications(medications => [...medications, { addMedication: true }]);
        }

    }

    function handleRemoveNewMedicationCard(e) {
        e.preventDefault() // In order to not refresh
        setMedications(medications.filter(({ addMedication }) => addMedication !== true));
        setMedications(props.visitData.prescribedMedication.filter(({ addMedication }) => addMedication !== true));
    }

    function updateMedicationList(medicationId) {
        setMedications(medications.filter(({ _id }) => _id !== medicationId));
    }

    // Saving new medication in the database
    function handleSaveNewMedication(event, name, dose, packageSize) {
        event.preventDefault() // In order to not refresh

        if (name != null && dose != null && packageSize != null) {
            console.log("Adding new medication")
            addNewMedication(name, dose, packageSize).then(res => {
                console.log("New medication added", res)
                setMedications(medications => [...medications, res]);

                // Adding new medication to the visit data
                props.visitData.prescribedMedication.push(res)
                var updatedVisitData = props.visitData;

                // Update medication patient in the visit
                updateVisit(updatedVisitData).then(visit => {
                    console.log("Visit updated", visit)
                    handleRemoveNewMedicationCard(event)
                    window.location.reload();
                }).catch(err => {
                    alert(err)
                    handleRemoveNewMedicationCard(event)
                })
            }).catch(err => {
                alert(err)
            })
        } else {
            alert("You must fill all the parameters")
        }
    }


    // Like componentDidMount y componentDidUpdate
    useEffect(() => {

        // If the component is render from the all visits page
        // it needs to get the data of the medication
        if (props.getMedicationInfo == true && props.visitData != undefined && props.visitData.prescribedMedication != undefined) {

            setFirstLoad(false)

            var listOfMedicationIds = props.visitData.prescribedMedication;

            // Saving list of medications with information
            listOfMedicationIds.forEach((medicationId, index) => {
                getAMedication(medicationId).then(res => {
                    setMedications(medications => [...medications, res]);
                }).catch(err => {
                    alert(err)
                })

            });
        } else {
            // Getting the medication data
            if (props.visitData != undefined && props.visitData.prescribedMedication != undefined) {
                setMedications(props.visitData.prescribedMedication);
            }
        }

    }, []);

    if (props.visitData != []) {
        return (
            <Accordion>
                <Card className={props.getMedicationInfo ? "visit_card_container_all_visits" :"visit_card_container"}>
                    <Accordion.Toggle onClick={handleToggleAccordion} className="header_card_container" as={Card.Header} eventKey="0" >
                        <Card.Title className="title_visit_card">{convertDateFormat(props.dateOfVisit)}</Card.Title>
                        {toggleAccordion ? <BsChevronUp size={20} color="black" /> : <BsChevronDown size={20} color="black" />}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Card.Text className="font-weight-bold ">Consult</Card.Text>
                            <Card.Text>{props.consult}</Card.Text>
                            <Card.Text className="font-weight-bold ">Reason of visit</Card.Text>
                            <Card.Text>{props.reasonOfVisit}</Card.Text>
                            {/* MEDICATIONS */}
                            <Form.Group className="mb-3" >
                                <div className="mb-3 header_medication">
                                    <Form.Label className="font-weight-bold ">Medications</Form.Label>
                                    {props.getMedicationInfo != true ?
                                        <Button onClick={handleAddNewMedicationCard} variant="outline-dark" type="submit" className="ml-3 add_medication_button">
                                            Add new medication
                                        </Button>
                                        : null
                                    }
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
                                                        handleRemoveNewMedicationCard={handleRemoveNewMedicationCard}
                                                        handleSaveNewMedication={handleSaveNewMedication}
                                                        getMedicationInfo={props.getMedicationInfo}
                                                    ></MedicationCard>
                                                </Col>
                                            )
                                        }) : null}
                                </Row>
                            </Form.Group>
                            {props.getMedicationInfo != true ?
                                <Button variant="outline-danger" onClick={(event) => { props.handleDeleteVisit(event, props.visitData) }}>
                                    Delete visit
                                </Button> : null}
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    } else {
        return (null);
    }
}