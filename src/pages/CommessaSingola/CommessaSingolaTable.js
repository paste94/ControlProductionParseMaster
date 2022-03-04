import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import DeleteButton from '../../components/DeleteButton';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Row, Col } from 'react-bootstrap';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import ModalCommessaSingola from '../../components/ModalCommessaSingola';
import PropTypes from 'prop-types'
import DettaglioRiga from './DettaglioRiga';
import ModalModificaCommessaSingola from '../../components/modal_articoli/ModalModificaCommessaSingola';

/** Definisce la tabella degli impiegati
 *
 * @param {Object}  props Definisce le propertyes della tabella
 *                  - id (string) id della commessa da mostrare
 *                  - handleConfirm (function) Gestisce la modifica dell'elemento
 * @return {Component} il component creato
 */
function CommessaSingolaTable({data, handleConfirm, handleDelete}) {
    /**
     * Definisce i bottoni da inserire nell'ultima colonna della tabella
     *
     * @param {object} cell la cella in cui sono definiti i bottoni
     * @param {object} row la riga in cui sono definiti i bottoni
     * @param {int} rowIndex l'indice di riga in cui sono definiti i bottoni
     * @param {object} formatExtraData dati extra (vedi documentazione)
     * @return {Component} i componenti creati
     */
    const defineButtons = (cell, row, rowIndex, formatExtraData) => (
        <Row>
            <Col lg='6' md='6' sm='6'>
                <ModalModificaCommessaSingola
                    commessaSingola={row}/>
            </Col>
            <Col lg='6' md='6' sm='6'>
                <DeleteButton
                    title='Elimina'
                    handleConfirm={ () => handleDelete(row.id) } >
                        <p>Eliminare definitivamente la commessa?</p>
                </DeleteButton>
            </Col>
        </Row>
    )

    // Definizione delle colonne
    const columns = [{
        dataField: 'numDisegno',
        text: 'Numero Disegno',
    }, {
        dataField: 'totOre',
        text: 'Tot Ore',
    }, {
        dataField: 'totPreventivo',
        text: 'Preventivo (€)',
    }, {
        dataField: 'numPezzi',
        text: 'Numero Pezzi',
    }, {
        dataField: 'azioni',
        text: 'Azioni',
        formatter: defineButtons,
    }];

    // Definisce cosa mostrare quando la riga nella tabella viene espansa
    const expandRow = {
        renderer: row => {
            console.log('ROW', row)
            let macchineValue = ''

            console.log(row['oreMacchina'])

            if (row.oreMacchina != undefined && row.oreMacchina) {
                Object.entries(row.oreMacchina.map(e => {
                    macchineValue = macchineValue + e.nome + ': ' + e.ore + 'h\n'
                }))
            } else {
                macchineValue = 'Non ci sono tempi macchina impostati per questo articolo'
            }

            return (
                <div>
                    <DettaglioRiga
                        k='Costo Materiale: '
                        v={'€ ' + row['costMat']}
                    />
                    <DettaglioRiga
                        k='Costo Orario: '
                        v={'€ ' + row['costoOrario']}
                    />
                    <DettaglioRiga
                        k='Macchine: '
                        v={macchineValue}
                    />
                </div>
            )
        },
        showExpandColumn: true,
        expandByColumnOnly: true,
        expandHeaderColumnRenderer: ({ isAnyExpands }) => {
            if (isAnyExpands) return <FaCaretDown/>;
            else return <FaCaretRight/>;
          },
          expandColumnRenderer: ({ expanded }) => {
            if (expanded) return <FaCaretDown color='grey'/>;
            else return <FaCaretRight color='grey'/>;
          },
    };

    return (
        <div>
            <BootstrapTable
                keyField='id'
                data={ data }
                columns={ columns }
                pagination={ paginationFactory() }
                noDataIndication="Tabella vuota"
                expandRow={ expandRow }
                />
        </div>
    )
}

CommessaSingolaTable.propTypes = {
    data: PropTypes.array.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export default CommessaSingolaTable
