<template>
  <div>

    <!-- Page Header -->
    <post-header :title="post.title" :postDate="post.date"></post-header>

    <article>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <nuxtent-body :body="post.body" />
          </div>
        </div>

        <hr>
        <div class="row">
          <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <!--comment-->
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import PostHeader from '../components/PostHeader'
export default {
  async asyncData ({ app, route, payload }) {
    return {
      post: await app.$content('/').get(route.path)
    }
  },
  components: {
    PostHeader
  }
}
</script>

<style>

</style>
