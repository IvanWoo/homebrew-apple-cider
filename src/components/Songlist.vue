<template>
    <div class="">
        <table class="table table-sm">
            <thead>
                <tr>
                    <td></td>
                    <td class="col-sm-12 col-lg-8 align-middle text-muted">Title</td>
                    <td class="col-lg align-middle text-muted">Play</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(song, index) in songs" :key="song.id">
                    <td class="align-middle text-muted">{{ index + 1 }}</td>
                    <td class="col-sm-12 col-lg-8 align-middle">{{ song.name }}</td>
                    <td class="align-middle">
                        <song v-bind:song_info="song"></song>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'
import Song from '@/components/Song'

export default {
    name: 'Songlist',
    props: ['album_id'],
    components: {
       'song': Song,
    },
    data() {
        return {
            songs: [],
        }
    },
    watch: {
        // whenever question changes, this function will run
        album_id: function (newalbum_id, oldalbum_id) {
            this.debouncedGetSongList(newalbum_id)
        }
    },
    created: function () {
        // _.debounce is a function provided by lodash to limit how
        // often a particularly expensive operation can be run.
        // In this case, we want to limit how often we access
        // yesno.wtf/api, waiting until the user has completely
        // finished typing before making the ajax request. To learn
        // more about the _.debounce function (and its cousin
        // _.throttle), visit: https://lodash.com/docs#debounce
        this.getSongList(this.album_id);
        this.debouncedGetSongList = _.debounce(this.getSongList, 100);
    },
    methods: {
        getSongList: function(album_id) {
            axios.get('https://douting.leanapp.cn/api/get/album/qq?id=' + album_id)
                .then(response => {
                    this.songs = response.data.songList;
                });
        }
    }
}
</script>

<style scoped>
</style>