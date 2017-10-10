import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    strict: true,
    state: {
        playlist: [],
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
            state.playlist.splice(0);
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