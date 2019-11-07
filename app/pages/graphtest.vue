<template>
  <div style="padding-top: 5em">
    <div
      v-for="post in posts.edges"
      :key="post.cursor"
    >
      <h2 v-html="post.node.title" />
      <div v-html="post.node.excerpt" />
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'GraphTest',
  apollo: {
    posts: gql`query {
      posts(first: 30, where: {orderby: {order: DESC, field: DATE}}) {
        edges {
          cursor
          node {
            title(format: RENDERED)
            date
            excerpt(format: RENDERED)
          }
        }
      }
    }`
  }
}
</script>