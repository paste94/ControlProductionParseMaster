import React, { useEffect, useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import BtnConfirm from './BtnConfirm';
import packageJson from '../../../package.json';
import { FaCheck, FaTimes } from 'react-icons/fa';

/**
 * Pagina per la visualizzazione degli articoli salvati.
 * @return {Component} il component
 */
function Impostazioni() {
    const [serverUrl, setServerUrl] = useState('')
    const [defaultCostOrario, setDefaultCostOrario] = useState(0)

    const handleResetServerURL = (callback) => {
        localStorage.setItem('ServerUrl', 'http://localhost:1337')
        setServerUrl(localStorage.getItem('ServerUrl'))
        callback
    }

    const handleSaveServerURL = (callback) => {
        localStorage.setItem('ServerUrl', serverUrl)
        callback
    }

    const handleSaveDefaultCostOrario = (callback) => {
        localStorage.setItem('DefaultCostOrario', defaultCostOrario)
        callback
    }

    useEffect(() => {
        const _url = localStorage.getItem('ServerUrl')
        const _defaultCostOrario = localStorage.getItem('DefaultCostOrario') ?? 0
        setServerUrl(_url)
        setDefaultCostOrario(_defaultCostOrario)
    }, [])

    // TODO: Aggiungi pagina di changelog
    // TODO: Aggiungi pagina di richiesta nuove features
    return (
        <div className='page'>
            <Row className='align-items-center'>
                <Col>
                    <h1>Impostazioni</h1>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col lg='4' md='4' sm='4'>
                    <Form.Label>Server URL</Form.Label>
                </Col>
                <Col>
                    <InputGroup>
                        <FormControl
                            onChange={ (e) => setServerUrl(e.target.value)}
                            value={serverUrl} />
                        <BtnConfirm
                            handleConfirm={handleSaveServerURL}
                            title='Salva modifiche'
                            variant="outline-success"
                            text="Questa operazione non può essere annullata, se non si è certi delle conseguenze NON confermare!">
                                <FaCheck/>
                        </BtnConfirm>
                        <BtnConfirm
                            handleConfirm={handleResetServerURL}
                            variant="outline-danger"
                            title="Reset"
                            text="Questa operazione non può essere annullata, se non si è certi delle conseguenze NON confermare!">
                                <FaTimes/>
                        </BtnConfirm>
                    </InputGroup>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col lg='4' md='4' sm='4'>
                    <Form.Label>Default costo orario (€)</Form.Label>
                </Col>
                <Col>
                    <InputGroup>
                        <FormControl
                            onChange={ (e) => setDefaultCostOrario(e.target.value)}
                            value={defaultCostOrario}
                            type='number'/>
                        <BtnConfirm
                            handleConfirm={handleSaveDefaultCostOrario}
                            title='Salva modifiche'
                            variant="outline-success"
                            text={`Modificare il costo di default dei materiali a ${defaultCostOrario} €?`}>
                                <FaCheck/>
                        </BtnConfirm>
                    </InputGroup>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    <h3>Credits</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Control Production Master (v{packageJson.version})</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Creato da Riccardo Pasteris (<a href='mailto:riccardopasteris@gmail.com'>riccardopasteris@gmail.com</a>)</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Davide Santià (<a href='mailto:davsan@infinito.it'>davsan@infinito.it</a>)</p>
                </Col>
            </Row>
            <div
                style={{
                    position: 'absolute',
                    right: 30,
                    bottom: 20,
                }}>
            </div>
        </div>
    )
}

export default Impostazioni;
