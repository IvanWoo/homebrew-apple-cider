<template>
    <audio class="audioPlayer" controls="" controlsList="nodownload" preload="none" :src="song_url" type="audio/mpeg">
    Your browser does not support the audio element.
    </audio>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Song',
    props: ['song_id'],
    data() {
        return {
            song_url: [],
        }
    },
    methods: {
        getSongUrl: function(song_id) {
            axios.get('https://doubananimalclock.leanapp.cn/api/get/song/xiami?id=' + song_id)
                .then(response => {
                        this.song_url = response.data.url
                });
        }
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
audio {
    width: 100%;
    height: 100%;
}
</style>