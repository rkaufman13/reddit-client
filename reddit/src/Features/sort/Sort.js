import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSort, setSort } from "./sortSlice";
import { Dropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './sort.css'

export const Sort = () => {
  const activeType = useSelector(selectSort);
  const dispatch = useDispatch();

  const clickHandler = (e) => {
    const sortTerm = e.target.value;
    dispatch(setSort(sortTerm));
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="sort-dropdown">
        Sort
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {['date', 'upvotes', 'comments'].map((type, i) => {
          return (
            <Dropdown.Item 
              as="button"
              onClick={clickHandler}
              key={i}
              value={type}
              active={activeType === type}
            >
              {`${type[0].toUpperCase()}${type.slice(1)}`}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}