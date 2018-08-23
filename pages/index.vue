<template>
  <div>
    <!-- Page Header -->
    <blog-header></blog-header>

    <!-- Main Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
          <div v-for="post in posts" :key="post.title">
            <div class="post-preview" >
              <nuxt-link :to="post.permalink">
                <h2 class="post-title">
                  {{ post.title }}
                </h2>
              </nuxt-link>
              <p class="post-meta">on {{post.date}}</p>
            </div>
            <hr>
          </div>

          <!-- Pager 
      <ul class="pager">
        <li class="next">
          <a href="#">Older Posts &rarr;</a>
        </li>
      </ul>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogHeader from '../components/BlogHeader'
export default {
  async asyncData ({ app }) {
    return {
      posts: await app.$content('/').getAll(),
      name: 'Thomas Blog'
    }
  },
  components: {
    BlogHeader
  }
}
</script>
