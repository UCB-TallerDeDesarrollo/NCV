import InputWithLabel from './InputWithLabel';
import Button from './Button'; 
import Card1 from './components/Card';
import {useState, useEffect} from 'react';
import {getKid, getListKids} from './ShowFiles.js';

function ShowFilesForm() {

  const [ListKids, setListKids] = useState([]);
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

  return (
    <div className="SumadorForm">
      <h3>FILES DE LOS NENES</h3>

      <div>
            <div id="mensaje-suma">Los nenes:
                <ul>
                {ListKids.map(ListKids => (
                    <li key={ListKids.id}>
                    <Card1 KidName={ListKids.firstName} KidCi={ListKids.ci}></Card1>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    </div>
  );
}
export default ShowFilesForm;
