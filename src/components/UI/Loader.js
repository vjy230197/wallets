import React from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";

function Loader(props) {
    return (
        <ScaleLoader color="#0d6efd" height={50}
            margin={10}
            radius={12}
            width={5} />
    )
}

export default Loader