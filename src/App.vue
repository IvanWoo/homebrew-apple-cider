<template>
  <div id="app">
    <Keywords v-on:keywordChanged="keywordChanged"></Keywords>
    <Albumlist v-bind:source="source"></Albumlist>
  </div>
</template>

<script>
import Keywords from './components/Keywords'
import Albumlist from './components/Albumlist'

export default {
  name: 'app',
  components: {
    Keywords,
    Albumlist
  },
  data () {
    return {
      source: ""
    }
  },
  methods: {
    keywordChanged: function (source) {
      this.source = source;
    }
  }
}
</script>

<style>
</style>
