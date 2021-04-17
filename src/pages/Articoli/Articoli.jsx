import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ModalCommessaSingola from '../../components/ModalCommessaSingola';
import {
    addArticolo,
    editArticolo,
    deleteArticolo,
    getAllArticoli,
} from '../../DAO/Articoli.service';
import ArticoliTable from './ArticoliTable'

/**
 * Pagina per la visualizzazione degli articoli salvati.
 * @return {Component} il component
 */
function Articoli() {
    // Dati della tabella
    const [data, setData] = useState([])
    const [update] = useState(true)

    const refresh = () => getAllArticoli( (result) => setData(result) )

    /**
     * Aggiunge un articolo al database
     * @param {object} articolo l'articolo da aggiungere
     * @return {*} none
     */
    const handleAddArticolo = (articolo) => addArticolo(articolo, refresh)

    /**
     * Modifica un articolo
     * @param {string} id identificativo dell'articolo da modificare
     * @param {object} articolo oggetto con le modifiche effettuate
     */
    const handleEditArticolo = (id, articolo) => {
        editArticolo(id, articolo, refresh)
    }

    /**
     * Elimina un articolo
     * @param {string} id identificativo dell'elemento da eliminare dal DB
     * @return {*} none
     */
    const handleDeleteArticolo = (id) => deleteArticolo(id, refresh)


    // Richiama il listener con i dati da mostrare in tabella
    useEffect(() => {
        getAllArticoli( (result) => setData(result) )
    }, [])

    return (
        <div className='page'>
            <Row className='align-items-center'>
                <Col>
                    <h1>Articoli</h1>
                </Col>
                <Col>
                    <ModalCommessaSingola
                        modalFrom='addArticolo'
                        handleConfirm={ handleAddArticolo }
                        confirmButtonText={'Aggiungi'} />
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

export default Articoli;
