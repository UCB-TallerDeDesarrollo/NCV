import React from 'react';
import { useLocation } from "react-router-dom";

function DataHealth(idKid){
    const location = useLocation();
    console.log( " parameter inside dataHealth: " , idKid  )
    console.log("LOCATion: ", location )
    const data = location.state?.data;
    return(
        <div>
            <h1> Welcome in data health</h1>
            <h2> id is {data ? data.id: "que?"  } </h2>
        </div>
    )
}

export default DataHealth;