import CardFileKid from '../../Components/CardFileKid'
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'

function ShowFilesForm() {
    const [ListKids, setListKids] = useState([]) 
    const urlKids = 'https://ncv-api.herokuapp.com/api/kids'

    useEffect(() => {
        fetch(urlKids)
            .then((res) => res.json())
            .then((result) => {
                setListKids(result)
            })
    }, [])

    function VerFile(neneId) {
        const idnene = neneId
        const url = '/kidHealth/'+ idnene
        window.location.href = url
    }

    function AddReport(neneId) {
        const idnene = neneId
        const url = '/add-reporte-nene/' + idnene
        window.location.href = url
    }

    return (
        <div className="SumadorForm">
            <h3>FILES DE LOS NENES</h3>
            <div>
                <div id="lista-nenes">
                    Los nenes:
                    {ListKids.map((ListKids) => (
                        <div key={ListKids.id}>
                            <CardFileKid
                                KidName={ListKids.firstName}
                                KidCi={ListKids.ci}
                                KidId={ListKids.id}
                            ></CardFileKid>
                            <Button
                                variant="text"
                                onClick={(e) => VerFile(ListKids.id)}
                            >
                                Ver File
                            </Button>
                            <Button
                                variant="text"
                                onClick={(e) => AddReport(ListKids.id)}
                            >
                                Aumentar Reporte de Salud
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ShowFilesForm
