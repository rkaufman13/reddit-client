import {setToggle,selectCalmToggle} from './calmToggleSlice';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './calmToggle.css';

export const CalmToggle = () => {
  const on = useSelector(selectCalmToggle);
  const dispatch = useDispatch()
  
  
  return (
    <div id="calm-toggle" className="align-middle">
      <Form.Label
      sm="2"
      
      style={{marginRight:"1em","marginBottom":0, display:!on?"inline":"none"}}
      >Calm</Form.Label>
        <Form.Label
      sm="2"
      
      style={{"marginBottom":0, display:on?"inline":"none"}}
      >Calmer</Form.Label>
      <Form.Check 
        id="switchEnabled"
        type="switch"
        checked={on}
        onChange={() => dispatch(setToggle(!on)) }
      />
    </div>
  )
}