import React, {ReactElement, useState} from 'react';
import { Col, Row } from 'react-bootstrap';
import CommesseArchiviateTable from './CommesseArchiviateTable';
import AlertError from '../../components/AlertError';
import AlertSuccess from '../../components/AlertSuccess';

/**
* Schermata che mostra le Commesse archiviate, aperte e non. 
* Da qui non è possibile modificare, aprire o chiudere commesse.  
*
* @returns Il component della pagina
*/
function CommesseArchiviate(): ReactElement {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

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
                        <h1>Commesse Archiviate</h1>
                    </Row>
                </Col>
            </Row>

            <CommesseArchiviateTable
                setSuccess={setSuccess}
                setError={setError}
                />
        </div>
    )
}

export default CommesseArchiviate;
