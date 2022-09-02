import React, { useEffect } from 'react'
import {HashRouter as Router, Redirect, Route } from 'react-router-dom'
import Page from '../pages/Page'
import Sidebar from './Sidebar'
import Impiegati from '../pages/Impiegati/Impiegati'
import Lavori from '../pages/Lavori/Lavori'
import Commesse from '../pages/Commesse/Commesse'
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
    useEffect(() => {
        Parse.LiveQuery.on('error', (error) => {
            console.error(`Errore di connessione al server ${error.currentTarget.url}. Verificare che l'indirizzo sia corretto nela pagina "impostazioni" e riavviare il programma per rendere effettive le modifiche.`)
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
                        <Impiegati />
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
                        <Lavori/>
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
                        <Articoli/>
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
                <Row id='row-router-header-navbar'>
                    <Col id='col-router-header-navbar'>
                        <Sidebar data={routes} />
                    </Col>
                </Row>
                <Row
                    id='row-router-body-page' >
                    <Col id='col-router-body-page'>
                        <div style={{display: 'flex'}}>
                        <Route
                            exact
                            path='/'
                            render={() => {
                                return <Redirect to='/commesse' />
                            }}
                        />
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
                                exact
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
        </div>
    )
}

AppRoutes.propTypes = {
    location: PropTypes.object,
}

export default AppRoutes;
