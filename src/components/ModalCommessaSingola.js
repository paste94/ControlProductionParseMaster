import { Button, Form, Modal, Col, FormControl, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import {getAllMacchine} from '../DAO/Macchine.service'
import { FaEdit } from 'react-icons/fa';
import { getAllArticoli } from '../DAO/Articoli.service';

/**Definise modal per la modifica e la aggiunta di un lavoro 
 * 
 * @param {Object}  props 
 *                  - data (object) l'oggetto che contiene il lavoro da modificare. deve contenere
 *                          - numPezzi
 *                          - costMat
 *                          - costoOrario
 *                          - numDisegno
 *                          - elenco dei valori delle macchine
 *                  - handleConfirm (function) funzione da eseguire per la conferma del modal (aggiunta o modifica)
 *                  - fromPage (string) stringa che identifica da dove viene richiamato il component. 
 *                                      Se vale 'commessaSingola' allora viene mostrato il dropdown per la 
 *                                      selezione rapida dell'articolo
 *                  - type (string) stringa che identifica se il component serve per aggiungere un elemento o modificarlo.
 *                                  Se vale 'add' allora mostra le informazioni riguardanti l'aggiunta di un elemento 
 *                                  altrimenti mostra gli elementi per la modifica. 
 */
function ModalCommessaSingola(props){
    const DEF_NUM_PEZZI = props.data.numPezzi
    const DEF_COSTO_MAT = props.data.costMat
    const DEF_COSTO_ORARIO = props.data.costoOrario
    const NUM_DISEGNO = props.data.numDisegno
    const [show, setShow] = useState(false)
    const [macchineRender, setMacchineRender] = useState([])
    const [numDisegno, setNumDisegno] = useState(NUM_DISEGNO)
    const [numPezzi, setNumPezzi] = useState(DEF_NUM_PEZZI)
    const [costMat, setCostMat] = useState(DEF_COSTO_MAT)
    const [costoOrario, setCostoOrario] = useState(DEF_COSTO_ORARIO)
    const [totOre, setTotOre] = useState(0)
    const [totPreventivo, setTotPreventivo] = useState(0)
    const [oreMacchina, setOreMacchina] = useState({})
    const [firstRender, setFirstRender] = useState(true)
    const [btn, setBtn] = useState()
    const [articoli, setArticoli] = useState([])
    const [articoliRender, setArticoliRender] = useState([])

    // Imposta tutti i valori ai default
    const initNewCommessa = () => {
        setNumDisegno(NUM_DISEGNO)
        setNumPezzi(DEF_NUM_PEZZI)
        setCostMat(DEF_COSTO_MAT)
        setCostoOrario(DEF_COSTO_ORARIO)
        const macchineList = getAllMacchine()
        let om = {}
        for (const [key, value] of Object.entries(macchineList)){
            om[value.nome] = props.data[value.nome]
        }
        setOreMacchina(om)
    }

    // Aggiorna il totale delle ore delle macchine
    const updateTotOre = () => {
        let tot = 0
        for (const [key, value] of Object.entries(oreMacchina)){
            tot = tot + value
        }
        setTotOre(tot)
    }
    
    const handleShow = () => {
        setShow(true)
        initNewCommessa()
    }
    const handleClose = () => setShow(false)
    const handleChangeOreMacchina = (e) => {
        oreMacchina[e.target.name] = e.target.value !== '' ? parseFloat(e.target.value) : 0
        updateTotOre()
    }
    const handleChangeNumDisegno = (e) => setNumDisegno(e.target.value)
    const handleChangeNumPezzi = (e) => {
        e.target.value !== '' ? setNumPezzi(parseFloat(e.target.value)) : setNumPezzi(0)
    }
    const handleChangeCostMat = (e) => {
        e.target.value !== '' ? setCostMat(parseFloat(e.target.value)) : setCostMat(0)
    }
    const handleChangeCostoOrario = (e) => {
        e.target.value !== '' ? setCostoOrario(parseFloat(e.target.value)) : setCostoOrario(0)
    }
    
    const handleConfirm = (e) => {
        e.preventDefault();
        props.handleConfirm({
            costMat: costMat,
            costoOrario: costoOrario,
            numDisegno: numDisegno, 
            numPezzi: numPezzi,
            totOre: totOre,
            totPreventivo: totPreventivo,
            stozz: oreMacchina['stozz'] !== undefined ? oreMacchina['stozz'] : 0,
            squadr: oreMacchina['squadr'] !== undefined ? oreMacchina['squadr'] : 0,
            fresa: oreMacchina['fresa'] !== undefined ? oreMacchina['fresa'] : 0,
            tornio: oreMacchina['tornio'] !== undefined ? oreMacchina['tornio'] : 0,
            CN: oreMacchina['CN'] !== undefined ? oreMacchina['CN'] : 0,
            rettifica: oreMacchina['rettifica'] !== undefined ? oreMacchina['rettifica'] : 0,
            banco: oreMacchina['banco'] !== undefined ? oreMacchina['banco'] : 0
        })
        //TODO: Aggiungi la commessa al DB
        handleClose()
    }

    function renderMacchine() {
        // Alla prima esecuzione crea l'elenco delle macchine
        let macchineNames = [] 
        getAllMacchine().forEach(elem => macchineNames.push(elem.nome))

        const macchineList = macchineNames.sort().map((macchina) => 
            <div>
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
                                onChange={handleChangeOreMacchina} />
                            <InputGroup.Append>
                                <InputGroup.Text>Ore</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Form.Row>
                <br></br>
            </div>
        )
        setMacchineRender(macchineList)
    }

    const onArticoloClick = (articolo) => {
        setNumDisegno(articolo.numDisegno)
        setNumPezzi(articolo.numPezzi)
        setCostMat(articolo.costMat)
        setCostoOrario(articolo.costoOrario)
        //TODO: Aggiorna questi
        let obj = {}
        obj['stozz'] = articolo.stozz
        obj['squadr'] = articolo.squadr
        obj['fresa'] = articolo.fresa
        obj['tornio'] = articolo.tornio
        obj['CN'] = articolo.CN
        obj['rettifica'] = articolo.rettifica
        obj['banco'] = articolo.banco
        setOreMacchina(obj)
        updateTotOre()
    }

    function renderArticoli() {
        getAllArticoli( articoli => {
            setArticoli(articoli)
            let AR = articoli.map( art => 
                <Dropdown.Item onClick={ () => onArticoloClick(art) }>{art.numDisegno}</Dropdown.Item>
            )
            setArticoliRender(AR)
        })
        //TODO: Mostra render degli articoli
        //TODO: Crea onclick per gli elementi 
    }

    useEffect(()=>{
        // Ogni volta che vengono modificati i valori totOre, costoOrario, costMat, numPezzi modifica il preventivo
        setTotPreventivo((totOre * costoOrario + costMat) * numPezzi)
        updateTotOre()
        renderMacchine()

        if(firstRender && props.fromPage==='commessaSingola'){
            renderArticoli()
            setFirstRender(false)
        }
    },[totOre,costoOrario,costMat,numPezzi,oreMacchina])


    return (
        <div>
            {
                props.type === 'add' ? (
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
                        onClick={handleShow}>
                            <FaEdit style={{color:'black'}}/>
                    </Button>
                )
            }
            <Modal
                show={show}
                onHide={handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Crea Articolo
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form id='formAddCommessaSingola' onSubmit={ handleConfirm }>
                            <Form.Row>
                                <Col  lg='4' md='4' sm='4'>
                                    <Form.Label>Numero disegno</Form.Label>
                                </Col>
                                <Col>
                                    <InputGroup>
                                        <FormControl
                                            required
                                            disabled={ props.type!=='add' }
                                            value={ numDisegno }
                                            aria-describedby="basic-addon1"
                                            name='numDisegno'
                                            placeholder='Numero Disegno'
                                            onChange={handleChangeNumDisegno} />
                                            {
                                                props.fromPage==='commessaSingola' && (
                                                    <DropdownButton
                                                        as={ InputGroup.Append }
                                                        title='Scegli' 
                                                        variant='secondary'
                                                        disabled={ props.type!=='add' } >
                                                            {articoliRender}
                                                    </DropdownButton>
                                                )   
                                            }
                                    </InputGroup>
                                </Col>
                            </Form.Row>
                            <br></br>
                            <Form.Row>
                                <Col  lg='4' md='4' sm='4'>
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
                                <Col  lg='4' md='4' sm='4'>
                                    <Form.Label>Costo materiali</Form.Label>
                                </Col>
                                <Col>
                                    <InputGroup>
                                        <FormControl
                                            value={costMat}
                                            aria-describedby="basic-addon1"
                                            name='costMat'
                                            onChange={handleChangeCostMat}/>
                                        <InputGroup.Append>
                                            <InputGroup.Text>€</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                            </Form.Row>
                            <br></br>
                            <Form.Row>
                                <Col  lg='4' md='4' sm='4'>
                                    <Form.Label>Costo orario</Form.Label>
                                </Col>
                                <Col>
                                    <InputGroup>
                                        <FormControl
                                            aria-describedby="basic-addon1"
                                            name='costoOrario'
                                            value={costoOrario}
                                            onChange={handleChangeCostoOrario}/>
                                        <InputGroup.Append>
                                            <InputGroup.Text>€</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                            </Form.Row>
                            <br></br>
                            {macchineRender}
                        </Form>
                        <p>Ore: {totOre} </p>
                        <p>Totale: {totPreventivo} €</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Annulla
                        </Button>
                        <Button variant="primary" type='submit' form='formAddCommessaSingola'>
                            { props.type==='add' ? 'Aggiungi' : 'Modifica'}
                        </Button>                  
                    </Modal.Footer>
            </Modal>
        </div>


    )
}
export default ModalCommessaSingola
