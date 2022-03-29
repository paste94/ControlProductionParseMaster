import React, { useEffect, useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import BtnConfirm from './BtnConfirm';
import packageJson from '../../../package.json';


/**
 * Pagina per la visualizzazione degli articoli salvati.
 * @return {Component} il component
 */
function Impostazioni() {
    const [serverUrl, setServerUrl] = useState('')

    const handleResetDefaultSettings = (callback) => {
        localStorage.setItem('ServerUrl', 'http://localhost:1337')
        setServerUrl(localStorage.getItem('ServerUrl'))
        callback
    }

    const handleSaveSettings = (callback) => {
        console.log('SAVE', serverUrl)
        localStorage.setItem('ServerUrl', serverUrl)
        callback
    }

    useEffect(() => {
        const _url = localStorage.getItem('ServerUrl')
        setServerUrl(_url)
    }, [])

    // TODO: Aggiungi pagina di changelog
    // TODO: Aggiungi pagina di richiesta nuove features
    return (
        <div className='page'>
            <Row className='align-items-center'>
                <Col>
                    <h1>Impostazioni</h1>
                </Col>
                <Row
                    style={{
                        marginRight: '0px',
                    }}
                    className='float-right vertical-center' >
                    <Col>
                        <BtnConfirm
                            handleConfirm={handleSaveSettings}
                            title={'Salvare le nuove impostzioni?'} >
                            Salva
                        </BtnConfirm>
                    </Col>
                    <Col>
                        <BtnConfirm
                            handleConfirm={handleResetDefaultSettings}
                            title={'Resettare le impostazioni di default?'}>
                                Reset
                        </BtnConfirm>
                    </Col>
                </Row>
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
