import React, { useState, useEffect } from 'react';
import './MedicationCard.css';

// Importing components
import PatientInfoModal from '../PatientInfoModal/PatientInfoModal';

// Importing Bootstrap components
import { Card, Button, Form } from 'react-bootstrap';

// Importing services
import { deleteMedication } from '../../services/MedicationRoutes';

// Importing icons
import { BsFillTrashFill } from "react-icons/bs";

export default function MedicationCard(props) {

    const [name, setName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [address, setAddress] = useState(null);
    const [dateOfBirth, setDateOfBirth] = useState(null);

    function handleDeleteMedication() {
        console.log("Deleting medication: ", props.medicationData)
        deleteMedication(props.medicationData._id).then(res => {
            // Add loading
            props.updateMedicationList(props.medicationData._id)
        }).catch(err => {
            alert(err)
        })
    }

    function handleChangeMedicationName(event) {
        setName(event.target.value)
    }

    function handleChangeLastName(event) {
        setLastName(event.target.value)
    }

    function handleChangeAddress(event) {
        setAddress(event.target.value)
    }


    // Like componentDidMount y componentDidUpdate
    useEffect(() => {

    }, []);

    if (props.addMedication == undefined) {
        return (
            <Card className="medication_card_container">
                <Card.Header className="medication_card_header">
                    <Card.Title className="medication_title">{props.name}</Card.Title>
                    <a className="delete_medication_button" onClick={handleDeleteMedication}>
                        <BsFillTrashFill className="trash_icon" size={13} />
                    </a>
                </Card.Header>
                <Card.Body>
                    <Card.Text>Dose: {props.dose}</Card.Text>
                    <Card.Text>Package size: {props.packageSize}</Card.Text>
                </Card.Body>
            </Card>
        )
    } else {
        return (
            // ADD MEDICATION CARD
            <Card className="medication_card_container">
                <Card.Header className="medication_card_header">
                    <Form.Group className="mb-3">
                        <Form.Control className="medication_title" type="text" placeholder="Medication name" onChange={handleChangeMedicationName} />
                    </Form.Group>
                    <a className="delete_medication_button" onClick={handleDeleteMedication}>
                        <BsFillTrashFill className="trash_icon" size={13} />
                    </a>
                </Card.Header>
                <Card.Body>
                    <Card.Text>Dose: MANOLO</Card.Text>
                    <Form.Group className="mb-3">
                        <Form.Control className="medication_title" type="text" placeholder="Medication name" onChange={handleChangeMedicationName} />
                    </Form.Group>
                    <Card.Text>Package size: MANOLO</Card.Text>
                </Card.Body>
                <Card.Footer><Button>Save</Button></Card.Footer>
            </Card>
        )
    }


}