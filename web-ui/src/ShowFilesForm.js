import InputWithLabel from './InputWithLabel';
import Button from './Button'; 
import CardFileKid from './components/CardFileKid';
import {useState, useEffect} from 'react';

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
            <div id="lista-nenes">Los nenes:
                {ListKids.map(ListKids => (
                    <div>
                    <CardFileKid KidName={ListKids.firstName} KidCi={ListKids.ci}></CardFileKid>
                    </div> 
                ))}
            </div>
        </div>
    </div>
  );
}
export default ShowFilesForm;
