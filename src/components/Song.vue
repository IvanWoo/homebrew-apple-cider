<template>

    <!-- <audio class="audioPlayer w-100 mw-100 align-middle" controls="" controlsList="nodownload" preload="none" :src="song_url" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio> -->
    <div v-if="show">
        <!-- <a-player mutex narrow :music="music" v-on:click="addToPlaylist(music)"></a-player> -->
        <span v-on:click="reloadPlaylist(music)">▶️</span>
        <!-- <span v-on:click="reload">⟳</span> -->
    </div>


</template>

<script>
import axios from 'axios'
import VueAplayer from 'vue-aplayer'

export default {
    name: 'Song',
    props: ['song_id'],
    components: {
        'a-player': VueAplayer
    },
    data() {
        return {
            song_url: "",
            show: false,
            music: {}
        }
    },
    methods: {
        getSongUrl: function(song_id) {
            axios.get('https://doubananimalclock.leanapp.cn/api/get/song/xiami?id=' + song_id)
                .then(response => {
                    this.song_url = response.data.url;
                    this.music.title = response.data.name;
                    this.music.pic = response.data.album.cover;
                    this.music.url = response.data.url;
                    this.music.author = response.data.artist.id;
                    this.show = true;
                });
        },
        reloadPlaylist: function(newSong) {
            // this.$store.commit('reload');
            // this.$store.commit('addToPlaylist', newSong);
            this.$store.dispatch('reloadPlaylist', newSong);
        },
        // reload: function() {
        //     this.$store.commit('reload');
        // }
    },
    created: function() {
        this.getSongUrl(this.song_id);
    },
    watch: {
        album_id: function(val) {
            this.getSongUrl(val);
        }
    }
}
</script>

<style scoped>
</style>