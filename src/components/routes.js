import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import Page from '../pages/Page'
import Sidebar from './Sidebar'
import Impiegati from '../pages/Impiegati/Impiegati'
import Lavori from '../pages/Lavori/Lavori'
import Commesse from '../pages/Commesse/Commesse'
import { Alert, AlertContainer } from 'react-bs-notifier'
import Articoli from '../pages/Articoli/Articoli'
import CommessaSingola from '../pages/CommessaSingola/CommessaSingola'
import PropTypes from 'prop-types'
import Macchine from '../pages/DefinisciMacchine/Macchine'
import Impostazioni from '../pages/Impostazioni/impostazioni'
import { Parse } from '../DAO/http-common'
import CommesseArchiviate from '../pages/CommesseArchiviate/CommesseArchiviate'
import { Col, Row } from 'react-bootstrap'

/**
 * Elemento che definisce le routes dell'applicazione. Permette di definire i path e le
 * destinazioni delle varie pagine di navigazione.
 *
 * @return {Component} il componente creato
 */
function AppRoutes() {
    // Lo stato dell'alert usato come errore
    const [alertState, setAlertState] = useState({
        show: false,
        message: '',
    });

    // Mostra l'alert di errore
    const handleShowAlert = (msg) => setAlertState({message: msg, show: true});

    // Chiudi l'alert e cancella il messaggio
    const handleCloseAlert = () => setAlertState({message: '', show: false});

    useEffect(() => {
        Parse.LiveQuery.on('error', (error) => {
            console.log(error);
            setAlertState({
                show: true,
                message: `Errore di connessione al server ${error.currentTarget.url}. Verificare che l'indirizzo sia corretto nela pagina "impostazioni" e riavviare il programma per rendere effettive le modifiche.`,
            })
        });
    }, [])

    const routes = [
        {
            id: 0,
            path: '/commesse',
            text: 'Commesse',
            main: () => {
                return (
                    <Page>
                        <Commesse />
                    </Page>
                )
            },
        },
        {
            id: 6,
            path: '/commesse_archiviate',
            text: 'Commesse Archiviate',
            main: () => {
                return (
                    <Page>
                        <CommesseArchiviate />
                    </Page>
                )
            },
        },
        {
            id: 1,
            path: '/impiegati',
            text: 'Impiegati',
            main: () => {
                return (
                    <Page>
                        <Impiegati
                            alertState={alertState}
                            handleShowAlert={handleShowAlert}
                            handleCloseAlert={handleCloseAlert} />
                    </Page>
                )
            },
        },
        {
            id: 2,
            path: '/lavori',
            text: 'Lavori',
            main: () => {
                return (
                    <Page>
                        <Lavori
                            alertState={alertState}
                            handleShowAlert={handleShowAlert}
                            handleCloseAlert={handleCloseAlert} />
                    </Page>
                )
            },
        },
        {
            id: 3,
            path: '/macchine',
            text: 'Macchine',
            main: () => {
                return (
                    <Page>
                        <Macchine/>
                    </Page>
                )
            },
        },
        {
            id: 4,
            path: '/articoli',
            text: 'Articoli',
            main: () => {
                return (
                    <Page>
                        <Articoli
                            alertState={alertState}
                            handleShowAlert={handleShowAlert}
                            handleCloseAlert={handleCloseAlert} />
                    </Page>
                )
            },
        },
        {
            id: 5,
            path: '/Impostazioni',
            text: 'Impostazioni',
            main: () => {
                return (
                    <Page>
                        <Impostazioni/>
                    </Page>
                )
            },
        },
    ]

    return (
        <div>
            <Router>
                <Row>
                    <Col>
                        <Sidebar data={routes} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={{display: 'flex'}}>
                            <Redirect from='/' to='/commesse' />
                            {
                                routes.map(
                                    (route) => (
                                        <Route
                                            key={route.path}
                                            path={route.path}
                                            exact={route.exact}
                                            component={route.main}
                                        />
                                    ),
                                )
                            }
                            <Route
                                key='100'
                                path='/commessasingola'
                                component={(props)=>{
                                    return (
                                        <Page>
                                            <CommessaSingola commessa={props.location.state.commessa}/>
                                        </Page>
                                    )
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </Router>

            <AlertContainer position="top-right">
                {alertState.show ? (
                    <Alert
                        type="danger"
                        headline="Errore"
                        onDismiss={handleCloseAlert}
                        showIcon={true} >
                            {alertState.message}
                    </Alert>
                ) : null}
            </AlertContainer>

        </div>
    )
}

AppRoutes.propTypes = {
    location: PropTypes.object,
}

export default AppRoutes;
