import React from "react";
import { testData } from "../../services/data";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "./filterSlice";
import "./filter.css";
import {
  selectSkipMain,
  selectSearchTerm,
} from "../searchBar/searchBarSlice.js";
import {
  useGetPopularQuery,
  useGetSearchTermQuery,
} from "../../services/reddit.js";

function Filter() {
  const skipMain = useSelector(selectSkipMain);
  const skipSearch = !skipMain;
  const searchTerm = useSelector(selectSearchTerm);
  const popularResult = useGetPopularQuery("", { skipMain });
  const searchResult = useGetSearchTermQuery(searchTerm, { skipSearch });

  // We can also determine the response based on the value of skipMain. This allows using the same conditional rendering below.
  const result = skipMain ? searchResult : popularResult;
  console.log(result);
  // let result = null;

  const handleClick = (e) => {
    const newFilter = e.target.value;
    dispatch(setFilter(newFilter));
  };

  const dispatch = useDispatch();
  let postData;
  if (result.error) {
    return null;
    //not sure what to do here, we could return nothing here or could return a list of default tags to filter by
  }

  if (result.isLoading || result.isFetching) {
    return null;
  }
  if (result.data) {
    postData = result.data;
    console.log(postData);
    //to use test data here comment the lines above and use const postData = testData
    // const postData = testData;
    //generate a list of most frequently posted to subreddits. first we get all the subs, then count their occurrences, then pick the top 10
    const allTags = [];
    for (const post of postData) {
      if (post.subreddit) {
        allTags.push(post.subreddit);
      }
    }
    let popularTags = {};
    for (let i = 0; i < allTags.length; i++) {
      if (!popularTags[allTags[i]]) {
        popularTags[allTags[i]] = 1;
      } else {
        popularTags[allTags[i]]++;
      }
    }
    const popularTagsArrayAll = Object.keys(popularTags);
const popularTagsArray = popularTagsArrayAll.slice(0,10);
    return (
      <div>
        <p>
          {popularTagsArray &&
            popularTagsArray.map((tag) => {
              return (
                <button className="tag" onClick={handleClick} value={tag}>
                  {tag}
                </button>
              );
            })}
        </p>
      </div>
    );
  }
}
export default Filter;
