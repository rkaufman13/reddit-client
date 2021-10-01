import { useSelector, useDispatch } from "react-redux";
import {
  selectSkipMain,
  selectSearchTerm,
} from "../searchBar/searchBarSlice.js";
import {
  useGetPopularQuery,
  useGetSearchTermQuery,
} from "../../services/reddit.js";
import {
  RedditImage,
  RedditVideo,
  RedditComments,
  RedditGallery,
  Oembed,
  Other,
  LoadingPost,
} from "./post/Post";
import "./content.css";
import { selectFilter, setFilterTypes } from "../filter/filterSlice.js";
import { selectSort } from "../sort/sortSlice.js";

const filterAndSort = (data, filterTerm, sortTerm) => {
  if (filterTerm && sortTerm) {
    return data
      ?.filter((x) => x.media.type === filterTerm)
      .sort((a, b) => a.info[sortTerm] - b.info[sortTerm]);
  }

  if (filterTerm) {
    return data?.filter((x) => x.media.type === filterTerm);
  }

  if (sortTerm) {
    return data.slice().sort((a, b) => b.info[sortTerm] - a.info[sortTerm]);
  }

  return data;
};

export const Content = () => {
  const dispatch = useDispatch();
  const skipMain = useSelector(selectSkipMain);
  const skipSearch = !skipMain;
  const searchTerm = useSelector(selectSearchTerm);
  const filterTerm = useSelector(selectFilter);
  const sortTerm = useSelector(selectSort);

  const popularResult = useGetPopularQuery("", { skip: skipMain });
  
  const searchResult = useGetSearchTermQuery(searchTerm, { skip: skipSearch });
  
  const determineResult = useGetPopularQuery("", {
    skip: skipMain,
    selectFromResult: ({ data }) => ({
      data: filterAndSort(data, filterTerm, sortTerm),
    }),
  });
  
  const determineSearchResult = useGetSearchTermQuery(searchTerm, {
    skip: skipSearch,
    selectFromResult: ({ data }) => ({
      data: filterAndSort(data, filterTerm, sortTerm),
    }),
  });

  dispatch(
    setFilterTypes([...new Set(popularResult.data?.map((x) => x.media.type))])
  );

  const result =
    !skipMain && !filterTerm
      ? determineResult
      : !skipMain && filterTerm
      ? determineResult
      : skipMain && !filterTerm
      ? determineSearchResult
      : skipMain && filterTerm
      ? determineSearchResult
      : determineResult;


  if (result.isError || result.rejected)
    return <div>An error has occured!</div>;

  if (result.isLoading || result.isFetching)
    return (
      <div id="loading-content">
        {[...Array(25).keys()].map((x) => {
          return <LoadingPost key={x} />;
        })}
      </div>
    );

  const postData = result.data;

  return (
    <div id="content">
      {postData.map((post, i) => {
        if (["Image", "Gif"].includes(post.media.type)) {
          return (
            <RedditImage
              key={i}
              info={post.info}
              media_url={post.media.url ? post.media.url : null}
            />
          );
        }

        if (post.media.type === "Video") {
          return (
            <RedditVideo
              key={i}
              info={post.info}
              media_url={post.media.url ? post.media.url : null}
            />
          );
        }

        if (post.media.type === "Discussion") {
          return <RedditComments key={i} info={post.info} />;
        }

        if (post.media.type === "Gallery") {
          return (
            <RedditGallery
              key={i}
              info={post.info}
              image_urls={post.media.image_urls}
            />
          );
        }

        if (post.media.type === "Social") {
          return <Oembed key={i} info={post.info} html={post.media.html} />;
        }

        if (post.media.type === "Other") {
          return (
            <Other
              key={i}
              info={post.info}
              media_url={post.media.url ? post.media.url : null}
            />
          );
        }
        return null;
      })}
    </div>
  );
};
