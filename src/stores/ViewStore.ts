import {firebaseAuth, headToHeadsRef, playersRef} from "../js/utils/firebase";
import {observable} from "mobx";
import Player from "../js/models/Player";
import HeadToHead from "../js/models/HeadToHead";

class ViewStore {
    @observable authed: boolean = false;
    @observable isLoading: boolean = true;
    @observable user: any = null;
    @observable errorMessage: string = '';
    @observable players: Player[] = [];
    @observable headToHeads: HeadToHead[] = [];

    constructor() {
        this.fetchPlayers();
        this.fetchHeadToHeads();
    }

    fetchPlayers = () => {
        playersRef.on('value', function (snapshot) {
            let players = [];
            snapshot.forEach(function (childSnapshot) {
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

    //CRUD - Players
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

    //CRUD - HeadToHeads
    addHeadToHeads = (title: string, playerA: string, playerB: string) => {
        const headToHeadsKey = headToHeadsRef.push().key;
        headToHeadsRef.child(headToHeadsKey).set({
            playerAWinCount: 0,
            playerBWinCount: 0,
            drawsCount: 0,
            playerA: playerA,
            playerB: playerB,
            title: title
        });
    };

    fetchHeadToHeads = () => {
        headToHeadsRef.on('value', function (snapshot) {
            debugger
            let headToHeads = [];
            snapshot.forEach(function (childSnapshot) {
                debugger
                const headToHead = childSnapshot.val();
                headToHead.key = childSnapshot.key;
                headToHeads.push(headToHead);
            });

            this.headToHeads = headToHeads;
        }.bind(this));
    };

}

export default ViewStore;