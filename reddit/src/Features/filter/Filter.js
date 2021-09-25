import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { setFilter, selectFilterTypes } from "./filterSlice";
import {Dropdown} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './filter.css'

export const Filter = () => {
  const [activeType, setActiveType] = useState(null)
  const dispatch = useDispatch();
  const types = useSelector(selectFilterTypes)

  const clickHandler = (e) => {
    const newFilter = e.target.value;
    dispatch(setFilter(newFilter));
    setActiveType(newFilter);
  };

  const getDisplayName = types => {
    switch(types) {
      case 'reddit_video':
        return "Videos";
      case 'reddit_image':
        return "Images";
      case 'reddit_gif':
        return "Gifs";
      case 'reddit_comments':
        return "Discussions";
      case 'reddit_gallery':
        return "Galleries";
      case 'oembed':
        return 'Social posts';
      case 'other':
        return 'Other';
      default: 
        return 'wtf';
    }
  }

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
              {getDisplayName(type)}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}



