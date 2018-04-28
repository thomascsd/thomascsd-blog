<template>
<div>
  <header class="intro-header" style="background-image: url('/images/bg1920x872.jpg')">
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
        <div class="post-heading">
          <h1>{{ title }}</h1>
          <!-- <span class="meta"> Written on {{ page.date | date: "%B %e, %Y" }}</span> -->
        </div>
      </div>
    </div>
  </div>
</header>

<article>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
          <nuxt/>
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
export default {
  async asyncData ({ app }) {
    return {
      title: ''
    }
  },
  layout: 'default'
}
</script>

<style>

</style>
