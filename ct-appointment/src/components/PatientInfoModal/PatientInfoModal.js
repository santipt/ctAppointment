import React, { useState, useEffect } from 'react';
import './PatientInfoModal.css';

// Importing date picker component
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Importing Bootstrap components
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import VisitCard from '../VisitCard/VisitCard';


// Importing usefull functions
import convertDateFormat from '../../utils/convertDateFormat';

export default function PatientInfoModal(props) {

    // Checking if the data of the visit arrived if did not don't return anything
    if (props.patientData != null) {

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                onHide={props.closeModal}
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
                            <p>{props.patientData.firstName}</p>
                        </Form.Group>

                        {/* LAST NAME */}
                        <Form.Group className="mb-3">
                            <Form.Label className="font-weight-bold">Last name</Form.Label>
                            <p>{props.patientData.lastName}</p>
                        </Form.Group>

                        {/* ADDRESS */}
                        <Form.Group className="mb-3" >
                            <Form.Label className="font-weight-bold">Address</Form.Label>
                            <p>{props.patientData.address}</p>
                        </Form.Group>

                        {/* DATE OF BIRTH */}
                        {props.patientData.dateOfBirth != undefined ? <Form.Group className="mb-3" >
                            <Form.Label className="font-weight-bold">Date of Birth</Form.Label>
                            <div className="row">
                                <DatePicker
                                    className="ml-3 date_picker"
                                    selected={new Date(props.patientData.dateOfBirth)}
                                    readOnly={true}
                                    dateFormat="dd/MM/yyyy" />
                            </div>
                        </Form.Group>
                            : null}

                        {/* VISITS */}
                        <Form.Group className="mb-3" >
                            <Form.Label className="font-weight-bold">Visits</Form.Label>
                            <Button variant="outline-dark" type="submit" className="ml-3">
                                Add new visit
                            </Button>
                            {props.visits != [] ?
                                props.visits.map((val, i) => {
                                    return (
                                        <VisitCard
                                            key={val._id}
                                            dateOfVisit={val.dateOfVisit}
                                            consult={val.consult}
                                            reasonOfVisit={val.reasonOfVisit}
                                            visiData={val}
                                        ></VisitCard>
                                    )
                                }) : null}
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal >
        )
    } else {
        return (null)
    }


}