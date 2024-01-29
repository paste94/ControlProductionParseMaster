import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import PropTypes from 'prop-types'
import filterFactory, { multiSelectFilter, dateFilter, selectFilter } from 'react-bootstrap-table2-filter';


/**
 * Crea tabella dei lavori
 * @param {Object} props Properties
 * @return {COmponent} il component
 */
function LavoriTable({data, setMinutes}) {
    const [selectMacchine, setSelectMacchine] = useState({})
    const [selectNumCommessa, setSelectNumCommessa] = useState({})
    const [selectNumDisegno, setSelectNumDisegno] = useState({})
    const [selectImpiegatoNome, setSelectImpiegatoNome] = useState({})

    const createFilter = (arr, field) => {
        const unique = [...new Set(arr.map(elem => elem[field]))].sort()
        const obj = {}
        unique.forEach(m => obj[m] = m)
        return obj
    }

    const afterFilter = (newResult, newFilters) => {
        let tot = 0
        newResult.forEach(elem => {
            tot += elem.diffInMinutes != undefined ? elem.diffInMinutes : 0
        })
        setMinutes(tot)
    }

    useEffect(async () => {
        await setSelectMacchine(createFilter(data, 'macchina'))
        await setSelectNumCommessa(createFilter(data, 'commessaNome'))
        await setSelectNumDisegno(createFilter(data, 'preventivoNome'))
        await setSelectImpiegatoNome(createFilter(data, 'impiegatoNome'))
    }, [data])

    const columns = [{
        dataField: 'id',
        text: 'ID',
        hidden: true,
    }, {
        dataField: 'commessaNome',
        text: 'Numero commessa',
        filter: selectFilter({
            placeholder: 'Tutte',
            options: selectNumCommessa,
        }),
    }, {
        dataField: 'preventivoNome',
        text: 'Numero Disegno',
        filter: selectFilter({
            placeholder: 'Tutti',
            options: selectNumDisegno,
        }),
    }, {
        dataField: 'macchina',
        text: 'Macchina',
        filter: selectFilter({
            placeholder: 'Tutte',
            options: selectMacchine,
        }),
    }, {
        dataField: 'impiegatoNome',
        text: 'Impiegato',
        filter: selectFilter({
            placeholder: 'Tutti',
            options: selectImpiegatoNome,
        }),
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
        filter: dateFilter(),
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
        filter: dateFilter(),
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
                filter={ filterFactory(({afterFilter})) }
                noDataIndication="Tabella vuota" />
        </div>
    )
}

LavoriTable.propTypes = {
    data: PropTypes.array.isRequired,
    setMinutes: PropTypes.func,
}

export default LavoriTable
