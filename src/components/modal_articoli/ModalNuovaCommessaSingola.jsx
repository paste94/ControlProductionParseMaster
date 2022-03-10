import { Button, Form, Modal} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import NumDisegno from './component/NumDisegno';
import { renderArticoli } from './funzioni/articoli';
import NumPezzi from './component/NumPezzi';
import CostMat from './component/CostMat';
import CostoOrario from './component/CostoOrario';
import { addPreventivo } from '../../DAO/Preventivo.service';
import { addArticolo } from '../../DAO/Articoli.service';
import { getOreMacchina, renderMacchine } from './funzioni/ore_macchina';
import PropTypes from 'prop-types'


/**
 * Definisce modal per l'aggiunta del preventivo
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

    const handleShowModal = () => setShow(true)
    const handleHideModal = () => setShow(false)

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
            costMat: parseFloat(costMat),
            costoOrario: parseFloat(costoOrario),
            numDisegno: numDisegno.toString(),
            numPezzi: parseInt(numPezzi),
            totOre: parseFloat(totOre),
            totPreventivo: parseFloat(totPreventivo),
            oreMacchina: oreMacchina.filter(m => m.ore > 0),
        }

        addPreventivo( _articolo, commessaId, handleHideModal )
    }

    const handleSalvaArticolo = () => {
        const _articolo = {
            costMat: costMat.toString(),
            costoOrario: costoOrario.toString(),
            numDisegno: numDisegno.toString(),
            numPezzi: numPezzi.toString(),
            totOre: totOre.toString(),
            totPreventivo: totPreventivo.toString(),
            oreMacchina: oreMacchina.filter(m => m.ore > 0),
        }

        addArticolo(_articolo, handleHideModal)
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
        const newArr = [...oreMacchina]
        newArr.forEach( e => e.ore = 0 )
        setOreMacchina(newArr)
    }, [show])

    useEffect(() => {
        if (oreMacchina.length != 0) {
            renderMacchine(
                oreMacchina,
                setOreMacchina,
                setRenderedMacchine)
        }
    }, [oreMacchina])

    // Modifica i contatori totali
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
                onClick={ handleShowModal }>
                    Aggiungi Articolo
            </Button>
            <Modal
                show={show}
                onHide={ handleHideModal }
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
                            onClick={ handleSalvaArticolo }
                            title='Salva nella lista degli articoli' >
                            Salva articolo
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={ handleHideModal }>
                            Annulla
                        </Button>
                        <Button
                            id='primaryButton'
                            variant="primary"
                            type='submit'
                            autoFocus
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
    commessaId: PropTypes.string.isRequired,
}

export default ModalNuovaCommessaSingola
