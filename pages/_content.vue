<template>
<section class="content-container">
  <h1 class="post-title"> {{ post.title }} </h1>
  <nuxtent-body :body="post.body" />
</section>
</template>

<script>
export default {
  asyncData: async ({ app, route, payload }) => ({
    post: await app.$content('/').get(route.path) || payload
  }),
  layout: 'post'
}
</script>

<style>

</style>
