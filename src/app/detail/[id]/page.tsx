'use client'

import { useParams } from "next/navigation";

const Detailed = () => {
    const params = useParams<{ id: string }>()
    console.log(params)

    return (
        <div>
            Detail page
        </div>
    )
}

export default Detailed