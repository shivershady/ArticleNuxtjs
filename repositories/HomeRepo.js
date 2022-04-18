export default ($axios) => ({
  getArticles(keyword,page) {
    return $axios.get(`everything?q=${keyword}&pageSize=10&page=${page}&apiKey=9f395695403c4ad08ded1cfaeec0aaab`)
  },
})
