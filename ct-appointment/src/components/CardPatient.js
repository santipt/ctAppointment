import React, { useState } from 'react';

import { DateFromISOString } from 'io-ts-types'

import { Card, } from 'react-bootstrap';

export default function CardPatient(props) {


    console.log("Date". visit)

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{props.firstName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.lastName}</Card.Subtitle>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <Card.Text>{props.lastVisit}</Card.Text>
            </Card.Body>
        </Card>
    )

}