import { useState } from "react"
import { LoginForm } from "./LoginForm"

export function Home() {

    const [keyword, setKeyword] = useState(null)

    if (!keyword) return <LoginForm setKeyword={setKeyword} />

    return (
        <>
            <h2 className="text-center">Periods</h2>
        </>
    )
}