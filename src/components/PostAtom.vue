<template lang="html">
  <div class="post-container">
    <div class="post">

      <div class="post-title-block">
        <h4 class="post-title">
          <span class="post-title-callout">
            Post Title Callout
          </span>
          <span class="post-title-wrap">
            Post Title
          </span>
        </h4>
        <div class="post-video-watch">
          > Watch Video
        </div>
      </div>

      <div class="post-author">
        Post Author
        <span class="post-date">
          &nbsp;—&nbsp;
          <span>Post Date</span>
        </span>
      </div>

      <div class="post-excerpt">
        <p>Post Excerpt</p>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "PostAtom",
  props: {},
  data: function() {
    return {};
  }
};
</script>

<style lang="css">
.post-title-block {

}

.post-title {

}

.post-title-callout {
  display: block;
}
</style>
