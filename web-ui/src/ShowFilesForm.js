import InputWithLabel from './InputWithLabel';
import Button from './Button'; 
import {useState, useEffect} from 'react';
import {getKid, getListKids} from './ShowFiles.js';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function ShowFilesForm() {

  const [resultado, setResultado] = useState([]);
  const [ListKids, setListKids] = useState([]);
  var [nameKid, setNameKid] = useState('');
  var [CiKid, setCiKid] = useState('');

  var urlKids = "https://ncv-api.herokuapp.com/api/kids";

  useEffect(() => {
    fetch(urlKids)
      .then(res => res.json())
      .then(
        (result) => {
            setListKids(result);
        }
      )
  }, [])

  function handleFormSubmit(event) {
    event.preventDefault();
    var nene = getKid("Juanito", "12345678");
    const result = nene[0] + " , " + nene[1];
    setResultado(result);
    setNameKid(nene[0]);
    setCiKid(nene[1]);
  }

  return (
    <div className="SumadorForm">
      <h3>FILES DE LOS NENES</h3>

      <div>
        <form onSubmit={handleFormSubmit}>

          <Button id="sumar-btn">Cargar Datos</Button>
        </form>
        <div id="mensaje-suma">El nene es:{resultado}</div>
        <div id="mensaje-suma">Los nenes:
            <ul>
            {ListKids.map(ListKids => (
                <li key={ListKids.id}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            N1
                        </Avatar>
                        }
                        action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                        }
                        title={ListKids.firstName}
                        subheader={ListKids.ci}
                    />
                </Card>
                </li>
            ))}
            </ul>
        </div>

        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                N1
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={nameKid}
            subheader={CiKid}
          />
        </Card>
        
      </div>
      
      <div className='chartFiles'>
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
            title="Este es el nene 1"
            subheader="00000001"
          />
        </Card>
      </div>

    
    </div>
  );
}
export default ShowFilesForm;
