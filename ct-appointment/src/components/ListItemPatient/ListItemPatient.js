import React, { useState, useEffect } from 'react';

// Importing components
import PatientInfoModal from '../../components/PatientInfoModal/PatientInfoModal';

// Importing Bootstrap components
import { Card, } from 'react-bootstrap';

// Importing services
import { getAVisit } from '../../services/VisitRoutes';

// Importing usefull functions
import convertDateFormat from '../../utils/convertDateFormat';

export default function ListItemPatient(props) {

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

    if (showPatientInfoModal == false) {
        return (
            <tr onClick={handleShowPatientInfoModal}>
                <td>{props.firstName}</td>
                <td>{props.lastName}</td>
                {lastVisitDate != null ?
                    <td>{lastVisitDate}</td> :
                    <td>None</td>}
            </tr>
        )
    } else {
        return (
            <PatientInfoModal visitData={visitData} patientData={props.data} show={showPatientInfoModal} closeModal={handleShowPatientInfoModal}></PatientInfoModal>
        )
    }




}