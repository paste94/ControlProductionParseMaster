import React from 'react';
import { InputGroup, FormControl, Form, Col } from 'react-bootstrap';
import PropTypes from 'prop-types'

/**
 *
 * @param {Objects} param0 parametri per il component:
 *                  - value: Il valore del num disegno
 *                  - onChange: la funzione onchenge del num disegno
 *                  - disabled: Disabilita la modifica
 *                  - articoliRender: l'elenco di articoli da visualizzare per l'autofill
 * @return {Component} il component creato
 */
function OreMacchina({
    value,
    onChange,
    nomeMacchina,
}) {
    return (
        <Form.Row className="align-items-center">
            <Col lg='4' md='4' sm='4'>
                <Form.Label>{nomeMacchina}</Form.Label>
            </Col>
            <Col>
                <InputGroup>
                    <FormControl
                        type="number"
                        value={value}
                        aria-describedby="basic-addon1"
                        name={nomeMacchina}
                        isInvalid={
                            value === '' ||
                            isNaN(value) ||
                            value < 0
                        }
                        onChange={onChange} />
                    <InputGroup.Append>
                        <InputGroup.Text
                            className='rounded-right' >
                                Ore
                        </InputGroup.Text>
                    </InputGroup.Append>
                    <Form.Control.Feedback type="invalid">
                        {'Valore non valido'}
                    </Form.Control.Feedback>
                </InputGroup>
            </Col>
        </Form.Row>
    )
}

OreMacchina.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    nomeMacchina: PropTypes.string,
}

export default OreMacchina;