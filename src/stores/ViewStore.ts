import {firebaseAuth, playersRef} from "../js/utils/firebase";
import {observable} from "mobx";
import Player from "../js/models/Player";

class ViewStore {
    @observable authed: boolean = false;
    @observable isLoading: boolean = true;
    @observable user: any = null;
    @observable errorMessage: string = '';
    @observable players: Player[] = [];

    constructor() {
        this.fetchPlayers();
    }

    fetchPlayers = () => {
        playersRef.on('value', function(snapshot) {
            let players = [];
            snapshot.forEach(function(childSnapshot) {
                const player = childSnapshot.val();
                player.key = childSnapshot.key;
                players.push(player);
            });

            this.players = players;
        }.bind(this));
    };

    firebaseCheckAuth = () => {
        firebaseAuth().onAuthStateChanged((user) => {
            if (user) {
                this.authed = true;
                this.isLoading = false;
                this.user = user;
            } else {
                this.authed = false;
                this.isLoading = false;
                this.user = null;
            }
        })
    };

    logError = (error) => {
        this.errorMessage = error;
    };

    addPlayer = (playerName: string) => {
        const playerKey = playersRef.push().key;
        playersRef.child(playerKey).set({name: playerName});
    };

    updatePlayer = (key: string, name: string) => {
        playersRef.child(key).set({name: name});
    };

    removePlayer = (key: string) => {
        playersRef.child(key).remove();
    };

    removeAllPlayers = () => {
        playersRef.remove();
    };
}

export default ViewStore;