import React from 'react';
import {Alert} from 'react-bootstrap';

/**
 * Crea un alert mostrato nella pagina
 * @param {object}  props property del component
 *                  - show (boolean) Indica se l'alert deve essere mostrato o no
 *                  - message (string) Il messaggio dell'alert
 *                  - handleClose (function) Indica quando l'alert deve essere chiuso
 * @return {Component} il componente alert creato
 *
function MyAlert(props) {
    return (
        <Alert show={props.show} variant="danger" onClose={() => props.handleClose} dismissible>
          <Alert.Heading>Errore!</Alert.Heading>
            <p>
                {props.message}
            </p>
        </Alert>
    );
}
  
export default MyAlert;
*/