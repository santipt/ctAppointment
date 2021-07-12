import React, { useState } from 'react';
import './RegisterModal.css';

// Importing date picker component
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Importing Bootstrap components
import { Modal, Button, Form } from 'react-bootstrap';

// Importing services
import { addNewPatient } from '../../services/PatientRoutes';

export default function RegisterModal(props) {

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [address, setAddress] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);


    function handleChangeFirstName(event) {
        setFirstName(event.target.value)
    }

    function handleChangeLastName(event) {
        setLastName(event.target.value)
    }

    function handleChangeAddress(event) {
        setAddress(event.target.value)
    }

    function handleRegisterPatient(event) {

        event.preventDefault() // In order to not refresh

        if (firstName != null && lastName != null && address != null) {

            addNewPatient(firstName, lastName, address, dateOfBirth).then(res => {
                // Closing modal when is completed
                props.closeModal()
            }).catch(err => {
                alert(err)
            });
        }else{
            alert("You must fill all the parameters")
        }
    }


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
                    Register new patient
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>First name*</Form.Label>
                        <Form.Control type="text" placeholder="First name" onChange={handleChangeFirstName} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Last name*</Form.Label>
                        <Form.Control type="text" placeholder="Last name" onChange={handleChangeLastName} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Address*</Form.Label>
                        <Form.Control type="text" placeholder="Address" onChange={handleChangeAddress} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Date of Birth</Form.Label>
                        <div className="row">
                            <DatePicker
                                className="form-control ml-3"
                                placeholderText="DD/MM/YYYY"
                                selected={dateOfBirth}
                                dropdownMode="select"
                                showMonthDropdown
                                showYearDropdown
                                adjustDateOnChange
                                dateFormat="dd/MM/yyyy"
                                onChange={(date) => setDateOfBirth(date)} />
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-dark" type="submit" onClick={handleRegisterPatient}>
                    Save
                </Button>
                <Button variant="outline-dark" onClick={props.closeModal}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    )

}