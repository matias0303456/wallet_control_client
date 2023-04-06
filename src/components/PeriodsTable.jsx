import { useState } from "react"

import { closePeriod } from "../api/service"
import { formatDate } from '../utils/formatDate'
import { NewMovementModal } from "./NewMovementModal"

export function PeriodsTable({ periods, setPeriods, keyword, types }) {

    const [show, setShow] = useState(false)
    const [workOn, setWorkOn] = useState(null)

    const handleClosePeriod = async (id) => {
        const data = await closePeriod(keyword, id)
        setPeriods([data, ...periods.filter(p => p.id !== id)])
    }

    return (
        <div className="w-100 overflow-scroll periodsTable">
            <NewMovementModal
                show={show}
                setShow={setShow}
                types={types}
                periodId={workOn}
                periods={periods}
                setPeriods={setPeriods}
                keyword={keyword}
            />
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {p.movements?.sort((a, b) => b.id - a.id).map(mov => {
                                                return (
                                                    <tr key={mov.id}>
                                                        <td>{mov.id}</td>
                                                        <td>{mov.type.name}</td>
                                                        <td>{mov.concept}</td>
                                                        <td>{mov.amount}</td>
                                                        <td>{formatDate(mov.createdAt)}</td>
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
                                            <button
                                                onClick={() => {
                                                    setWorkOn(p.id)
                                                    setShow(true)
                                                }}
                                                className="btn btn-sm btn-success ms-1"
                                            >
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
        </div>
    )
}