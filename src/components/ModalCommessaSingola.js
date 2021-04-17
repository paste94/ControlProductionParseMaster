import { Button, Form, Modal, Col, FormControl, InputGroup, DropdownButton, Dropdown} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import {getAllMacchine} from '../DAO/Macchine.service'
import { FaEdit } from 'react-icons/fa';
import { getAllArticoli } from '../DAO/Articoli.service';
import PropTypes from 'prop-types'
import { addArticolo } from '../DAO/Articoli.service';

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
function ModalCommessaSingola({data, modalFrom, handleConfirm}) {
    const DEF_NUM_PEZZI = data === undefined ? 1 : data.numPezzi
    const DEF_COSTO_MAT = data === undefined ? '0' : data.costMat
    const DEF_COSTO_ORARIO = data === undefined ? '42' : data.costoOrario
    const NUM_DISEGNO = data === undefined ? '' : data.numDisegno
    const ADD = modalFrom === 'addArticolo' || modalFrom === 'addCommessa'
    const [show, setShow] = useState(false)
    const [macchine, setMacchine] = useState([]) // Oggetto Macchine direttamente dal DB
    const [macchineRender, setMacchineRender] = useState([]) // Component delle macchine da mostrare nel modal
    const [numDisegno, setNumDisegno] = useState(NUM_DISEGNO)
    const [numPezzi, setNumPezzi] = useState(DEF_NUM_PEZZI)
    const [costMat, setCostMat] = useState(DEF_COSTO_MAT)
    const [costoOrario, setCostoOrario] = useState(DEF_COSTO_ORARIO)
    const [totOre, setTotOre] = useState(0)
    const [totPreventivo, setTotPreventivo] = useState(0)
    const [oreMacchina, setOreMacchina] = useState({}) // Mappa [nome macchina -> ore assegnate]
    const [firstRender, setFirstRender] = useState(true)
    const [articoliRender, setArticoliRender] = useState([])
    const [showAlert, setShowAlert] = useState(false)

    // Imposta tutti i valori ai default
    const initNewCommessa = () => {
        // Eventuali nuovi valori di default
        setNumDisegno(NUM_DISEGNO)
        setNumPezzi(DEF_NUM_PEZZI)
        setCostMat(DEF_COSTO_MAT)
        setCostoOrario(DEF_COSTO_ORARIO)

        // Imposto la lista delle macchine e delle ore delle macchine
        getAllMacchine(
            (macchineList) => {
                const om = {}
                macchineList.forEach(m => {
                    om[m.nome] = data === undefined ? 0 : data[m.nome]
                    console.log([m.nome], '->', data === undefined ? 0 : data[m.nome])
                })
                setOreMacchina(om)
            },
            () => {},
        )
    }

    // Aggiorna il totale delle ore delle macchine
    const updateTotOre = () => {
        let tot = 0
        for (const [key, value] of Object.entries(oreMacchina)) {
            tot = tot + value
        }
        setTotOre(tot)
    }

    const handleShow = () => {
        setShow(true)
        console.log(data)
        initNewCommessa()
    }
    const handleClose = () => {
        setShow(false)
        setShowAlert(false)
    }
    const handleChangeOreMacchina = (e) => {
        oreMacchina[e.target.name] = e.target.value !== '' ?
            parseFloat(e.target.value):
            0
        updateTotOre()
    }
    const handleChangeNumDisegno = (e) => setNumDisegno(e.target.value)
    const handleChangeNumPezzi = (e) => {
        e.target.value !== '' ?
            setNumPezzi(parseFloat(e.target.value)):
            setNumPezzi(0)
    }
    const handleChangeCostMat = (e) => {
        setCostMat(e.target.value)
    }
    const handleChangeCostoOrario = (e) => {
        setCostoOrario(e.target.value)
    }

    /**
     * Crea l'oggetto che verrà salvato nel DB come Articolo o Commessa.
     * @param {Event} e l'evento che scatena la conferma
     */
    const thisHandleConfirm = (e) => {
        // Evito che la pagina venga ricaricata topo il confirm del form
        e.preventDefault()

        // Creo la variabile om che contiene tutte le macchine in modo che
        // le macchine undefined siano inizializzate a 0
        const om = {}
        macchine.forEach(m => {
            om[m.nome] = oreMacchina[m.nome] !== undefined ? oreMacchina[m.nome] : 0
            oreMacchina[m.nome] = 0
        })
        const obj = {
            costMat: costMat,
            costoOrario: costoOrario,
            numDisegno: numDisegno,
            numPezzi: numPezzi,
            totOre: totOre,
            totPreventivo: totPreventivo,
            ...om,
        }
        console.log('OBJ', obj)
        if (e.nativeEvent.submitter.id === 'primaryButton') {
            handleConfirm(obj)
            handleClose()
        } else {
            addArticolo(
                obj,
                () => setShowAlert(true),
            )
        }
    }

    /**
     * Renderizza le macchine nel modal
     */
    function renderMacchine() {
        // Alla prima esecuzione crea l'elenco delle macchine
        const macchineNames = []
        macchine.forEach(elem => macchineNames.push(elem.nome))

        const macchineList = macchineNames.sort().map((macchina) =>
            <div key={macchina}>
                <Form.Row>
                    <Col lg='4' md='4' sm='4'>
                        <Form.Label>{macchina}</Form.Label>
                    </Col>
                    <Col>
                        <InputGroup>
                            <FormControl
                                value={oreMacchina[macchina]}
                                aria-describedby="basic-addon1"
                                name={macchina}
                                onChange={ handleChangeOreMacchina } />
                            <InputGroup.Append>
                                <InputGroup.Text>Ore</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Form.Row>
                <br></br>
            </div> )
        setMacchineRender(macchineList)
    }

    /**
     * Carica l'articolo selezionato dallo scrivv view ventro al modal.
     * @param {Articolo} articolo l'oggetto che rappresenta l'articolo
     */
    const onArticoloClick = (articolo) => {
        setNumDisegno(articolo.numDisegno + '')
        setNumPezzi(articolo.numPezzi)
        setCostMat(articolo.costMat + '')
        setCostoOrario(articolo.costoOrario)
        // Viene fatta una copia dell'articolo al quale si eliminano tutti
        // gli elementi che non sono macchine. Così obj contiene solo ed
        // esclusivamente le macchine selezionate.
        const obj = {...articolo}
        delete obj.costMat
        delete obj.id
        delete obj.costoOrario
        delete obj.numDisegno
        delete obj.numPezzi
        delete obj.createdAt
        delete obj.totOre
        delete obj.totPreventivo
        delete obj.updatedAt
        setOreMacchina(obj)
        updateTotOre()
    }

    /**
     * Renderizza gli articoli da visualizzare nel dropdown della creazione di un nuovo articolo
     */
    function renderArticoli() {
        getAllArticoli( articoli => {
            const AR = articoli.map( art =>
                <Dropdown.Item
                    key={art.id}
                    onClick={ () => onArticoloClick(art) } >
                    {
                        art.numDisegno
                    }
                </Dropdown.Item> )
            setArticoliRender(AR)
        })
    }

    useEffect(()=>{
        // Ogni volta che vengono modificati i valori totOre,
        // costoOrario, costMat, numPezzi modifica il preventivo
        setTotPreventivo(
            (totOre * costoOrario + parseFloat(costMat)) * numPezzi )
        updateTotOre()
        renderMacchine()
        getAllMacchine(setMacchine, () => {})

        if (firstRender && modalFrom==='addCommessa') {
            renderArticoli()
            setFirstRender(false)
        }
    }, [totOre, costoOrario, costMat, numPezzi, oreMacchina])


    return (
        <div>
            {
                ADD ? (
                    <Button
                        className='float-right vertical-center'
                        onClick={ handleShow }>
                            Aggiungi Articolo
                    </Button>
                ) : (
                    <Button
                        variant='link'
                        title='Modifica'
                        size='sm'
                        onClick={ handleShow }>
                            <FaEdit style={{ color: 'black' }}/>
                    </Button>
                )
            }
            <Modal
                show={show}
                onHide={ handleClose } >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Crea Articolo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            id='formAddCommessaSingola'
                            onSubmit={ thisHandleConfirm }>
                            <Form.Row>
                                <Col lg='4' md='4' sm='4'>
                                    <Form.Label>Numero disegno</Form.Label>
                                </Col>
                                <Col>
                                    <InputGroup>
                                        <FormControl
                                            required
                                            disabled={ !ADD }
                                            value={ numDisegno }
                                            aria-describedby="basic-addon1"
                                            name='numDisegno'
                                            placeholder='Numero Disegno'
                                            onChange={handleChangeNumDisegno} />
                                            { modalFrom==='addCommessa' &&
                                                (
                                                <DropdownButton
                                                    as={ InputGroup.Append }
                                                    title='Scegli'
                                                    variant='secondary'
                                                    disabled={ !ADD }
                                                    >
                                                        {articoliRender}
                                                </DropdownButton>
                                                )
                                            }
                                    </InputGroup>
                                </Col>
                            </Form.Row>
                            <br></br>
                            <Form.Row>
                                <Col lg='4' md='4' sm='4'>
                                    <Form.Label>Numero pezzi</Form.Label>
                                </Col>
                                <Col>
                                    <InputGroup>
                                        <FormControl
                                            value={numPezzi}
                                            aria-describedby="basic-addon1"
                                            name='numPezzi'
                                            onChange={handleChangeNumPezzi} />
                                    </InputGroup>
                                </Col>
                            </Form.Row>
                            <br></br>
                            <Form.Row>
                                <Col lg='4' md='4' sm='4'>
                                    <Form.Label>Costo materiali</Form.Label>
                                </Col>
                                <Col>
                                    <InputGroup>
                                        <FormControl
                                            value={ costMat }
                                            aria-describedby="basic-addon1"
                                            name='costMat'
                                            isInvalid={
                                                costMat === '' ||
                                                isNaN(costMat)
                                            }
                                            onChange={ handleChangeCostMat }/>
                                        <InputGroup.Append style={{}}>
                                            <InputGroup.Text>€</InputGroup.Text>
                                        </InputGroup.Append>
                                        <Form.Control.Feedback type="invalid">
                                            {'Valore non valido'}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Row>
                            <br></br>
                            <Form.Row>
                                <Col lg='4' md='4' sm='4'>
                                    <Form.Label>Costo orario</Form.Label>
                                </Col>
                                <Col>
                                    <InputGroup>
                                        <FormControl
                                            aria-describedby="basic-addon1"
                                            name='costoOrario'
                                            value={costoOrario}
                                            isInvalid={
                                                costoOrario === '' ||
                                                isNaN(costoOrario)
                                            }
                                            onChange={handleChangeCostoOrario}/>
                                        <InputGroup.Append>
                                            <InputGroup.Text>€</InputGroup.Text>
                                        </InputGroup.Append>
                                        <Form.Control.Feedback type="invalid">
                                            {'Valore non valido'}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Form.Row>
                            <br></br>
                            { macchineRender }
                        </Form>
                        <p>Ore: {totOre} </p>
                        <p>Totale: {totPreventivo} €</p>
                    </Modal.Body>
                    <Modal.Footer>
                        {
                            showAlert &&
                            <p
                                className="text-success" >
                                Articolo salvato
                            </p>
                        }
                        <Button // Bottone fittizio che serve per emulare il comportamento del bottone di aggiungi.
                                // è utile perchè altrimenti premendo "invio" sul form aggiungeva l'articolo alla
                                // lista degli articoli e non alla commessa
                            id='primaryButton'
                            variant="primary"
                            type='submit'
                            hidden={true}
                            form='formAddCommessaSingola'>
                        </Button>
                        {
                            modalFrom === 'addCommessa' &&
                            <Button
                                id='salvaArticoliButton'
                                variant='success'
                                type='submit'
                                form='formAddCommessaSingola'
                                title='Salva nella lista degli articoli' >
                                Salva articolo
                            </Button>
                        }
                        <Button variant="secondary" onClick={handleClose}>
                            Annulla
                        </Button>
                        <Button
                            id='primaryButton'
                            variant="primary"
                            type='submit'
                            autoFocus
                            form='formAddCommessaSingola'>
                            {
                                ADD ?
                                'Aggiungi':
                                'Modifica'
                            }
                        </Button>
                    </Modal.Footer>
            </Modal>
        </div>


    )
}

ModalCommessaSingola.propTypes = {
    data: PropTypes.object,
    modalFrom: PropTypes.string.isRequired,
    handleConfirm: PropTypes.func.isRequired,
}

export default ModalCommessaSingola
