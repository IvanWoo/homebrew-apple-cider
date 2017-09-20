import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
        playlist: [{
            author: "Zombie Chang",
            pic: "http://img.xiami.net/images/album/img56/1277136656/21002723041454654560.jpg",
            title: "ARE YOU READY",
            url: "http://om5.alicdn.com/656/1277136656/2100272304/1775601398_59686758_l.mp3?auth_key=cc4d10b77498d82b173fde8c087eb3b1-1506567600-0-null"
        }],
        load: true
    },
    mutations: {
        addToPlaylist: (state, newSong) => {
            // https://stackoverflow.com/questions/36719477/array-push-and-unique-items
            if (state.playlist.indexOf(newSong) === -1) {
                state.playlist.push(newSong);
            }
        },
        reload: (state) => {
            state.load = !state.load;
        },
        clearPlaylist: (state) => {
            state.playlist.splice(1);
        }
    },
    actions: {
        reloadPlaylist (context, newSong) {
            setTimeout(function() {
                context.commit('reload');
                context.commit('addToPlaylist', newSong);
            }, 100)
            context.commit('reload');
        },
        clearPlaylist (context) {
            setTimeout(function () {
                context.commit('reload');
                context.commit('clearPlaylist');
            }, 100)
            context.commit('reload');
        }
    }
})