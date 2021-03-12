import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import PropTypes from 'prop-types'

/**
 * Crea tabella dei lavori
 * @param {Object} props Properties
 * @return {COmponent} il component
 */
function LavoriTable({data}) {
    const columns = [{
        dataField: 'id',
        text: 'ID',
        hidden: true,
    }, {
        dataField: 'commessaNome',
        text: 'Numero commessa',
    }, {
        dataField: 'preventivoNome',
        text: 'Numero Disegno',
    }, {
        dataField: 'macchina',
        text: 'Macchina',
    }, {
        dataField: 'inizio',
        text: 'Data inizio',
        formatter: (cell) => {
            if (cell === undefined) return '-'
            const dd = cell.getDate() < 10 ?
                '0'+cell.getDate() : cell.getDate()
            const mm = cell.getMonth()+1 < 10 ?
                '0'+(cell.getMonth()+1) : cell.getMonth()+1
            const yy = cell.getFullYear()
            const hh = cell.getHours() < 10 ?
                '0'+cell.getHours() : cell.getHours()
            const min = cell.getMinutes() < 10 ?
                '0'+cell.getMinutes() : cell.getMinutes()
            return dd + '/' + mm + '/' + yy + ' ' + hh + ':' + min
        },
    }, {
        dataField: 'fine',
        text: 'Data fine',
        formatter: (cell) => {
            if (cell === undefined) return '-'
            const dd = cell.getDate() < 10 ?
                '0'+cell.getDate() : cell.getDate()
            const mm = cell.getMonth()+1 < 10 ?
                '0'+(cell.getMonth()+1) : cell.getMonth()+1
            const yy = cell.getFullYear()
            const hh = cell.getHours() < 10 ?
                '0'+cell.getHours() : cell.getHours()
            const min = cell.getMinutes() < 10 ?
                '0'+cell.getMinutes() : cell.getMinutes()
            return dd + '/' + mm + '/' + yy + ' ' + hh + ':' + min
        },
    }, {
        dataField: 'tempo',
        text: 'Tempo(ore)',
    }]

    
    return (
        <div>
            <BootstrapTable
                keyField='id'
                data={data}
                columns={ columns }
                pagination={ paginationFactory() }
                noDataIndication="Tabella vuota" />
        </div>
    )
}

LavoriTable.propTypes = {
    data: PropTypes.array.isRequired,
}

export default LavoriTable
