<template>
  <div>
    <blog-nav></blog-nav>

    <nuxt/>
    <hr>
    <blog-footer></blog-footer>
  </div>
</template>

<script>
import BlogHeader from '../components/BlogHeader'
import BlogNav from '../components/BlogNav'
import BlogFooter from '../components/BlogFooter'

export default {
  components: {
    BlogHeader,
    BlogNav,
    BlogFooter
  }
}
</script>

<style>

</style>
