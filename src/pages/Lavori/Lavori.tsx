import React, { ReactElement, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import AlertError from '../../components/AlertError';
import { subscribeLavori } from '../../DAO/Lavori.service';
import LavoriTable from './LavoriTable';

/**
 * @return {Component} il component creato
 */
function Lavori(): ReactElement {
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [minutes, setMinutes] = useState(0)
    const [hoursString, setHoursString] = useState('')

    const minToString = (mins: number) => `${Math.floor(mins/60)} h, ${mins%60} m`  

    useEffect(() => {
        const subscribe = async () => 
            await subscribeLavori(setData, (err: string) => console.error(err))
        subscribe()
    }, [])

    useEffect(() => {
        const set = async () => 
            await setHoursString(minToString(minutes))
        set()
    }, [minutes])

    return (
        <div className='page'>
            <AlertError
                show={error !== ''}
                message={error}
                handleClose={ () => setError('') } />

            <Row className='align-items-center'>
                <Col sm={8}>
                    <Row className='ml-1'>
                        <h1>Lavori</h1>
                    </Row>
                </Col>
                <Col sm={4}>
                    <Row>
                        <h2>
                            Tot: {hoursString}
                        </h2>
                    </Row>
                </Col>
            </Row>

            <LavoriTable
                data={data}
                setMinutes={setMinutes}/>
        </div>
    )
}

export default Lavori;
