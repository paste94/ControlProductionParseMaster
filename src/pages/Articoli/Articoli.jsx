import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ModalCommessaSingola from '../../components/ModalCommessaSingola';
import { addArticolo } from '../../DAO/Articoli.service';
import ArticoliTable from './ArticoliTable'

/** Pagina per la visualizzazione degli articoli salvati. 
 * 
 */
function Articoli(){

    /**
     * Aggiunge un articolo al database
     * 
     * @param {object} articolo l'articolo da aggiungere
     */
    const handleAddArticolo = (articolo) => {
        addArticolo(articolo)
    }

    return (
        <div className='page'>
            <Row className='align-items-center'>
                <Col>
                    <h1>Articoli</h1>
                </Col>
                <Col>
                    <ModalCommessaSingola
                        data={{
                            numPezzi:1,
                            costMat:0,
                            costoOrario:42,
                            numDisegno:'',
                            stozz:0,
                            squadr:0,
                            fresa:0,
                            tornio:0,
                            CN:0,
                            rettifica:0,
                            banco:0
                        }}
                        type='add'
                        handleConfirm={ handleAddArticolo }
                        confirmButtonText={'Aggiungi'} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ArticoliTable />
                </Col>
            </Row>
        </div>
    )
}

export default Articoli;
