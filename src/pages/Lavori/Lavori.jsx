import React, { useEffect, useState } from 'react';
import { Col, Row, InputGroup, FormControl, Form } from 'react-bootstrap';
import { getLavori } from '../../DAO/Lavori.service';
import { getAllMacchine } from '../../DAO/Macchine.service';
import LavoriTable from './LavoriTable';
import PropTypes from 'prop-types'

/**
 * @return {Component} il component creato
 */
function Lavori() {
    const [data, setData] = useState([])
    const [macchine] = useState(getAllMacchine)
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
        getLavori(
            selectedMacchina,
            startDate,
            endDate,
            checked,
            setData,
            () => {} )
    }, [selectedMacchina, startDate, endDate, checked]);

    return (
        <div className='page'>
            <div className='container' style={{marginBottom: 10}}>
                <div className='row align-items-center'>
                    <div className='col'>
                        <h1>Macchine</h1>
                    </div>
                </div>
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
        </div>
    )
}

export default Lavori;
