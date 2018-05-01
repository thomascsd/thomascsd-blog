<template>
  <div>
    <!-- Page Header -->
    <blog-header></blog-header>
    <!-- Main Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
          <p>
            我是喜歡ACG的軟體工程師，從.Net開始起步的，最先學的語言是VB.Net然後再來是C#，這幾年覺得JavaScript很有趣，並且Node.js的推出，還有TypeScript，覺得JavaScript是未來的語言。
          </p>
          <p>
            本Blog主要會寫一些程式的學習筆記及開發經驗談。
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import BlogHeader from '../components/BlogHeader'
export default {
  components: {
    BlogHeader
  }
}
</script>
