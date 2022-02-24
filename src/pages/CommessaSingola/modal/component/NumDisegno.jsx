import React from 'react';
import { InputGroup, FormControl, DropdownButton, Form, Col } from 'react-bootstrap';
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
function NumDisegno({
    value,
    onChange,
    disabled,
    articoliRender,
}) {
    return (
        <Form.Row className="align-items-center">
            <Col lg='4' md='4' sm='4'>
                <Form.Label>Numero disegno</Form.Label>
            </Col>
            <Col>
                <InputGroup>
                <FormControl
                    required
                    value={ value }
                    aria-describedby="basic-addon1"
                    name='numDisegno'
                    placeholder='Numero Disegno'
                    onChange={onChange} />
                        <DropdownButton
                            as={ InputGroup.Append }
                            title='Scegli'
                            variant='secondary'
                            disabled={ disabled }
                            >
                                {articoliRender}
                        </DropdownButton>
                </InputGroup>
            </Col>
        </Form.Row>
    )
}

NumDisegno.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    articoliRender: PropTypes.array,
}

export default NumDisegno;