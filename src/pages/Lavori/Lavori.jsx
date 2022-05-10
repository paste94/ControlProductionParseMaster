import React, { useEffect, useState } from 'react';
import { Col, Row, InputGroup, FormControl, Form, Collapse, Button } from 'react-bootstrap';
import AlertError from '../../components/AlertError';
import { getLavori, getMacchineLavori, subscribeLavori } from '../../DAO/Lavori.service';
import { getAllMacchine } from '../../DAO/Macchine.service';
import LavoriTable from './LavoriTable';

/**
 * @return {Component} il component creato
 */
function Lavori() {
    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [elencoMacchine, setElencoMacchine] = useState([])

    useEffect(() => {
        //getMacchineLavori(setElencoMacchine)
        subscribeLavori(setData, (err) => console.error(err))
    }, [])

    return (
        <div className='page'>
            <AlertError
                show={error !== ''}
                message={error}
                handleClose={ () => setError('') } />

            <Row className='align-items-center'>
                <Col>
                    <Row className='ml-1'>
                        <h1>Lavori</h1>
                    </Row>
                </Col>
            </Row>

            <LavoriTable
                data={data}/>
        </div>
    )

    /*
    const [data, setData] = useState([])
    const [macchine, setMacchine] = useState([])
    const [selectedMacchina, setSelectedMacchina] = useState('Tutte')
    const [startDate, setStartDate] =
        useState(new Date().toISOString().split('T')[0])
    const [endDate, setEndDate] =
        useState(new Date().toISOString().split('T')[0])
    const [checked, setChecked] =
        useState(false)

    const handleSelectMacchina = (event) =>
        setSelectedMacchina(event.target.value)
    const handleSelectStartDate = (event) => setStartDate(event.target.value)
    const handleSelectEndDate = (event) => setEndDate(event.target.value)
    const handleCkeck = (e) => setChecked(e.target.checked)


    useEffect(() => {
        getLavori(selectedMacchina, startDate, endDate, checked, setData, () => {} )
        getAllMacchine(setMacchine, () => {})
    }, [selectedMacchina, startDate, endDate, checked]);

    return (
        <div className='page'>
                <Row className='row align-items-center'>
                    <Col>
                        <h1>Lavori</h1>
                    </Col>
                </Row>
                <Collapse in={open}>

                </Collapse>
                <Row>
                    <Col className='my-auto'>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text
                                    id="basic-addon1" >
                                    Macchina
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <select
                                className='custom-select'
                                onChange={handleSelectMacchina} >
                                <option value='Tutte'>Tutte</option>
                                {
                                    macchine.map((elem) =>
                                        <option
                                            key={elem.nome}
                                            value={elem.nome} >
                                                {elem.nome}
                                        </option>)
                                }
                            </select>
                        </InputGroup>
                    </Col>
                    <Col className='my-auto'>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text
                                    id="basic-addon1" >
                                        Dal
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type='date'
                                value={ startDate }
                                onChange={ handleSelectStartDate } />
                        </InputGroup>
                    </Col>
                    <Col className='my-auto'>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text
                                    id="basic-addon1" >
                                        Al
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type='date'
                                value={ endDate }
                                onChange={ handleSelectEndDate } />
                        </InputGroup>
                    </Col>
                    <Col className='my-auto'>
                        <Form.Check
                            label='In corso'
                            checked={ checked }
                            onChange={ handleCkeck } />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <LavoriTable
                            data={ data } />
                    </Col>
                </Row>
        </div>
    )
    */
}

export default Lavori;
