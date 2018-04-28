<template>
<div>
  <header class="intro-header" style="background-image: url('/images/bg1920x872.jpg')">
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
        <div class="site-heading">
          <h1>{{ name }}</h1>
          <hr class="small">
          <span class="subheading"></span>
        </div>
      </div>
    </div>
  </div>
</header>

<!-- Main Content -->
<div class="container">
  <div class="row">
    <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
      <div class="post-preview" v-for="post in posts" :key="post.title">
           <nuxt-link :to="post.permalink">
            <h2 class="post-title">
            {{ post.title }}
            </h2>
           </nuxt-link>
        <!-- <p class="post-meta">
          <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More</a>
        </p> -->
      </div>
      <hr>   

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
export default {
  async asyncData ({ app }) {
    return {
      posts: await app.$content('/').getAll(),
      name: 'Thomas Blog'
    }
  },
  layout: 'default'
}
</script>


<style>

</style>
