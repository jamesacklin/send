<template lang="html">
  <nav class="page-navigation">
    <ul class="pagination pagination-archive" v-if="postArchive" key="archive">
      <li v-if="notFirstPage">
        <nuxt-link :to="prevPage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-labelledby="leftTitle"
            role="img"
          >
            <title id="leftTitle">Left arrow icon</title>
            <path
              d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
            />
          </svg>
          <span class="screen-reader-text">Newer Posts</span>
        </nuxt-link>
      </li>
      <li v-else>&nbsp;</li>
      <li v-if="notLastPage">
        <nuxt-link :to="nextPage">
          <span class="screen-reader-text">Older Posts</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-labelledby="rightTitle"
            role="img"
          >
            <title id="rightTitle">Right arrow icon</title>
            <path
              d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
            />
          </svg>
        </nuxt-link>
      </li>
      <li v-else>&nbsp;</li>
    </ul>
    <ul
      class="pagination pagination-archive"
      v-if="categoryArchive"
      key="category-archive"
    >
      <li v-if="notFirstCategoryPage">
        <nuxt-link :to="prevCategoryPage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-labelledby="leftTitle"
            role="img"
          >
            <title id="leftTitle">Left arrow icon</title>
            <path
              d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
            />
          </svg>
          <span class="screen-reader-text">Newer Posts</span>
        </nuxt-link>
      </li>
      <li v-else>&nbsp;</li>
      <li v-if="notLastCategoryPage">
        <nuxt-link :to="nextCategoryPage">
          <span class="screen-reader-text">Older Posts</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-labelledby="rightTitle"
            role="img"
          >
            <title id="rightTitle">Right arrow icon</title>
            <path
              d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"
            />
          </svg>
        </nuxt-link>
      </li>
      <li v-else>&nbsp;</li>
    </ul>
    <ul class="pagination pagination-single" v-if="postSingle" key="single">
      <li>
        <nuxt-link :to="backUp">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            aria-labelledby="backTitle"
            role="img"
          >
            <title id="backTitle">Menu icon</title>
            <path
              d="M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z"
            />
          </svg>
          <span class="screen-reader-text">{{ backUpText }}</span>
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  // TODO: comment all of this
  computed: {
    backUp() {
      if (
        !this.$store.state.pagination.current ||
        this.$store.state.pagination.current === 1
      ) {
        return '/'
      } else {
        return '/page/' + this.$store.state.pagination.current + '/'
      }
    },
    backUpText() {
      if (
        !this.$store.state.pagination.current ||
        this.$store.state.pagination.current === 1
      ) {
        return 'Back to Home'
      } else {
        return 'Back to Page ' + this.$store.state.pagination.current
      }
    },
    nextPage() {
      return '/page/' + (this.$store.state.pagination.current + 1) + '/'
    },
    prevPage() {
      if (this.$store.state.pagination.current - 1 === 1) {
        return '/'
      } else {
        return '/page/' + (this.$store.state.pagination.current - 1) + '/'
      }
    },
    nextCategoryPage() {
      return (
        '/category/' +
        this.$route.params.slug +
        '/page/' +
        (this.$store.state.categories.categories[this.$route.params.slug]
          .pagination.current +
          1) +
        '/'
      )
    },
    prevCategoryPage() {
      if (
        this.$store.state.categories.categories[this.$route.params.slug]
          .pagination.current -
          1 ===
        1
      ) {
        return '/category/' + this.$route.params.slug
      } else {
        return (
          '/category/' +
          this.$route.params.slug +
          '/page/' +
          (this.$store.state.categories.categories[this.$route.params.slug]
            .pagination.current -
            1) +
          '/'
        )
      }
    },
    postSingle() {
      return this.$route.name === 'page' || this.$route.name === 'article'
    },
    postArchive() {
      return this.$route.name === 'index' || this.$route.name === 'index-page'
    },
    categoryArchive() {
      return (
        this.$route.name === 'category-index' ||
        this.$route.name === 'category-index-page'
      )
    },
    notFirstPage() {
      return (
        this.$store.state.pagination.current &&
        this.$store.state.pagination.current !== 1
      )
    },
    notLastPage() {
      return (
        this.$store.state.pagination.current <
        this.$store.state.pagination.totalPostsPages
      )
    },
    notFirstCategoryPage() {
      return (
        this.$store.state.categories.categories[this.$route.params.slug]
          .pagination.current &&
        this.$store.state.categories.categories[this.$route.params.slug]
          .pagination.current !== 1
      )
    },
    notLastCategoryPage() {
      return (
        this.$store.state.categories.categories[this.$route.params.slug]
          .pagination.current <
        this.$store.state.categories.categories[this.$route.params.slug]
          .pagination.totalPostsPages
      )
    }
  },
  methods: {
    goNextPage() {
      if (this.notLastPage && this.postArchive) {
        this.$router.push(this.nextPage)
      }
    },
    goPrevPage() {
      if (this.notFirstPage && this.postArchive) {
        this.$router.push(this.prevPage)
      }
    },
    goBackUp() {
      this.$router.push(this.backUp)
    },
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.screen-reader-text {
  font-family: 'Roboto Mono', monospace;
}
.page-navigation {
  position: fixed;
  z-index: 3;
  bottom: 0;
  left: 0;
  width: 100%;
}
.pagination {
  list-style: none;
  background: #000;
  margin: 0;
  padding: 0;
  &::after {
    content: '';
    display: table;
    clear: both;
  }
  li {
    text-align: center;
    width: 50%;
    height: 100%;
    float: left;
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-decoration: none;
      padding: 1rem;
      background: red;
      svg {
        fill: white;
      }
      &:hover {
        background: black;
      }
    }
  }
}
</style>
