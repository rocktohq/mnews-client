const articleSlicer = (article) => {
  if (article?.length >= 100) {
    return article?.slice(0, 97) + "...";
  }
  return article;
};

export { articleSlicer };
