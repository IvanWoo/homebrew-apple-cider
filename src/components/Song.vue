<template>
    <div v-if="is_success">
        <audio class="audioPlayer align-middle" controls="" controlsList="nodownload" preload="none" :src="song_url" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    </div>
    <div v-else>
        N/A
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Song',
    props: ['song_info'],
    data() {
        return {
            song_url: "",
            show: false,
            is_success: false,
            need_pay: false,
            music: {}
        }
    },
    methods: {
        getSongUrl: function(song_info) {
            axios.get('https://douting.leanapp.cn/api/get/song/netease?id=' + song_info.id + '&mid=' + song_info.mid)
                .then(response => {
                    // this.music.title = this.song_info.name;
                    // this.music.pic = this.song_info.album.coverBig;
                    // this.music.src = response.data.url;
                    // this.music.artist = this.song_info.artists[0].name;
                    this.need_pay = this.song_info.needPay;

                    this.song_url = response.data.url;
                    this.is_success = response.data.success;

                    this.show = true;
                });
        },
    },
    created: function() {
        this.getSongUrl(this.song_info);
    }
}
</script>

<style scoped>
</style>