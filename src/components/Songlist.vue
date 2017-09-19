<template>
    <div class="container-fluid">
        <table class="table lead">
            <thead class="hidden-md-down">
                <tr>
                    <td></td>
                    <td class="col-lg-9 align-middle text-muted">Title</td>
                    <td class="col-lg align-middle text-muted">Streaming</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(song, index) in songs" :key="song.id">
                    <td class="align-middle text-muted">{{ index + 1}}</td>
                    <td class="align-middle">{{ song.name }}</td>
                    <td class="align-middle">
                        <audio class="audioPlayer align-middle" controls="" controlsList="nodownload" preload="none" :src=" songsUrl[index]" type="audio/mpeg">
                        Your browser does not support the audio element.
                        </audio>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Songlist',
    props: ['album_id'],
    data() {
        return {
            albums: [],
            songs: [],
            songsUrl: [],
        }
    },
    methods: {
        getSongList: function(album_id) {
            axios.get('https://doubananimalclock.leanapp.cn/api/get/album/xiami?id=' + album_id)
                .then(response => {
                    this.songs = response.data.songList;

                    let ids = this.songs.map(song => {
                        return song.id
                        });

                    let urls = [];
                    ids.forEach(function(id) {
                        this.getSongUrl(id, urls);
                    }, this);

                    this.songsUrl = urls;
                    
                });
        },
        getSongUrl: function(song_id, urls) {
            axios.get('https://doubananimalclock.leanapp.cn/api/get/song/xiami?id=' + song_id)
                .then(response => {
                    urls.push(response.data.url);
                });
        }
    },
    created: function() {
        this.getSongList(this.album_id);
    },
    watch: {
        album_id: function(val) {
            this.getSongList(val);
        }
    }
}
</script>

<style scoped>

td {
    line-height: 55px;
    min-height: 55px;
    height: 55px;
}

audio {
    width: 100%;
    height: 100%;
}

</style>