import React, { useEffect, useState } from 'react';
import { addMacchina, deleteMacchina, subscribeMacchine, unsubscribeMacchine } from '../../DAO/Macchine.service';
import MacchineTable from './MacchineTable';
import ModalNewMacchina from './ModalNewMacchina';
import AlertError from '../../components/AlertError'
import { Col, Row } from 'react-bootstrap';
import AlertSuccess from '../../components/AlertSuccess';

/**
 * @return {Component} il componentes
 */
function Macchine() {
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
        subscribeMacchine(setData, setError);
        return () => {
            unsubscribeMacchine()
        };
    }, []);

    return (
        <div className='page'>
            {alerts}
            <Row className='align-items-center'>
                <Col>
                    <Row className='ml-1'>
                        <h1>Macchine</h1>
                    </Row>
                </Col>
                <Col>
                    <ModalNewMacchina setError={setError}/>
                </Col>
            </Row>

            <MacchineTable
                data={data}
                setSuccess={setSuccess}
                setError={setError}/>
        
        </div>
    )
}

export default Macchine;
