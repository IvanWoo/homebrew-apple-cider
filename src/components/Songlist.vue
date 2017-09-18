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
                    <td>
                        <song v-bind:song_id="song.id"></song>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import Song from '@/components/Song'

export default {
    name: 'Songlist',
    props: ['album_id'],
    components: {
        'song': Song,
    },
    data() {
        return {
            albums: [],
            songs: []
        }
    },
    methods: {
        getSongList: function(album_id) {
            axios.get('https://doubananimalclock.leanapp.cn/api/get/album/xiami?id=' + album_id)
                .then(response => {
                    this.songs = response.data.songList;
                });
        },
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

</style>