import React, {useState} from 'react';
import { InputGroup, FormControl, DropdownButton, Form, Col, Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types'

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({ children, style, className, labeledBy }, ref) => {
      const [value, setValue] = useState('');

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <FormControl
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Cerca..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );

CustomMenu.propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    style: PropTypes.object,
    className: PropTypes.string,
    labeledBy: PropTypes.string,
}

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
                    disabled={disabled}
                    onChange={onChange} />
                        {!disabled &&
                            <Dropdown as={ButtonGroup}>
                              <Dropdown.Toggle variant="success" id="dropdown-basic" style={{borderRadius:'0px 4px 4px 0px'}}>
                                Scegli
                              </Dropdown.Toggle>
                              <Dropdown.Menu as={CustomMenu}>
                                {articoliRender}
                              </Dropdown.Menu>
                            </Dropdown>
                        }
                </InputGroup>
            </Col>
        </Form.Row>
    )
}

/**
 * <DropdownButton
                              as={ InputGroup.Append }
                              title='Scegli'
                              variant='secondary'
                              disabled={ disabled }
                              >
                                  <Dropdown.Menu as={CustomMenu}>
                                      {articoliRender}
                                  </Dropdown.Menu>
                          </DropdownButton>
 */

NumDisegno.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    articoliRender: PropTypes.array,
}

export default NumDisegno;