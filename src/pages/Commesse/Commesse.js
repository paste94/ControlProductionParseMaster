import React, {useEffect, useState} from 'react';
import CommesseTable from './CommesseTable';
import ModalNewCommessa from './ModalNewCommessa';
import {
    updateCommessa,
    addCommessa,
    subscribeCommesse,
    unsubscribeCommesse,
} from '../../DAO/Commesse.service'
import { Col, Row } from 'react-bootstrap';
import AlertError from '../../components/AlertError'
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

    const handleAdd = (newCommessa) => {
        addCommessa(
            {
                nome: newCommessa.nome,
                numero: newCommessa.numero,
                data_offerta: new Date(newCommessa.data_offerta),
                data_consegna: new Date(newCommessa.data_consegna),
                preventivo: [],
                chiusa: false,
            },
        )
    }

    // Il secondo parametro [] serve per farlo eseguire una volta
    // sola quando avvii la pagina
    useEffect(() => {
        subscribeCommesse(setData, setError);
        return unsubscribeCommesse;
    }, []);

    return (
        <div className='page'>
            <AlertError
                show={error !== ''}
                message={error}
                handleClose={ () => setError('') } />
            <AlertSuccess
                show={success !== ''}
                message={success}
                handleClose={ () => setSuccess('') } />
            <Row className='align-items-center'>
                <Col>
                    <Row className='ml-1'>
                        <h1>Commesse</h1>
                    </Row>
                </Col>
                <Col>
                    <ModalNewCommessa
                        handleAdd={handleAdd}/>
                </Col>
            </Row>

            <CommesseTable
                data={data}
                handleEdit={updateCommessa}
                setSuccess={setSuccess}
                setError={setError}
                 />

        </div>
    )
}

export default Commesse;
