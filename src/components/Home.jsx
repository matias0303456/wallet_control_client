import { useEffect, useRef, useState } from "react"

import { LoginForm } from "./LoginForm"
import { getPeriods } from "../api/service"

export function Home() {

    const [keyword, setKeyword] = useState(null)
    const [periods, setPeriods] = useState([])
    const hasRun = useRef(false)

    if (!keyword) {
        return <LoginForm setKeyword={setKeyword} />
    } else {
        if (!hasRun.current) {
            getPeriods(keyword)
                .then(data => {
                    setPeriods(data)
                })
            hasRun.current = true
        }
    }

    const handleReset = () => {
        hasRun.current = false
        setKeyword(null)
    }

    const formatDate = date => date.split('T')[0]

    return (
        <>
            <h2 className="text-center">Periods</h2>
            <button onClick={handleReset} className="btn btn-success btn-small">
                Reset keyword
            </button>
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
                                            {p.movements.map(mov => {
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
                                <td></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}