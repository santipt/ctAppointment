import React, { useState, useEffect } from 'react';
import './AllVisitsPage.css';

// Importing components
import VisitCard from '../../components/VisitCard/VisitCard';
import NavBar from '../../components/NavBar/NavBar'

// Importing Bootstrap components
import { Row, Col, Button, Form, Table, Dropdown, DropdownButton, Container } from 'react-bootstrap';

// Importing services
import { getAllVisits } from '../../services/VisitRoutes';

// Importing icons
import { BsList, BsFillGridFill, BsPlus } from "react-icons/bs";


export default function AllVisitsPage() {

    const [toggleView, setToggleView] = useState(false);
    const [visits, setVisits] = useState([]);

    // Like componentDidMount y componentDidUpdate
    useEffect(() => {

        // Getting a list of al the patients in the database
        getAllVisits().then(res => {
            setVisits(res)
            console.log(res)
        }).catch(err => {
            alert(err)
        });

    }, []);

    return (
        <div>
            <NavBar active="/visits"></NavBar>
            <div className="header_container">
                <div className="title_container">
                    <h1>List of visits</h1>
                </div>
            </div>
            <div className="visits_container">
                {visits != [] ?
                    visits.reverse().map((val, i) => {
                        return (
                            <VisitCard
                                key={i}
                                dateOfVisit={val.dateOfVisit}
                                consult={val.consult}
                                reasonOfVisit={val.reasonOfVisit}
                                visitData={val}
                                getMedicationInfo={true}
                                className="visit_card"
                            ></VisitCard>
                        )
                    }) : null
                }
            </div>
        </div>
    );
}