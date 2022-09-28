/*START NEW SINGLE ITEM CARD HERE*/ 
import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'

const CardFileKid = ({ KidName, KidCi, KidId }) => {
    const renderFilterRequest = () => {
        console.log('Mostrando opciones...')
    }

    const renderFilterRequest2 = (neneId) => {
        console.log('dirigiendo al file den nene...')
        console.log(neneId)
    }

    return (
        <Card sx={{ maxWidth: 600 }}>
            <CardHeader
                avatar={
                    <Avatar
                        alt="Remy Sharp"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZozF3uHVVazFQwVYSx7rEUqac99eyQJq_3w&usqp=CAU"
                    />
                }
                action={
                    <IconButton
                        aria-label="settings"
                        onClick={renderFilterRequest()}
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
                title={KidName}
                subheader={KidCi}
            />
            <CardContent>
                <Button variant="text" onClick={renderFilterRequest2(KidId)}>
                    Ver File
                </Button>
            </CardContent>
        </Card>
    )
}

export default CardFileKid
