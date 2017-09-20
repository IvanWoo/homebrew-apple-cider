<template>
    <div class="Albumlist">
        <div class="container-fluid">
            <ul class="media-list row">
                <li class="media row no-gutter" v-for="(album, index) in albums" :key="album.id">
                    <div class="col-sm-12 col-md-4">
                        <img class="media-left media-object" v-bind:src="album.cover">
                    </div>
                    <div class="media-body col-md-8">
                        <h2 class="h3">{{ album.name }}</h2>
                        <h3 class="h4">{{ album.artist.name }}</h3>
                        <songlist v-bind:album_id="album_ids[index]"></songlist>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import songlist from '@/components/Songlist'

export default {
    name: 'Albumlist',
    props: ['source'],
    components: {
        'songlist': songlist,
    },
    data () {
        return {
            albums: [],
            songs: [],
            album_ids: [],
            album_id: ""
        }
    },
    methods: {
        getAlbumList: function (source) {
            axios.get('https://doubananimalclock.leanapp.cn/api/search/album/xiami?key=' + source)
                .then(response => {
                    this.albums = response.data.albumList;

                    let ids = this.albums.map(album => {
                        return album.id
                    });

                    this.album_ids = ids;
                });
        }
    },
    created: function () {
        this.getAlbumList(this.source);
    },
    watch: {
        source: function (val) {
            this.getAlbumList(val);
        }
    }
}
</script>

<style scoped>
    h2, h3 {
        padding-left: 15px;
    }
    .row {
        margin-left: -23px;
    }
    .media-object {
        max-width: 100%;
        padding: 10px;
        border-radius: 15px;
    }

    .media {
        border-top: 1px solid lightgrey;
        padding-top: 20px;
    }

    .no-gutter {
        margin-right: 0;
    }

</style>

