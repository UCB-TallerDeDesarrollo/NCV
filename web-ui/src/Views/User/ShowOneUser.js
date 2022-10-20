import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../Components/NavBar'
import SingleItemCard from '../../Components/SingleItemCard'

function ShowOneUserFile() {
    const { userId } = useParams()
    const [user, setUser] = useState([])
    const urlUser = 'https://ncv-api.herokuapp.com/api/users/' + userId

    let imageUrl =
        'https://st.depositphotos.com/2218212/2938/i/450/depositphotos_29387653-stock-photo-facebook-profile.jpg'

    const UserDetails = {
        Nombre: 'Omar',
        Apellido: 'Gutierrez',
        Celular: '67890567',
        Rol: 'Admin',
        Correo: 'omar@gmail.com'
    }

    return (
        <>
            <Navbar />
            <div
                style={{
                    marginTop: '11vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <SingleItemCard
                    key={0}
                    element={UserDetails}
                    imageUrl={imageUrl}
                    title={'Omar' + ' ' + 'Gutierrez'}
                />
            </div>
        </>
    )
}
export default ShowOneUserFile
