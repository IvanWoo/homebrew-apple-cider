<template>
  <div id="app">
    <Keywords v-on:keywordChanged="keywordChanged"></Keywords>
    <Albumlist v-bind:source="source"></Albumlist>
  </div>
</template>

<script>
import Keywords from './components/Keywords.vue';
import Albumlist from './components/Albumlist.vue';

export default {
  name: 'app',
  components: {
    Keywords,
    Albumlist
  },
  data() {
    return {
      source: ''
    };
  },
  methods: {
    keywordChanged: function (source) {
      this.source = source;
    }
  }
};
</script>

<style scoped>
.aplayer {
  background-color: white;
}
</style>
