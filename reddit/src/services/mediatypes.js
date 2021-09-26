const types = {
 video: {
    type: "reddit_video",
    displayName: "Videos",
  },
  image: { type: "reddit_image", displayName: "Images", },
  gif: {type:'reddit_gif', displayName: 'Gifs'},
  comments: {type: 'reddit_comments', displayName: "Discussions"},
  gallery: {type:'reddit_gallery', displayName: "Galleries"},
  oembed: {type: 'oembed', displayName: "Social posts"},
  other: {type: 'other', displayName:"Other"},
};
export { types };
