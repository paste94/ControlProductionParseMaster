import React, { useEffect, useState } from 'react';
import { addMacchina, deleteMacchina, subscribeMacchine, unsubscribeMacchine } from '../../DAO/Macchine.service';
import MacchineTable from './MacchineTable';
import ModalNewMacchina from './ModalNewMacchina';
import AlertError from '../../components/AlertError'
import { Col, Row } from 'react-bootstrap';

/**
 * @return {Component} il componentes
 */
function Macchine() {
    const [data, setData] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        subscribeMacchine(setData, () => {});
        return unsubscribeMacchine;
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
                        <h1>Macchine</h1>
                    </Row>
                </Col>
                <Col>
                    <ModalNewMacchina
                        handleAdd={addMacchina}/>
                </Col>
            </Row>

            <MacchineTable
                data={data}
                handleDelete={deleteMacchina} />
        </div>
    )
}

export default Macchine;
