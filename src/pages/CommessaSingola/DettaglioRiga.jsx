import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types'

/**
 * @param {Object}  props Definisce le propertyes della tabella
 *                  - k il nome del campo da visualizzare nella tabella
 *                  - v valore del campo
 * @return {Component} Il component
 */
function DettaglioRiga({k, v}) {
    return (
        <Row >
            <Col
                style={{
                    paddingTop: '5px',
                    paddingBottom: '5px',
                }}
                md='4' >
                    {k}
            </Col>
            <Col
                style={{
                    paddingTop: '5px',
                    paddingBottom: '5px',
                }}>
                    <div style={{whiteSpace: 'pre'}}>
                        {v}
                </div>
            </Col>
            <hr style={
                {
                    background: '#cfd8dc',
                    width: '97%',
                    marginTop: '0px',
                    marginBottom: '0px',
                }
            }/>
        </Row>
    )
}

DettaglioRiga.propTypes = {
    k: PropTypes.string,
    v: PropTypes.string,
}

export default DettaglioRiga;
