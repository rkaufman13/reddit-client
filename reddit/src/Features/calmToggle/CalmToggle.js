import {setToggle} from './calmToggleSlice';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './calmToggle.css';

export const CalmToggle = () => {
  const [on, setOn] = useState(true)
  const dispatch = useDispatch()
  setTimeout(() => dispatch(setToggle(on)), 0);
  
  return (
    <div id="calm-toggle">
      Calm
      <Form.Check 
        id="switchEnabled"
        type="switch"
        checked={on}
        onChange={() => setOn(!on) }
      />
    </div>
  )
}