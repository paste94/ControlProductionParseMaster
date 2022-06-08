import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import AlertError from '../../components/AlertError';
import { subscribeLavori } from '../../DAO/Lavori.service';
import LavoriTable from './LavoriTable';

/**
 * @return {Component} il component creato
 */
function Lavori() {
    const [data, setData] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        subscribeLavori(setData, (err) => console.error(err))
    }, [])

    return (
        <div className='page'>
            <AlertError
                show={error !== ''}
                message={error}
                handleClose={ () => setError('') } />

            <Row className='align-items-center'>
                <Col>
                    <Row className='ml-1'>
                        <h1>Lavori</h1>
                    </Row>
                </Col>
            </Row>

            <LavoriTable
                data={data}/>
        </div>
    )
}

export default Lavori;
