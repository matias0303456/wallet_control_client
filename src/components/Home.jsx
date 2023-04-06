import { useRef, useState } from "react"

import { LoginForm } from "./LoginForm"
import { getPeriods, openPeriod, getTypes } from "../api/service"
import { PeriodsTable } from "./PeriodsTable"

export function Home() {

    const [keyword, setKeyword] = useState(null)
    const [periods, setPeriods] = useState([])
    const [types, setTypes] = useState([])
    const hasRun = useRef(false)

    if (!keyword) {
        return <LoginForm setKeyword={setKeyword} />
    } else {
        if (!hasRun.current) {
            getPeriods(keyword)
                .then(data => {
                    setPeriods(data)
                })
            getTypes(keyword)
                .then(data => {
                    setTypes(data)
                })
            hasRun.current = true
        }
    }

    const handleReset = () => {
        hasRun.current = false
        setKeyword(null)
    }

    const handleOpenPeriod = async () => {
        const data = await openPeriod(keyword)
        if (data) setPeriods([...periods, data])
    }

    return (
        <>
            <h2 className="text-center">Periods</h2>
            <button onClick={handleReset} className="btn btn-success btn-small">
                Reset keyword
            </button>
            {periods?.every(p => !p.isActive) &&
                <button onClick={handleOpenPeriod} className="btn btn-success btn-small ms-2">
                    Open period
                </button>
            }
            <PeriodsTable
                periods={periods}
                setPeriods={setPeriods}
                keyword={keyword}
                types={types}
            />
        </>
    )
}