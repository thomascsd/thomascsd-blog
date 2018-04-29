<template>
  <div>
    <!-- Page Header -->
    <!-- Set your background image for this header on the line below. -->
    <header class="intro-header" style="background-image: url('/images/bg1920x872.jpg')">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
            <div class="page-heading">
              <h1>{{ title }}</h1>
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
          <nuxt/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ app }) {
    return {
      title: JSON.stringify(app)
    }
  },
  layout: 'default'
}
</script>

<style>

</style>
