<template>
    <header class="intro-header" style="background-image: url('/images/bg1920x872.jpg')">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <div class="post-heading">
                        <h1>{{title}}</h1>
                        <!-- <h2 class="subheading">Problems look mighty small from 150 miles up</h2> -->
                        <span class="meta">on {{dateStr}}</span>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import * as moment from 'moment'

export default {
  name: 'PostHeader',
  props: {
    title: String,
    postDate: String
  },
  computed: {
    dateStr () {
      return moment(this.postDate).format('YYYY-MM-DD')
    }
  }
}
</script>

<style>

</style>
