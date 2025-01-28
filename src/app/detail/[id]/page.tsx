'use client'

import { useParams } from "next/navigation";

const Category = () => {
    const params = useParams<{ id: string }>()
    console.log(params)

    return (
        <div>
            Detail page
        </div>
    )
}

export default Category