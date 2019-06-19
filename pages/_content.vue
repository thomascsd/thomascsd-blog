<template>
  <div>

    <!-- Page Header -->
    <post-header :title="post.title" :postDate="post.date" :bgImageUrl="post.bgImageUrl"></post-header>

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
              <div class="utterances"></div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import PostHeader from '../components/PostHeader'

export default {
  head () {
    return {
      title: this.post.title,
      script: [{ src: 'https://utteranc.es/client.js', async: true, repo: 'thomascsd/thomascsd.github.io', 'issue-term': 'pathname', theme: 'github-light', crossorigin: 'anonymous', body: true }]
    }
  },
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

