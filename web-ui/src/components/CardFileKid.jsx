import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const CardFileKid = ({KidName, KidCi}) =>{
    return(
        <Card sx={{ maxWidth: 345 }}>
        <CardHeader
            avatar={
                <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZozF3uHVVazFQwVYSx7rEUqac99eyQJq_3w&usqp=CAU" />
            }
            action={
            <IconButton aria-label="settings">
                <MoreVertIcon />
            </IconButton>
            }
            title={KidName}
            subheader={KidCi}
        />
        </Card>
    )
}

export default CardFileKid;

 