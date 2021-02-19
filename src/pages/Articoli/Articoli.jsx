import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ModalCommessaSingola from '../../components/ModalCommessaSingola';
import { addArticolo, editArticolo, deleteArticolo, getAllArticoli } from '../../DAO/Articoli.service';
import ArticoliTable from './ArticoliTable'

/** Pagina per la visualizzazione degli articoli salvati. 
 * 
 */
function Articoli(){
    // Dati della tabella
    const [data, setData] = useState([])
    const [update, setUpdate] = useState(true)

    const refresh = () => setUpdate(!update)

    /**
     * Aggiunge un articolo al database
     * 
     * @param {object} articolo l'articolo da aggiungere
     */
    const handleAddArticolo = (articolo) => addArticolo(articolo, refresh)

    /**
     * Modifica un articolo 
     * 
     * @param {string} id identificativo dell'articolo da modificare
     * @param {object} articolo oggetto con le modifiche effettuate
     */
    const handleEditArticolo = (id, articolo) => {
        editArticolo(id, articolo, refresh)
    }

    /**
     * Elimina un articolo
     * 
     * @param {string} id identificativo dell'elemento da eliminare dal DB
     */
    const handleDeleteArticolo = (id) => {
        deleteArticolo(id, refresh)
    }

    /**
     * Richiama il listener con i dati da mostrare in tabella
     */
    useEffect(() => {
        getAllArticoli( (result) => setData(result) )
    }, [update]);

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
