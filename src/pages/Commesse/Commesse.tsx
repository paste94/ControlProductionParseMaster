import React, {PropsWithChildren, ReactElement, useEffect, useState} from 'react';
import CommesseTable from './CommesseTable';
import ModalNewCommessa from './ModalNewCommessa';
import { Col, Row } from 'react-bootstrap';
import AlertError from '../../components/AlertError';
import AlertSuccess from '../../components/AlertSuccess';
import Commessa from '../../classes/Commessa';

/**
 * Schermata che mostra le Commesse aperte e non. Qui vengono mostrate solo le commesse non 
 * archiviate. Da qui è possibile accedere alle commesse singole (dettaglio), modificare o 
 * eliminare commesse intere. 
 *
 * @returns Il component della pagina
 */
function Commesse(): ReactElement {
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')

    /**
     * Mostra gli alert di errore o successo nella pagina
     */
    const alerts = <>
        <AlertError
            show={error !== ''}
            message={error}
            handleClose={() => setError('')} />
        <AlertSuccess
            show={success !== ''}
            message={success}
            handleClose={() => setSuccess('')} />
    </>

    return (
        <div className='page'>
            {alerts}
            <Row className='align-items-center'>
                <Col>
                    <Row className='ml-1'>
                        <h1>Commesse</h1>
                    </Row>
                </Col>
                <Col>
                    <ModalNewCommessa setError={setError} />
                </Col>
            </Row>

            <CommesseTable
                setSuccess={setSuccess}
                setError={setError}
                 />

        </div>
    )
}

export default Commesse;
