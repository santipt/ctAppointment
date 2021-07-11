import React, { useState, useEffect } from 'react';
import './MedicationCard.css';

// Importing components

// Importing Bootstrap components
import { Card, Button, Form } from 'react-bootstrap';

// Importing services
import { addNewMedication, deleteMedication } from '../../services/MedicationRoutes';
import { updateVisitMedication } from '../../services/VisitRoutes';

// Importing icons
import { BsFillTrashFill } from "react-icons/bs";

export default function MedicationCard(props) {

    const [name, setName] = useState(null);
    const [dose, setDose] = useState(null);
    const [packageSize, setPackageSize] = useState(null);

    function handleChangeMedicationName(event) {
        setName(event.target.value)
    }

    function handleChangeDose(event) {
        setDose(event.target.value)
    }

    function handleChangePackageSize(event) {
        setPackageSize(event.target.value)
    }

    function handleDeleteMedication(event) {
        console.log("Deleting medication: ", props.medicationData)
        deleteMedication(props.medicationData._id).then(res => {
            // Add loading
            props.updateMedicationList(props.medicationData._id)
        }).catch(err => {
            alert(err)
        })
    }

    // Like componentDidMount y componentDidUpdate
    useEffect(() => {

    }, []);

    if (props.medicationData.addMedication == true) {
        return (
            // ADD MEDICATION CARD
            <Card className="medication_card_container">
                <Card.Header className="">
                    <Form.Control type="text" placeholder="Medication name" onChange={handleChangeMedicationName} />
                </Card.Header>
                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Control className="mb-3" type="text" placeholder="Dose" onChange={handleChangeDose} />
                        <Form.Control className="mb-3" type="text" placeholder="Package size" onChange={handleChangePackageSize} />
                    </Form.Group>
                    <div className="button_group_new_medication">
                        <Button onClick={(event) => {
                            props.handleSaveNewMedication(event, name, dose, packageSize)
                        }} variant="outline-dark" type="submit" >
                            Save
                        </Button>
                        <Button onClick={props.handleRemoveNewMedicationCard} variant="outline-dark" type="submit" className="ml-3">
                            Cancel
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        )
    } else {
        return (
            // INFO MEDICATION CARD
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
    }


}