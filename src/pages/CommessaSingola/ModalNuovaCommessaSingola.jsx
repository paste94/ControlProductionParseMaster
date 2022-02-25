import { Button, Form, Modal, Col, FormControl, InputGroup, DropdownButton, Dropdown} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import NumDisegno from './modal/component/NumDisegno';
import { renderArticoli } from './modal/funzioni/articoli';
import NumPezzi from './modal/component/NumPezzi';
import CostMat from './modal/component/CostMat';
import CostoOrario from './modal/component/CostoOrario';


/**
 * Definisce modal per la modifica e la aggiunta di un lavoro
 * @param {Object}  props
 *                  - data (object) l'oggetto che contiene il
 *                      lavoro da modificare. deve contenere
 *                          - numPezzi
 *                          - costMat
 *                          - costoOrario
 *                          - numDisegno
 *                          - elenco dei valori delle macchine
 *                  - handleConfirm (function) funzione da eseguire
 *                      per la conferma del modal (aggiunta o modifica)
 *                  - type (string) stringa che identifica se il component
 *                          serve per aggiungere un elemento o modificarlo.
 *                          Se vale 'add' allora mostra le informazioni
 *                          riguardanti l'aggiunta di un elemento altrimenti
 *                          mostra gli elementi per la modifica.
 * @return {Component} il componente
 */
function ModalNuovaCommessaSingola() {
    const [show, setShow] = useState(false);
    const [numDisegno, setNumDisegno] = useState('');
    const [numPezzi, setNumPezzi] = useState(0);
    const [costMat, setCostMat] = useState(0);
    const [costoOrario, setCostoOrario] = useState(0)
    const [totOre, setTotOre] = useState(0)
    const [totPreventivo, setTotPreventivo] = useState(0)
    const [oreMacchina, setOreMacchina] = useState({}) // Mappa [nome macchina -> ore assegnate]

    const [renderedArticoli, setRenderedArticoli] = useState([])

    /**
     * Carica l'articolo selezionato dallo scrivv view ventro al modal.
     * @param {Articolo} articolo l'oggetto che rappresenta l'articolo
     */
     const onArticoloClick = (articolo) => {
        console.log(articolo)
        setNumDisegno(articolo.numDisegno + '')
        setNumPezzi(articolo.numPezzi)
        setCostMat(articolo.costMat)
        setCostoOrario(articolo.costoOrario)
    }

    /**
     * @param {Event} e L'evento di bubmit
     */
    const handleSubmit = (e) => {
        // Evito che la pagina venga ricaricata topo il confirm del form
        e.preventDefault();

        // TODO: Aggiungi il preventivo al DB
    }

    useEffect(() => {
        renderArticoli(onArticoloClick, setRenderedArticoli);
    }, []);

    useEffect(() => {
        setNumDisegno('')
        setNumPezzi(0)
        setCostMat(0)
        setCostoOrario(0)
        setTotOre(0)
        setTotPreventivo(0)
    }, [show])

    return (
        <div>
            <Button
                className='float-right vertical-center'
                onClick={ () => setShow(true) }>
                    Aggiungi Articolo CIAO
            </Button>
            <Modal
                show={show}
                onHide={ () => setShow(false) }
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Nuovo Articolo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            id='addPreventivo'
                            onSubmit={ handleSubmit } >
                                <NumDisegno
                                    value={numDisegno}
                                    onChange={(e) => setNumDisegno(e.target.value)}
                                    disabled={false}
                                    articoliRender={renderedArticoli}
                                />
                                <br/>
                                <NumPezzi
                                    value={numPezzi}
                                    onChange={(e) => setNumPezzi(e.target.value)} />
                                <br/>
                                 <CostMat
                                    value={costMat}
                                    onChange={(e) => setCostMat(e.target.value)} />
                                <br/>
                                <CostoOrario
                                    value={costoOrario}
                                    onChange={(e) => setCostoOrario(e.target.value)} />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
            </Modal>
        </div>


    )
}

export default ModalNuovaCommessaSingola
