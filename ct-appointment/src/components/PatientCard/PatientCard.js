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

    function updateVisitsList(newVisit, remove) {
        if(remove){
            // Deleting visit from visits array
            var newVisitList = visits.filter(( visit ) => visit._id !== newVisit)
            setVisits(visits => [...visits, newVisitList]);
        }else{
            setVisits(visits => [...visits, newVisit]);
        }
    }

    function updatePatientData(newPatientData) {
        //props.data = newPatientData;
    }

    // Like componentDidMount y componentDidUpdate
    useEffect(() => {

        // Getting all the patient visits
        if (props.data.visits != [] && firstLoad == true) {

            setFirstLoad(false)

            var listOfVisitsIds = props.data.visits;
            var savedLastVisit;

            // Saving list of visits with information
            listOfVisitsIds.forEach((visitId, index) => {

                // Getting all the info of each visit
                getAVisit(visitId).then(res => {
                    setVisits(visits => [...visits, res]);

                    if (index === 0) {
                        savedLastVisit = res.dateOfVisit;
                    }

                    // Checking which visit is the last one
                    if (new Date(savedLastVisit) <= new Date(res.dateOfVisit) || listOfVisitsIds.length == 1) {
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
                <PatientInfoModal
                    visits={visits}
                    patientData={props.data}
                    updateVisitsList={updateVisitsList}
                    updatePatientData={updatePatientData}
                    show={showPatientInfoModal}
                    closeModal={handleShowPatientInfoModal}
                ></PatientInfoModal>
            </div>
        )
    } else {
        return (null)
    }


}