import React, { useState } from 'react'
import { useSearchParams, BrowserRouter, Link } from 'react-router-dom'

function ViewListKids() {
    const [data, setData] = useState({
        id: '1245'
    })

    return (
        <div>
            <Link to="/kidHealth" state={{ data }}>
                Niño carlos
            </Link>
        </div>
    )
}

export default ViewListKids
