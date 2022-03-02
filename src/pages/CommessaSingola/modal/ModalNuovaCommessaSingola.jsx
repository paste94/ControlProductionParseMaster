import { Button, Form, Modal} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import NumDisegno from './component/NumDisegno';
import { renderArticoli } from './funzioni/articoli';
import NumPezzi from './component/NumPezzi';
import CostMat from './component/CostMat';
import CostoOrario from './component/CostoOrario';
import { getOreMacchina, renderMacchine } from './funzioni/ore_macchina';
import PropTypes from 'prop-types'
import { addPreventivo } from '../../../DAO/Preventivo.service';


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
function ModalNuovaCommessaSingola({
    commessaId,
}) {
    const [show, setShow] = useState(false);
    const [numDisegno, setNumDisegno] = useState('');
    const [numPezzi, setNumPezzi] = useState(1);
    const [costMat, setCostMat] = useState(0);
    const [costoOrario, setCostoOrario] = useState(42)
    const [totOre, setTotOre] = useState(0)
    const [totPreventivo, setTotPreventivo] = useState(0)
    const [oreMacchina, setOreMacchina] = useState([]) // Mappa [nome macchina -> ore assegnate]

    const [renderedArticoli, setRenderedArticoli] = useState([])
    const [renderedMacchine, setRenderedMacchine] = useState([])

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

        const _articolo = {
            costMat: costMat.toString(),
            costoOrario: costoOrario.toString(),
            numDisegno: numDisegno.toString(),
            numPezzi: numPezzi.toString(),
            totOre: totOre.toString(),
            totPreventivo: totPreventivo.toString(),
            oreMacchina: oreMacchina.filter(m => m.ore > 0),
        }

        addPreventivo(_articolo, commessaId, () => setShow(false))
    }

    useEffect(() => {
        renderArticoli(onArticoloClick, setRenderedArticoli);
        getOreMacchina(setOreMacchina);
    }, []);

    useEffect(() => {
        setNumDisegno('')
        setNumPezzi(0)
        setCostMat(0)
        setCostoOrario(0)
        setTotOre(0)
        setTotPreventivo(0)
    }, [show])

    useEffect(() => {
        if (oreMacchina.length != 0) {
            renderMacchine(
                oreMacchina,
                setOreMacchina,
                setRenderedMacchine)
        }
    }, [oreMacchina])

    useEffect(() => {
        const _totOre = oreMacchina.reduce(
            (accumulator, current) => accumulator + parseFloat(current.ore),
            0,
        )
        const _totPreventivo = (_totOre * parseFloat(costoOrario) + parseFloat(costMat)) * parseInt(numPezzi)
        setTotOre(_totOre.toFixed(2))
        setTotPreventivo(_totPreventivo.toFixed(2))
    }, [oreMacchina, numPezzi, costMat, costoOrario] )

    return (
        <div>
            <Button
                className='float-right vertical-center'
                onClick={ () => setShow(true) }>
                    Aggiungi Articolo
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
                                <br/>
                                {renderedMacchine}
                                <br/>
                                <h5>Ore: {totOre} </h5>
                                <h5>Totale: {totPreventivo} €</h5>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="success"
                            onClick={ () => console.log('salvva articolo') }
                            title='Salva nella lista degli articoli' >
                            Salva articolo
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={ () => setShow(false) }>
                            Annulla
                        </Button>
                        <Button
                            id='primaryButton'
                            variant="primary"
                            type='submit'
                            autoFocus
                            onClick={ () => console.log('aggiungi articolo') }
                            title='Aggiungi articolo alla commessa'
                            form='addPreventivo'>
                            Aggiungi
                        </Button>
                    </Modal.Footer>
            </Modal>
        </div>


    )
}

ModalNuovaCommessaSingola.propTypes = {
    commessaId: PropTypes.string,
}

export default ModalNuovaCommessaSingola