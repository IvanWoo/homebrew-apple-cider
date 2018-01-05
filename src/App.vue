<template>
  <div id="app">
    <Keywords v-on:keywordChanged="keywordChanged"></Keywords>
    <Albumlist v-bind:source="source"></Albumlist>
    <div v-if="load">
        <a-player listmaxheight="120px" mutex :music="playlist" class="fixed-bottom"></a-player>
    </div>
    <!-- <button v-on:click="clearPlaylist" type="button" class="btn btn-danger fixed-top">Clear Playlist</button> -->
  </div>
</template>

<script>
import Keywords from './components/Keywords'
import Albumlist from './components/Albumlist'
import VueAplayer from 'vue-aplayer'

export default {
  name: 'app',
  components: {
    Keywords,
    Albumlist,
    'a-player': VueAplayer
  },
  computed: {
    playlist() {
      return this.$store.state.playlist;
    },
    load() {
      return this.$store.state.load;
    }
  },
  data () {
    return {
      source: ""
    }
  },
  methods: {
    keywordChanged: function (source) {
      this.source = source;
    },
    clearPlaylist: function() {
      // this.$store.commit('reload');
      // this.$store.commit('addToPlaylist', newSong);
      this.$store.dispatch('clearPlaylist');
    },
  }
}
</script>

<style scoped>
.aplayer {
  background-color: white;
}
</style>
