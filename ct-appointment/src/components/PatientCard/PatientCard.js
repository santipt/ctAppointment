import React, { useState, useEffect } from 'react';
import './PatientCard.css';


// Importing components
import PatientInfoModal from '../PatientInfoModal/PatientInfoModal';

// Importing Bootstrap components
import { Card, Button } from 'react-bootstrap';

// Importing services
import { getAVisit } from '../../services/VisitRoutes';

// Importing usefull functions
import convertDateFormat from '../../utils/convertDateFormat';

export default function PatientCard(props) {

    const [showPatientInfoModal, setShowPatientInfoModal] = useState(false);
    const [lastVisitDate, setLastVisitDate] = useState(null);
    const [visits, setVisits] = useState([]);
    // In order to verify that the forEach is runned only once
    const [firstLoad, setFirstLoad] = useState(true);

    const handleShowPatientInfoModal = () => setShowPatientInfoModal(!showPatientInfoModal);

    // Like componentDidMount y componentDidUpdate
    useEffect(() => {

        

        // Getting the last visit id
        if (props.data.visits != [] && firstLoad == true) {

            setFirstLoad(false)

            var listOfVisits = props.data.visits;
            console.log("LIST OF VISITS")
            console.log(listOfVisits)

            listOfVisits.forEach( (visitId, index) => {

                getAVisit(visitId).then(res => {
                    setVisits(visits => [...visits, res]);

                    if (index == 0) {
                        // Formating date of the last visit
                        var date = convertDateFormat(res.dateOfVisit)

                        setLastVisitDate(date);
                    }
                }).catch(err => {
                    alert(err)
                });
            })
        }



    }, []);

    if (props.data != null) {

        return (
            <div>
                <Card className="card_patient_container" onClick={handleShowPatientInfoModal}>
                    <Card.Body>
                        <Card.Title>{props.data.firstName}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{props.data.lastName}</Card.Subtitle>
                        {lastVisitDate != null ?
                            <Card.Text>Last visit: {lastVisitDate}</Card.Text>
                            :
                            <Card.Text>Last visit: None</Card.Text>
                        }
                    </Card.Body>
                </Card>
                <PatientInfoModal visits={visits} patientData={props.data} show={showPatientInfoModal} closeModal={handleShowPatientInfoModal}></PatientInfoModal>
            </div>
        )
    } else {
        return (null)
    }


}