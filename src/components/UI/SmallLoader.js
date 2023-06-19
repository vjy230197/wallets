import React from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";

function SmallLoader(props) {
    return (
        <ScaleLoader color="#0d6efd" height={25}
            margin={2}
            radius={6}
            width={2.5} />
    )
}

export default SmallLoader