<template>
    <div v-if="is_success">
        <audio class="audioPlayer align-middle" controls="" controlsList="nodownload" preload="none" :src="song_url" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    </div>
    <div v-else>
        N/A
    </div>

    <!-- <div v-if="show">
        <a-player mutex mini :music="music" v-on:click="addToPlaylist(music)"></a-player>
        <span v-on:click="reloadPlaylist(music)">▶️</span>
        <span v-on:click="reload">⟳</span>
    </div> -->


</template>

<script>
import axios from 'axios'
import VueAplayer from 'vue-aplayer'

export default {
    name: 'Song',
    props: ['song_info'],
    components: {
        'a-player': VueAplayer
    },
    data() {
        return {
            song_url: "",
            show: false,
            is_success: false,
            music: {}
        }
    },
    methods: {
        getSongUrl: function(song_info) {
            axios.get('https://douting.leanapp.cn/api/get/song/qq?id=' + song_info.id + '&mid=' + song_info.mid)
                .then(response => {
                    // this.music.title = this.song_info.name;
                    // this.music.pic = this.song_info.album.coverBig;
                    // this.music.src = response.data.url;
                    // this.music.artist = this.song_info.artists[0].name;
                    this.song_url = response.data.url;
                    // this.music.title = response.data.name;
                    // this.music.pic = response.data.album.cover;
                    // this.music.url = response.data.url;
                    // this.music.author = response.data.artist.id;
                    // this.show = true;
                    this.is_success = response.data.success;
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
        this.getSongUrl(this.song_info);
    }
}
</script>

<style scoped>
</style>