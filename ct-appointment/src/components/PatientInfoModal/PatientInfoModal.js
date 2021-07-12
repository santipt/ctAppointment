import React, { useEffect, useState } from 'react';
import './PatientInfoModal.css';

// Importing date picker component
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Importing Bootstrap components
import { Modal, Button, Form, Col, Row, Card, Accordion } from 'react-bootstrap';

// Importing component
import VisitCard from '../VisitCard/VisitCard';

// Importing services
import { addNewVisit, deleteVisit } from '../../services/VisitRoutes';
import { updatePatient } from '../../services/PatientRoutes';

export default function PatientInfoModal({updatePatientData, patientData, closeModal, updateVisitsList, ...props}) {

    const [showAddVisitCard, setShowAddVisitCard] = useState(false);
    const [reasonOfVisit, setReasonOfVisit] = useState(null);
    const [consult, setConsult] = useState(null);
    const [dateOfVisit, setDateOfVisit] = useState(null);

    // ADDING NEW VISIT
    function handleAddNewVisitCard(event) {
        event.preventDefault() // In order to not refresh
        setShowAddVisitCard(true)
    }

    function handleRemoveNewVisitCard(event) {
        event.preventDefault() // In order to not refresh
        setDateOfVisit(null)
        setShowAddVisitCard(false)
    }

    function handleSaveNewVisit(event) {
        event.preventDefault() // In order to not refresh

        if (reasonOfVisit != null && consult != null && dateOfVisit != null) {
            console.log("Add new visit")

            var data = {
                reasonOfVisit: reasonOfVisit,
                consult: consult,
                patient: patientData._id,
                dateOfVisit: dateOfVisit,
            }

            addNewVisit(data).then(res => {
                console.log("New visit added")
                console.log(res)

                // Adding id visit to list of visits ids of the patient
                patientData.visits.push(res._id);
                var updatedPatientData = patientData;

                updatePatient(updatedPatientData).then(res => {
                    updatePatientData(res)
                })

                setShowAddVisitCard(false)

                // Adding new visit to the visit array
                updateVisitsList(res, false)
                // Updating patientData prop
                updatePatientData(patientData)

            }).catch(err => {
                alert(err)
            })
        } else {
            alert("You must fill all the parameters")
        }
    }
    function handleDeleteVisit(event, visitData) {

        console.log("Deleting visit: ", visitData)

        if (visitData._id != undefined) {

            deleteVisit(visitData._id).then(res => {

                // Delete visit id from the list of visits of the patient
                var newVisits = patientData.visits.filter(( visit ) => visit !== visitData._id)
                patientData.visits = newVisits;
                var updatedPatientData = patientData;

                // Updating visits ids of the patient
                updatePatient(updatedPatientData).then(res => {
                    console.log("Visit deleted", res)
                })

                // Updating visits list
                // props.visits = props.visits.filter(( visit ) => visit._id !== visitData._id);
                // updateVisitsList(visitData._id, true)
                // updatePatientData(patientData)
                window.location.reload();
            }).catch(err => {
                alert(err)
            })
        }
    }


    function handleChangeReasonOfVisit(event) {
        setReasonOfVisit(event.target.value)
    }

    function handleChangeConsult(event) {
        setConsult(event.target.value)
    }


    useEffect(() => {
    
    }, [])

    // Checking if the data of the patient arrived if did not don't return anything
    if (patientData != null) {

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                onHide={closeModal}
                centered
                scrollable={true}
            >
                <Modal.Header className="card_header" closeButton>
                    <Modal.Title >
                        Patient information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        {/* FIRST NAME */}
                        <Form.Group className="mb-3">
                            <Form.Label className="font-weight-bold">First name</Form.Label>
                            <p>{patientData.firstName}</p>
                        </Form.Group>

                        {/* LAST NAME */}
                        <Form.Group className="mb-3">
                            <Form.Label className="font-weight-bold">Last name</Form.Label>
                            <p>{patientData.lastName}</p>
                        </Form.Group>

                        {/* ADDRESS */}
                        <Form.Group className="mb-3" >
                            <Form.Label className="font-weight-bold">Address</Form.Label>
                            <p>{patientData.address}</p>
                        </Form.Group>

                        {/* DATE OF BIRTH */}
                        {patientData.dateOfBirth != undefined ? <Form.Group className="mb-3" >
                            <Form.Label className="font-weight-bold">Date of Birth</Form.Label>
                            <div className="row">
                                <DatePicker
                                    className="ml-3 date_picker"
                                    selected={new Date(patientData.dateOfBirth)}
                                    readOnly={true}
                                    dateFormat="dd/MM/yyyy" />
                            </div>
                        </Form.Group>
                            : null}

                        {/* VISITS */}
                        <Form.Group className="mb-3" >
                            <Form.Label className="font-weight-bold">Visits</Form.Label>
                            <Button onClick={(event) => {
                                handleAddNewVisitCard(event)
                            }} variant="outline-dark" type="submit" className="ml-3">
                                Add new visit
                            </Button>
                            {showAddVisitCard ?
                                <Card className="visit_card_container">
                                    <Card.Header className="header_card_container" >
                                        <Card.Title className="title_visit_card">New visit</Card.Title>
                                        <div>
                                            <Button onClick={handleSaveNewVisit} variant="outline-dark" type="submit" className="ml-3 add_medication_button">
                                                Save
                                            </Button>
                                            <Button onClick={handleRemoveNewVisitCard} variant="outline-dark" type="submit" className="ml-3 add_medication_button">
                                                Cancel
                                            </Button>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form.Group className="mb-3">
                                            <Form.Group className="mb-3" >
                                                <div className="row">
                                                    <DatePicker
                                                        className="form-control ml-3"
                                                        placeholderText="Date of visit"
                                                        selected={dateOfVisit}
                                                        dropdownMode="select"
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        adjustDateOnChange
                                                        dateFormat="dd/MM/yyyy"
                                                        onChange={(date) => setDateOfVisit(date)} />
                                                </div>
                                            </Form.Group>
                                            <Form.Control className="mb-3" type="text" placeholder="Reason of visit" as="textarea" onChange={handleChangeReasonOfVisit} />
                                            <Form.Control className="mb-3" type="text" placeholder="Consult" as="textarea" onChange={handleChangeConsult} />
                                        </Form.Group>
                                    </Card.Body>
                                </Card>
                                : null
                            }
                            {props.visits != [] ?
                                props.visits.reverse().map((val, i) => {
                                    return (
                                        <VisitCard
                                            key={i}
                                            dateOfVisit={val.dateOfVisit}
                                            consult={val.consult}
                                            reasonOfVisit={val.reasonOfVisit}
                                            visitData={val}
                                            handleDeleteVisit={handleDeleteVisit}
                                        ></VisitCard>
                                    )
                                })
                                : null}
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal >
        )
    } else {
        return (null)
    }


}