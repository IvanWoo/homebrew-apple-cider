<template>
    <div class="Albumlist">
        <div class="container-fluid">
            <ul class="media-list row">
                <li class="media row col-sm-12 col-lg-6" v-for="(album, index) in albums" :key="album.id">
                    <div class="col-sm-12 col-md-4">
                        <img class="media-left media-object mw-100" v-bind:src="album.coverBig">
                    </div>
                    <div class="media-body col-md-12">
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
import _ from 'lodash'
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
        }
    },
    watch: {
        // whenever question changes, this function will run
        source: function (newSource, oldSource) {
            this.debouncedGetAlbumList(newSource)
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
        this.debouncedGetAlbumList = _.debounce(this.getAlbumList, 100);
    },
    methods: {
        getAlbumList: function (source) {
            axios.get('https://douting.leanapp.cn/api/search/album/netease?&limit=3&key=' + source)
                .then(response => {
                    this.albums = response.data.albumList;

                    let ids = this.albums.map(album => {
                        return album.id
                    });

                    this.album_ids = ids;
                });
        }
    }
}
</script>

<style scoped>
    h2, h3 {
        padding-left: 15px;
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

</style>

