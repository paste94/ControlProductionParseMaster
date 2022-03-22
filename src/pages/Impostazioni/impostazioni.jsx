import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormCheck, FormControl, InputGroup, Row } from 'react-bootstrap';
import BtnConfirm from './BtnConfirm';

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

    // TODO: Salva server url
    // TODO: Chiedi conferma con modal avvisando che è pericoloso modificare questa impostazione!
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
