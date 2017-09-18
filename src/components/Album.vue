<template>
    <div class="media-body">
        <h2 class="media-heading">{{ album.name }}</h2>
        <h3 class="">{{ album.artist.name }}</h3>
        <!-- <p><i> id is: {{ album.artist.id }} </i></p> -->
        <songlist v-bind:album_id="album_id"></songlist>
    </div>
</template>

<script>
import axios from 'axios'
import Songlist from '@/components/Songlist'

export default {
    name: 'Album',
    props: ['album'],
    components: {
        'songlist': Songlist,
    },
    data() {
        return {
            album_id: ""
        }
    },
    methods: {
        getAlbumId: function(album) {
            this.album_id = album.id
        },
    },
    created: function() {
        this.getAlbumId(this.album);
    },
    watch: {
        album: function(val) {
            this.getAlbumId(val);
        }
    }
}
</script>

<style scoped>
</style>

