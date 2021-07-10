import React, { useState, useEffect } from 'react';

// Importing components
import PatientInfoModal from '../../components/PatientInfoModal/PatientInfoModal';

// Importing Bootstrap components
import { Card, } from 'react-bootstrap';

// Importing services
import { getAVisit } from '../../services/VisitRoutes';

// Importing usefull functions
import convertDateFormat from '../../utils/convertDateFormat';

export default function CardPatient(props) {

    const [showPatientInfoModal, setShowPatientInfoModal] = useState(false);
    const [lastVisitDate, setLastVisitDate] = useState(null);
    const [visitData, setVisitData] = useState(null);

    const handleShowPatientInfoModal = () => setShowPatientInfoModal(!showPatientInfoModal);

    // Like componentDidMount y componentDidUpdate
    useEffect(() => {

        // Getting the last visit id
        var visitId = props.data.visits[0];

        if (visitId != undefined) {
            getAVisit(visitId).then(res => {
                setVisitData(res);

                // Formating date 
                var date = convertDateFormat(res.dateOfVisit)

                setLastVisitDate(date);
            }).catch(err => {
                alert(err)
            });
        }
    }, []);

    return (
        <div>
            <Card className="card_container" onClick={handleShowPatientInfoModal}>
                <Card.Body>
                    <Card.Title>{props.data.firstName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.data.lastName}</Card.Subtitle>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    { lastVisitDate != null ?
                        <Card.Text>Last visit: {lastVisitDate}</Card.Text>
                        : 
                        <Card.Text>Last visit: None</Card.Text>
                    }
                </Card.Body>
            </Card>
            <PatientInfoModal visitData={visitData} patientData={props.data} show={showPatientInfoModal} closeModal={handleShowPatientInfoModal}></PatientInfoModal>
        </div>
    )


}