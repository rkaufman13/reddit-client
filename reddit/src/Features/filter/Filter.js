import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { setFilter, selectFilterTypes, selectFilter } from "./filterSlice";
import { Dropdown } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './filter.css'

export const Filter = () => {
  const activeType = useSelector(selectFilter);
  const dispatch = useDispatch();
  const types = useSelector(selectFilterTypes);

  const clickHandler = (e) => {
    const newFilter = e.target.value;
    dispatch(setFilter(newFilter));
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="filter-dropdown">
        Filter
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {types.map((type, i) => {
          return (
            <Dropdown.Item 
              as="button"
              onClick={clickHandler}
              key={i}
              value={type}
              active={activeType === type}
            >
              {type}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}



