import React, { PropsWithChildren, ReactElement } from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types'

type Props = {
    k:string, 
    v: string,
}

/**
 * @param {Object}  props Definisce le propertyes della tabella
 *                  - k il nome del campo da visualizzare nella tabella
 *                  - v valore del campo
 * @return {Component} Il component
 */
function DettaglioRiga({k, v}: PropsWithChildren<Props>): ReactElement {
    return (
        <Row >
            <Col
                style={{
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    flex: '0 0 230px',
                }}>
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
