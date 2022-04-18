<template>
  <div class="min-h-screen bg-yellow-400 flex justify-center items-center py-20">
    <div class="container mx-auto p-12 bg-gray-100 rounded-xl">
      <router-link :to="{name:'favorite'}" class="bg-red-400 p-4 rounded-2xl">Xem yêu thích</router-link>
      <form action="" @submit.prevent="searchArticles()" class="mt-6">
        <div class="w-full">
          <input type="text" placeholder="Tìm kiếm" class="w-2/3 h-10 text-center mb-6" v-model="keyword">
        </div>
        <h1 class="text-4xl uppercase font-bold from-current mb-8">Trang tin tức</h1>
        <!-- Box-1 -->
        <div v-if="listArticle.length>0">
          <div class="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
            <div v-for="( articleItem,articleIndex ) in listArticle" :key="articleIndex" class="bg-white">
              <div>
                <div class="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                  <div>
                    <img class="w-full" :src="articleItem.urlToImage"/>
                    <div class="px-4 py-2">
                      <h1 class="text-xl font-gray-700 font-bold">{{ articleItem.author }}</h1>
                      <div class="flex space-x-2 mt-2 w-full">
                        <a :href="articleItem.url" class="text-lg text-blue-600 font-semibold mb-2 w-full text-center">{{ articleItem.title }}</a>
                      </div>
                      <p class="text-sm tracking-normal ">{{ articleItem.content }}</p>
                      <p class="text-sm tracking-normal text-gray-500">{{ articleItem.description }}</p>
                      <a :href="articleItem.url" class="mt-12 w-full text-center bg-yellow-400 py-2 rounded-lg mr-6">
                        Đọc tin tức</a>
                      <button @click="favoriteArticle(articleItem)" class="bg-blue-50">
                        <span class="text-red-400 text-2xl">♥</span>
                        <span>yêu thích</span>
                      </button>
                      <div class="space-x-6">
                        <a :href="'https://www.facebook.com/sharer/sharer.php?u='+ articleItem.url">Share Facebook</a>
                        <a :href="'http://twitter.com/share?text=text&url=http://'+ articleItem.url+'&hashtags=hashtag1,hashtag2,hashtag3'">Share
                          Twitter </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      keyword: '',
      listArticle: [],
      page: 1
    }
  },
  methods: {
    async searchArticles() {
      try {
        const resp = await this.$repositories.home.getArticles(this.keyword, this.page);
        console.log(resp);
        this.listArticle = resp.data.articles;
      } catch (e) {
        console.log(e);
      }
    },
    favoriteArticle(article) {
      let favorite = localStorage.getItem('favorite');
      if (!favorite) {
        let favorite = [];
        favorite.push(article);
        alert("Thêm bài viết thành công");
        localStorage.setItem('favorite', JSON.stringify(favorite));
        return
      } else {
        favorite = JSON.parse(favorite);
        let check = favorite.findIndex(item => item.url == article.url);
        if (check > -1) {
          alert("Đã yêu thích");
          return;
        } else {
          favorite.push(article);
          alert("Thêm bài viết yêu thích thành công");
          localStorage.setItem('favorite', JSON.stringify(favorite));
          return;
        }
      }
    },
  },
}
</script>
