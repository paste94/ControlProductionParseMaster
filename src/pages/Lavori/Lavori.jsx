import React, { useEffect, useState } from 'react';
import { Col, Row, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import { lavoriListener, getLavori } from '../../DAO/Lavori.service';
import { getAllMacchine } from '../../DAO/Macchine.service';
import { dateToStr } from '../../DAO/http-common'
import LavoriTable from './LavoriTable';
/**
 * 
 * @param {Object}  props Properties
 *                  - handleShowAlert (function) handler che mostra l'alert per gli errori
 */
function Lavori(props){
    const [macchine] = useState(getAllMacchine)
    const [selectedMacchina, setSelectedMacchina] = useState(macchine[0].nome)
    const [data, setData] = useState([])
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0])
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0])

    const handleSelectMacchina = (event) => {
        setSelectedMacchina(event.target.value)
    }
    const handleSelectStartDate = (event) => {
        setStartDate(event.target.value)
    }
    const handleSelectEndDate = (event) => {
        setEndDate(event.target.value)
    }

    useEffect(() => {
        getLavori(selectedMacchina, startDate, endDate, setData, () => {})
    }, [selectedMacchina, startDate, endDate]);

    return (
        <div className='page'>
            <div className='container' style={{marginBottom: 10}}>
                <div className='row align-items-center'>
                    <div className='col'>
                        <h1>Macchine</h1>
                    </div>
                </div>
                <Row>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Macchina</InputGroup.Text>
                            </InputGroup.Prepend>
                            <select className='custom-select' onChange={handleSelectMacchina}>
                                <option value='Tutte'>Tutte</option>
                                { macchine.map((elem) => <option value={elem.nome}>{elem.nome}</option>) }
                            </select>
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Dal</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type='date' value={startDate} onChange={handleSelectStartDate}></FormControl>
                        </InputGroup>
                    </Col>
                    <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Al</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type='date' value={endDate} onChange={handleSelectEndDate}></FormControl>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <LavoriTable
                        data={ data } />
                </Row>
            </div>
        </div>
    )
}

export default Lavori;
