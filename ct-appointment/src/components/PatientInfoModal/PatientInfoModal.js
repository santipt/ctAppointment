import React, { useState, useEffect } from 'react';
import './PatientInfoModal.css';

// Importing date picker component
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Importing Bootstrap components
import { Modal, Button, Form } from 'react-bootstrap';

// Importing services
import { getAMedication } from '../../services/MedicationRoutes';

// Importing usefull functions
import convertDateFormat from '../../utils/convertDateFormat';

export default function PatientInfoModal(props) {

    const [medicationInfo, setMedicationInfo] = useState(null);

    // Like componentDidMount y componentDidUpdate
    useEffect(() => {

        // Getting the medication data
        if (props.visitData != null && props.visitData.prescribedMedication[0] != undefined) {
            console.log("VISIT DATA", props.visitData)
            console.log("MEDICATION", props.visitData.prescribedMedication[0]._id)

            var medicationId = props.visitData.prescribedMedication[0]._id;

            getAMedication(medicationId).then(res => {
                console.log("MEDICATION INFO", res)
                setMedicationInfo(res)
            }).catch(err => {
                alert(err)
            });
        }
    }, []);

    // Checking if the data of the visit arrived if did not don't return anything
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            onHide={props.closeModal}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title >
                    Patient information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label className="font-weight-bold">First name</Form.Label>
                        <p>{props.patientData.firstName}</p>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label className="font-weight-bold">Last name</Form.Label>
                        <p>{props.patientData.lastName}</p>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label className="font-weight-bold">Address</Form.Label>
                        <p>{props.patientData.address}</p>
                    </Form.Group>


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

                    <Form.Group className="mb-3" >
                        <Form.Label className="font-weight-bold">Visit information</Form.Label>
                        {props.visitData != null ?
                            <div>
                                <p>Description: {props.visitData.consult}</p>
                                <p>Date of visit: {convertDateFormat(props.visitData.dateOfVisit)}</p>
                                <p>Reason of visit: {props.visitData.reasonOfVisit}</p>
                            </div> :
                            <p>No visits</p>}
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label className="font-weight-bold">Medication information</Form.Label>
                        {medicationInfo != null ?
                            <div>
                                <p>Name: {medicationInfo.name}</p>
                                <p>Dose: {medicationInfo.dose}</p>
                                <p>Package size: {medicationInfo.packageSize}</p>
                            </div> :
                            <p>No medication</p>}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.closeModal}>
                    Close Modal
                </Button>
            </Modal.Footer>
        </Modal>
    )


}