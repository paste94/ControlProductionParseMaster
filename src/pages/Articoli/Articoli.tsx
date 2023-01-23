import React, { useState, ReactElement } from 'react';
import { Col, Row } from 'react-bootstrap';
import ModalNuovoArticolo from '../../components/modal_articoli/ModalNuovoArticolo'
import ArticoliTable from './ArticoliTable'
import AlertError from '../../components/AlertError';
import AlertSuccess from '../../components/AlertSuccess';

/**
 * Pagina per la visualizzazione degli articoli salvati.
 * @return {Component} il component
 */
function Articoli(): ReactElement {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const alerts = <>
        <AlertError
            show={error !== ''}
            message={error}
            handleClose={() => setError('')} />
        <AlertSuccess
            show={success !== ''}
            message={success}
            handleClose={() => setSuccess('')} />
    </>

    return (
        <div className='page'>
            {alerts}
            <Row className='align-items-center'>
                <Col>
                    <h1>Articoli</h1>
                </Col>
                <Col>
                    <ModalNuovoArticolo />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ArticoliTable
                        setSuccess={setSuccess}
                        setError={setError} />
                </Col>
            </Row>
        </div>
    )
}

export default Articoli;
