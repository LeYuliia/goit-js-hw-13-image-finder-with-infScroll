const infScroll = new InfiniteScroll('.container', {
  path: '.pagination__next',
  append: false,
  scrollThreshold: 100,
  checkLastPage: true,
  prefill: false,
  history: false,
  responseType: 'document',
});

export default infScroll;
