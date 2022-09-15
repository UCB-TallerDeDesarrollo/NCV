import React , {useState} from 'react';
import { useSearchParams } from "react-router-dom";
import {
    BrowserRouter,
    Link
  } from "react-router-dom";

function ViewListKids(){
    const [data , setData] = useState({
        id: "1245"
    } )

    return(
        <div>
            <Link to= "/kidHealth" state={{data: data}} >
                Niño carlos
            </Link>
        </div>
    )
}

export default ViewListKids;