import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ModalNuovoArticolo from '../../components/modal_articoli/ModalNuovoArticolo'
import {
    editArticolo,
    deleteArticolo,
    subscribeArticoli,
    unsubscribeArticoli,
} from '../../DAO/Articoli.service';
import ArticoliTable from './ArticoliTable'
// import PropTypes from 'prop-types'
import AlertError from '../../components/AlertError';
import AlertSuccess from '../../components/AlertSuccess';

/**
 * Pagina per la visualizzazione degli articoli salvati.
 * @return {Component} il component
 */
function Articoli() {
    // Dati della tabella
    const [data, setData] = useState([])
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

    /**
     * Modifica un articolo
     * @param {string} id identificativo dell'articolo da modificare
     * @param {object} articolo oggetto con le modifiche effettuate
     */
    const handleEditArticolo = (id, articolo) => {
        editArticolo(id, articolo)
    }

    /**
     * Elimina un articolo
     * @param {string} id identificativo dell'elemento da eliminare dal DB
     * @return {*} none
     */
    const handleDeleteArticolo = (id) => deleteArticolo(id)


    useEffect(() => {
        subscribeArticoli(setData, () => {});
        return unsubscribeArticoli;
    }, [])

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
                        data={data}
                        handleEditArticolo={handleEditArticolo}
                        handleDeleteArticolo={handleDeleteArticolo} />
                </Col>
            </Row>
        </div>
    )
}

Articoli.propTypes = {
}

export default Articoli;
