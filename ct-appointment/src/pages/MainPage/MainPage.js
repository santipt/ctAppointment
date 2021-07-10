import React, { useState, useEffect } from 'react';
import './MainPage.css';

import { getAllPatients } from '../../services/PatientRoutes';


export default function MainPage() {
    const [listOfPatients, setListOfPatients] = useState([]);

    var items;
    // Like componentDidMount y componentDidUpdate
    useEffect(() => {
        getAllPatients().then(res => {
            console.log(res)

            setListOfPatients(res)
        }).catch(err => {
            alert(err)
        });
    }, []);

    return (
        <div>
            <h1>List of patients</h1>
            <div>
                {listOfPatients.map((listOfPatients, index) => (
                    <div key={listOfPatients._id}>{listOfPatients.firstName}</div>
                ))}
            </div>
        </div>
    );
}