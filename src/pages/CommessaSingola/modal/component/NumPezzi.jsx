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
function NumPezzi({
    value,
    onChange,
}) {
    return (
        <Form.Row className="align-items-center">
            <Col lg='4' md='4' sm='4'>
                <Form.Label>Numero pezzi</Form.Label>
            </Col>
            <Col>
                <InputGroup>
                    <FormControl
                        type="number"
                        value={ value }
                        aria-describedby="basic-addon1"
                        name='numPezzi'
                        isInvalid={
                            value === '' ||
                            isNaN(value) ||
                            value < 0
                        }
                        onChange={onChange}
                        className='rounded-right' />
                    <Form.Control.Feedback type="invalid">
                        {'Valore non valido'}
                    </Form.Control.Feedback>
                </InputGroup>
            </Col>
        </Form.Row>
    )
}

NumPezzi.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
}

export default NumPezzi;