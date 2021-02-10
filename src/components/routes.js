import React, { useState } from 'react';
import {BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Page from '../pages/Page';
import Sidebar from './Sidebar';
import Impiegati from '../pages/Impiegati/Impiegati';
import Lavori from '../pages/Lavori/Lavori';
import Commesse from '../pages/Commesse/Commesse';
import { Alert, AlertContainer } from "react-bs-notifier";
import Articoli from '../pages/Articoli/Articoli';
import CommessaSingola from '../pages/CommessaSingola/CommessaSingola';

/**
 * Elemento che definisce le routes dell'applicazione. Permette di definire i path e le 
 * destinazioni delle varie pagine di navigazione.
 */
function AppRoutes(){
    // Lo stato dell'alert usato come errore
    const [alertState, setAlertState] = useState({
        show: false, 
        message: ''
    });

    // Mostra l'alert di errore 
    const handleShowAlert = (msg) => setAlertState({message: msg, show: true});

    // Chiudi l'alert e cancella il messaggio
    const handleCloseAlert = () => setAlertState({message: '', show: false});

    const routes = [
        {
            id: 0,
            path: '/commesse',
            text: 'Commesse',
            main: () => {
                return(
                    <Page>
                        <Commesse
                            alertState={alertState}
                            handleShowAlert={handleShowAlert}
                            handleCloseAlert={handleCloseAlert} />
                    </Page>
                )
            }
        },
        {
            id: 1,
            path: '/impiegati',
            text: 'Impiegati',
            main: () => {
                return(
                    <Page>
                        <Impiegati
                            alertState={alertState}
                            handleShowAlert={handleShowAlert}
                            handleCloseAlert={handleCloseAlert} />
                    </Page>
                )
            }
        },
        {
            id: 2,
            path: '/lavori',
            text: 'Lavori',
            main: () => {
                return(
                    <Page>
                        <Lavori
                            alertState={alertState}
                            handleShowAlert={handleShowAlert}
                            handleCloseAlert={handleCloseAlert} />
                    </Page>
                )
            }
        },
        {
            id: 3,
            path: '/articoli',
            text: 'Articoli',
            main: () => {
                return(
                    <Page>
                        <Articoli
                            alertState={alertState}
                            handleShowAlert={handleShowAlert}
                            handleCloseAlert={handleCloseAlert} />
                    </Page>
                )
            }
        }
    ]

    return (
        <div>
            <Router>
                <div style={{display:'flex'}}>
                    <Sidebar data={routes} />
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
                            )
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
            </Router>

            <AlertContainer position="top-right">
                {alertState.show ? (
                    <Alert 
                        type="danger" 
                        headline="Errore" 
                        onDismiss={handleCloseAlert} 
                        showIcon={true} 
                        timeout={5000} >

						    {alertState.message}
					</Alert>
				) : null}
            </AlertContainer>


        </div>
    )
}

export default AppRoutes;
