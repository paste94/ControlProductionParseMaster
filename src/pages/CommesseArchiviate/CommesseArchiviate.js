import React, {useState} from 'react';
import { Col, Row } from 'react-bootstrap';
import CommesseArchiviateTable from './CommesseArchiviateTable';
import PropTypes from 'prop-types'
import AlertError from '../../components/AlertError';
import AlertSuccess from '../../components/AlertSuccess';

/**
 * Pagina delle commesse
 * @param {object}  props properties
 * @return {Component} Il componente creato
 */
function CommesseArchiviate() {
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

CommesseArchiviate.propTypes = {
    setSuccess: PropTypes.func,
    setError: PropTypes.func,
}

export default CommesseArchiviate;
