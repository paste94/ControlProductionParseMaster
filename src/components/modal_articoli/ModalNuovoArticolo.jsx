import { Button, Form, Modal} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import NumDisegno from './component/NumDisegno';
import { renderArticoli } from './funzioni/articoli';
import NumPezzi from './component/NumPezzi';
import CostMat from './component/CostMat';
import CostoOrario from './component/CostoOrario';
import { addArticolo } from '../../DAO/Articoli.service';
import { getOreMacchina, renderMacchine } from './funzioni/ore_macchina';


/**
 * Definisce modal per l'aggiunta dell'articolo
 * @return {Component} il componente
 */
function ModalNuovoArticolo() {
    const [show, setShow] = useState(false);
    const [numDisegno, setNumDisegno] = useState('');
    const [numPezzi, setNumPezzi] = useState(1);
    const [costMat, setCostMat] = useState(0);
    const [costoOrario, setCostoOrario] = useState(localStorage.getItem('DefaultCostMat') ?? 0)
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
        addArticolo(_articolo, handleHideModal, console.error)
    }

    useEffect(() => {
        renderArticoli(onArticoloClick, setRenderedArticoli);
        getOreMacchina(setOreMacchina);
    }, []);

    useEffect(() => {
        if (!show) {
            setNumDisegno('')
            setNumPezzi(0)
            setCostMat(0)
            setCostoOrario(0)
            setTotOre(0)
            setTotPreventivo(0)
            const arr = [...oreMacchina]
            arr.forEach(e => e.ore = 0)
            setOreMacchina(arr)
        }
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
                            id='addArticolo'
                            onSubmit={ handleSubmit } >
                                <NumDisegno
                                    value={numDisegno}
                                    onChange={(e) => setNumDisegno(e.target.value)}
                                    articoliRender={renderedArticoli}
                                />
                                <br/>
                                <NumPezzi
                                    value={numPezzi.toString()}
                                    onChange={(e) => setNumPezzi(e.target.value)} />
                                <br/>
                                 <CostMat
                                    value={costMat.toString()}
                                    onChange={(e) => setCostMat(e.target.value)} />
                                <br/>
                                <CostoOrario
                                    value={costoOrario.toString()}
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
                            variant="secondary"
                            onClick={ handleHideModal }>
                            Annulla
                        </Button>
                        <Button
                            id='primaryButton'
                            variant="primary"
                            type='submit'
                            autoFocus
                            title='Aggiungi articolo'
                            form='addArticolo'>
                            Aggiungi
                        </Button>
                    </Modal.Footer>
            </Modal>
        </div>


    )
}

export default ModalNuovoArticolo
