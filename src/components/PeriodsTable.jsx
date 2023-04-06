import { closePeriod } from "../api/service"
import { formatDate } from '../utils/formatDate'

export function PeriodsTable({ periods, setPeriods, keyword }) {

    const handleClosePeriod = async (id) => {
        const data = await closePeriod(keyword, id)
        setPeriods([...periods.filter(p => p.id !== id), data])
    }

    return (
        <table className="table table-dark table-hover table-striped-columns text-center mt-3">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Movements</th>
                    <th>Balance</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {periods?.sort((a, b) => b.id - a.id).map(p => {
                    return (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>
                                {p.isActive ?
                                    <span className="text-success">
                                        Open
                                    </span> :
                                    <span className="text-danger">
                                        Closed
                                    </span>
                                }
                            </td>
                            <td>{formatDate(p.createdAt)}</td>
                            <td>{p.isActive ? '' : formatDate(p.updatedAt)}</td>
                            <td>
                                <table className="table table-warning table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Type</th>
                                            <th>Concept</th>
                                            <th>Amount</th>
                                            <th>Created</th>
                                            <th>Updated</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {p.movements?.map(mov => {
                                            return (
                                                <tr key={mov.id}>
                                                    <td>{mov.id}</td>
                                                    <td>{mov.type.name}</td>
                                                    <td>{mov.concept}</td>
                                                    <td>{mov.amount}</td>
                                                    <td>{formatDate(mov.createdAt)}</td>
                                                    <td>{formatDate(mov.updatedAt)}</td>
                                                    <td></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </td>
                            <td>{p.balance}</td>
                            <td>
                                {p.isActive &&
                                    <>
                                        <button onClick={() => handleClosePeriod(p.id)} className="btn btn-sm btn-danger">
                                            Close
                                        </button>
                                        <button onClick={() => { }} className="btn btn-sm btn-success ms-1">
                                            + Mov
                                        </button>
                                    </>
                                }
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}