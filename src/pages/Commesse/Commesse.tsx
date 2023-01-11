import React, {useEffect, useState} from 'react';
import CommesseTable from './CommesseTable';
import ModalNewCommessa from './ModalNewCommessa';
import { subscribeCommesse, unsubscribeCommesse } from '../../DAO/Commesse.service'
import { Col, Row } from 'react-bootstrap';
import AlertError from '../../components/AlertError';
import AlertSuccess from '../../components/AlertSuccess';


/**
 * Pagina delle commesse
 * @param {object}  props properties
 * @return {Component} Il componente creato
 */
function Commesse() {
    const [data, setData] = useState([])
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

    useEffect(() => {
        console.log('Component mounted');
        return () => {
            console.log('Component will be unmount')
        }
    }, []);

    // Il secondo parametro [] serve per farlo eseguire una volta
    // sola quando avvii la pagina
    // eslint-disable-next-line
    useEffect(() => {
        subscribeCommesse(setData, setError);
        return () => {
            unsubscribeCommesse()
        };
    }, []);

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
                data={data}
                setSuccess={setSuccess}
                setError={setError}
                 />

        </div>
    )
}

Commesse.propTypes = {
}

export default Commesse;
