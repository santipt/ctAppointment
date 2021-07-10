import React, { useState, useEffect } from 'react';
import './MedicationCard.css';

// Importing components
import PatientInfoModal from '../PatientInfoModal/PatientInfoModal';

// Importing Bootstrap components
import { Card, Button } from 'react-bootstrap';

// Importing services
import { } from '../../services/MedicationRoutes';

// Importing icons
import { BsFillTrashFill} from "react-icons/bs";


export default function MedicationCard(props) {


    // Like componentDidMount y componentDidUpdate
    useEffect(() => {

    }, []);

    return (
            <Card className="medication_card_container">
                <Card.Header>
                    <Card.Title>{props.name}</Card.Title>
                    <Button variant="secondary" onClick={props.closeModal}>
                        <BsFillTrashFill />
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Card.Text>Dose: {props.dose}</Card.Text>
                    <Card.Text>Package size: {props.packageSize}</Card.Text>
                </Card.Body>
            </Card>
    )


}