<template>
    <div class="Albumlist">
        <div>
            <ul class="media-list row">
                <li class="media row no-gutter" v-for="album in albums" :key="album.id">
                    <div class="media-left col-lg-4">
                        <img class="media-left media-object" v-bind:src="album.cover">
                    </div>
                    <div class="media-body col-lg-8">
                        <album v-bind:album="album"></album>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Album from '@/components/Album'

export default {
    name: 'Albumlist',
    props: ['source'],
    components: {
        'album': Album,
    },
    data () {
        return {
            albums: [],
            songs: [],
            album_id: ""
        }
    },
    methods: {
        getAlbumList: function (source) {
            axios.get('https://doubananimalclock.leanapp.cn/api/search/album/xiami?key=' + source)
                .then(response => {
                    this.albums = response.data.albumList;
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
    .media-object {
        width: 100%;
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

