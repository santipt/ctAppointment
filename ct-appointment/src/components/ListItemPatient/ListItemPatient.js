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
        })}

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
            <PatientInfoModal visits={visits} patientData={props.data} show={showPatientInfoModal} closeModal={handleShowPatientInfoModal}></PatientInfoModal>
            )
    }

}