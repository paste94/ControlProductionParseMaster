import React, {useEffect, useState} from 'react';
import { Col, Row } from 'react-bootstrap';
import AlertError from '../../components/AlertError'
import CommesseArchiviateTable from './CommesseArchiviateTable';
import { deleteCommessaArchiviata, subscribeCommesseArchiviate, unsubscribeCommesseArchiviate } from '../../DAO/CommesseArchiviate.service';

/**
 * Pagina delle commesse
 * @param {object}  props properties
 * @return {Component} Il componente creato
 */
function CommesseArchiviate() {
    const [data, setData] = useState([])
    const [error, setError] = useState('')

    const handleDelete = id => deleteCommessaArchiviata(id)

    // Il secondo parametro [] serve per farlo eseguire una volta
    // sola quando avvii la pagina
    useEffect(() => {
        subscribeCommesseArchiviate(setData, setError);
        return unsubscribeCommesseArchiviate;
    }, []);

    return (
        <div className='page'>
            <AlertError
                show={error !== ''}
                message={error}
                handleClose={ () => setError('') } />
            <Row className='align-items-center'>
                <Col>
                    <Row className='ml-1'>
                        <h1>Commesse Archiviate</h1>
                    </Row>
                </Col>
            </Row>

            <CommesseArchiviateTable
                data={data}
                handleDelete={handleDelete} />
        </div>
    )
}

export default CommesseArchiviate;
