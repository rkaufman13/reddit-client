import React from "react";
import { testData } from "../../services/data";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "./filterSlice";
import './filter.css'


function Filter(result) {
  const dispatch = useDispatch();
// if (result.error){
// //could return nothing here or could return a list of default tags to filter by
// }
// if (result.data){
//   const postData = result.data;
// }
//to use test data here comment the lines above and use const postData = testData
const postData = testData;

const handleClick = (e) => {
const newFilter = e.target.value;
dispatch(setFilter(newFilter))
}

//generate a list of most frequently used tags. first we get all the tags, then count their occurrences, then pick the top 10
const allTags = [];
for (const post of postData){
 for (let i = 0; i < post.tags?.length; i++){
   allTags.push(post.tags[i])
 }
}
let popularTags = {}
for (let i = 0; i < allTags.length; i++){
   if (!popularTags[allTags[i]]) {
     popularTags[allTags[i]] = 1;
   }
   else {
 popularTags[allTags[i]]++;
   }
}
const popularTagsArray = Object.keys(popularTags);

    return (
      <div>

      <p>{popularTagsArray.map(tag => {
      return (
      <button className="tag" onClick={handleClick} value={tag}>{tag}</button>
      )
      })
      }</p>
      </div>
    );
  }
  
  export default Filter;