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
            <div id="comments"></div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import PostHeader from '../components/PostHeader'
import Gitment from 'gitment'

export default {
  head () {
    return {
      title: this.post.title
    }
  },
  async asyncData ({ app, route, payload }) {
    return {
      post: await app.$content('/').get(route.path)
    }
  },
  mounted () {
    console.log(`content mounted-title:${this.post.title}`)
    const gitment = new Gitment({
      id: this.post.title, // optional
      owner: 'thomascsd',
      repo: 'thomascsd.github.io',
      oauth: {
        client_id: 'c4b0b70b4ec62096f80f',
        client_secret: 'f25200df045f22d61cf9e3dff4b4fed2b126607f'
      }
    })

    gitment.render(document.getElementById('comments'))
  },
  components: {
    PostHeader
  }
}
</script>

