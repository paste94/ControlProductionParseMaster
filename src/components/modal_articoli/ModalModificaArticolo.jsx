import { Button, Form, Modal} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import NumDisegno from './component/NumDisegno';
import NumPezzi from './component/NumPezzi';
import CostMat from './component/CostMat';
import CostoOrario from './component/CostoOrario';
import PropTypes from 'prop-types'
import { getOreMacchina, renderMacchine } from './funzioni/ore_macchina';
import { FaEdit } from 'react-icons/fa';
import { editArticolo } from '../../DAO/Articoli.service';


/**
 * Definisce modal per la modifica dell'artiolo
 * @param {Object}  props
 *                  - articolo (object) contiene l'articolo da modificare
 * @return {Component} il componente
 */
function ModalModificaArticolo({
    articolo,
}) {
    const [show, setShow] = useState(false);
    const [numDisegno, setNumDisegno] = useState(articolo.numDisegno);
    const [numPezzi, setNumPezzi] = useState(1);
    const [costMat, setCostMat] = useState(0);
    const [costoOrario, setCostoOrario] = useState(42)
    const [totOre, setTotOre] = useState(0)
    const [totPreventivo, setTotPreventivo] = useState(0)
    const [oreMacchina, setOreMacchina] = useState([]) // Mappa [nome macchina -> ore assegnate]

    const [renderedMacchine, setRenderedMacchine] = useState([])

    const handleShowModal = () => setShow(true)
    const handleHideModal = () => setShow(false)

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
            parent: articolo.parent,
        }

        editArticolo(articolo.id, _articolo, handleHideModal)
    }

    useEffect(() => {
        if (!show) {
            setNumDisegno('')
            setNumPezzi(0)
            setCostMat(0)
            setCostoOrario(0)
            setTotOre(0)
            setTotPreventivo(0)
            setOreMacchina([])
        } else {
            setNumDisegno(articolo.numDisegno)
            setNumPezzi(articolo.numPezzi)
            setCostMat(articolo.costMat)
            setCostoOrario(articolo.costoOrario)
            setTotOre(articolo.totOre)
            setTotPreventivo(articolo.totPreventivo)
            // Prendo le ore macchina della articolo ed aggiungo le ore macchina
            // a 0 delle macchine nuove non utilizzate.
            getOreMacchina((macchine) => {
                // Deep copy dell'oggetto oreMacchina di articolo
                const _oreMacchina = JSON.parse(JSON.stringify(articolo.oreMacchina))
                // Estraggo gli ID delle macchine già presenti in articolo
                const _oreMacchinaIds = _oreMacchina.map(m => m.id)
                // Tolgo le macchine presenti in articolo dall'elenco delle macchine totali
                const _macchineFiltered = macchine.filter(e => !_oreMacchinaIds.includes(e.id))
                // Imposto come oreMacchina l'elenco dato dalla concatenazione delle macchine
                // presenti nella articolo e dalle macchine totali
                setOreMacchina(_oreMacchina.concat(_macchineFiltered))
            })
        }
    }, [show])

    // Renderizza le macchine alla modifica
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
                variant='link'
                title='Modifica'
                size='sm'
                onClick={ handleShowModal }>
                    <FaEdit style={{ color: 'black' }}/>
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
                                    disabled={true}
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
                            title='Modifica articolo alla commessa'
                            form='addPreventivo'>
                            Modifica
                        </Button>
                    </Modal.Footer>
            </Modal>
        </div>


    )
}

ModalModificaArticolo.propTypes = {
    articolo: PropTypes.object,
}

export default ModalModificaArticolo
