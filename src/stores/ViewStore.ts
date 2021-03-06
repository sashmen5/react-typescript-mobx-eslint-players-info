import {firebaseAuth, headToHeadsRef, playersRef, gamesRef} from "../js/utils/firebase";
import {computed, observable} from "mobx";
import Player from "../js/models/Player";
import HeadToHead from "../js/models/HeadToHead";
import Game from "../js/models/Game";
import {uniq} from 'lodash';
class ViewStore {
    @observable authed: boolean = false;
    @observable isLoading: boolean = true;
    @observable user: any = null;
    @observable errorMessage: string = '';
    @observable players: Player[] = [];
    @observable games: Game[] = [];
    @observable headToHeads: HeadToHead[] = [];
    @observable selectedHeadToHead: HeadToHead = null;

    constructor() {

    }

    fetchData = () => {
        this.errorMessage = '';
        this.fetchPlayers();
        this.fetchHeadToHeads();
    };

    fetchGames = (headToHead: HeadToHead, fetchAll?: boolean) => {
        const limit = fetchAll ? 99999 : 10;
        gamesRef.orderByChild('headToHeadKey').equalTo(headToHead.key).limitToLast(limit).on('value', function(snapshot) {
            let games = [];
            snapshot.forEach(function(childSnapshot) {
                const game = childSnapshot.val();
                game.key = childSnapshot.key;
                games.push(game);
            });
            this.games = games;
        }.bind(this));
    };

    fetchPlayers = () => {
        // now read data from firebase
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

    //CRUD - Players
    addPlayer = (playerName: string) => {
        const playerKey = playersRef.push().key;
        playersRef.child(playerKey).set({name: playerName});
    };

    updatePlayer = (key: string, name: string) => {
        playersRef.child(key).update({name: name});
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
            let headToHeads = [];
            snapshot.forEach(function (childSnapshot) {
                const headToHead = childSnapshot.val();
                headToHead.key = childSnapshot.key;
                headToHeads.push(headToHead);
            });

            this.headToHeads = headToHeads;
            if (this.headToHeads.length > 0 && this.selectedHeadToHead === null) {
                this.selectHeadToHead(this.headToHeads[0])
            }
        }.bind(this));
    };

    fetchHeadToHead = (key: string) => {
        this.fetchData();
        headToHeadsRef.child(key).on('value', function(snapshot) {

            if (!!snapshot.val()) {
                const headToHead = snapshot.val();
                headToHead.key = snapshot.key;
                this.selectHeadToHead(headToHead);
            } else {
                //TODO: this is not workings
                this.errorMessage = "This head to head does not exist";
            }


        }.bind(this));
    };

    selectHeadToHead = (headToHead: HeadToHead) => {
        console.log(headToHead.title);
        this.selectedHeadToHead = headToHead;
        this.fetchGames(headToHead);
    };

    updateHeadToHeads = (key: string, name: string, value: string) => {
        headToHeadsRef.child(key).update({[name]: value});
    };

    removeHeadToHeads = (key: string) => {
        this.removeAllHeadToHeadGames(key);
        headToHeadsRef.child(key).remove();
    };

    removeAllHeadToHeadGames = (key: string) => {
        const query = gamesRef.orderByChild('headToHeadKey').equalTo(key);
        query.on('child_added', function(snapshot){
            snapshot.ref.remove();
            return console.log('Game has been removed!');
        })
    };


    //CRUD - Games
    addGame = (homeTeamName: string, awayTeamName: string, homeTeamGoals: number, awayTeamGoals: number) => {
        const {key, playerA, playerB} = this.selectedHeadToHead;
        const winnerKey = this.getWinner(playerA, playerB, homeTeamGoals, awayTeamGoals);

        const pA = this.players.length > 0 && this.players.filter(player => player.key === playerA);
        const pB = this.players.length > 0 && this.players.filter(player => player.key === playerB);

        this.updateTotalScore(winnerKey, 'addGame');

        const gameKey = gamesRef.push().key;
        gamesRef.child(gameKey).set({
            headToHeadKey: key,
            homeTeamKey: playerA,
            homeTeamName: homeTeamName !== '' ? homeTeamName : pA[0].name,
            homeTeamGoals: homeTeamGoals,
            awayTeamKey: playerB,
            awayTeamName: awayTeamName !== '' ? awayTeamName : pB[0].name,
            awayTeamGoals: awayTeamGoals,
            date: Date.now(),
            winnerKey: winnerKey,
        });
    };

    getWinner = (playerA: string, playerB: string, homeTeamGoals: number, awayTeamGoals: number) => {
        let winner;
        if(homeTeamGoals > awayTeamGoals){
            winner = playerA;
            console.log('playerA');
        } else if (homeTeamGoals < awayTeamGoals) {
            winner = playerB;
            console.log('playerB');
        } else if (homeTeamGoals === awayTeamGoals) {
            winner = '';
            console.log('draw');
        }
        return winner;
    };

    updateGame = (key: string, name: string, value: string) => {
        gamesRef.child(key).update({ [name] : value})
    };

    removeGame = (key: string) => {
        const game = this.games.filter(game => game.key === key);
        this.updateTotalScore(game[0].winnerKey, 'removeGame');
        gamesRef.child(key).remove();
    };

    ////------------------------
    getPlayerName = (key: string):string => {
        const player = this.players.length > 0 && this.players.filter(player => player.key === key);
        return player[0].name;
    };

    updateTotalScore = (winnerKey: string, action: string) => {
        const {key, playerAWinCount, drawsCount, playerBWinCount, playerA, playerB} = this.selectedHeadToHead;
        switch (action) {
            case 'addGame':

                if(winnerKey === playerA){
                    headToHeadsRef.child(key).update({"playerAWinCount": playerAWinCount+1}, function(){
                        this.selectedHeadToHead.playerAWinCount = playerAWinCount+1;
                    }.bind(this))
                } else if (winnerKey === playerB) {
                    headToHeadsRef.child(key).update({"playerBWinCount": playerBWinCount+1}, function(){
                        this.selectedHeadToHead.playerBWinCount = playerBWinCount+1;
                    }.bind(this))
                } else if (winnerKey === '') {
                    headToHeadsRef.child(key).update({"drawsCount": drawsCount+1}, function(){
                        this.selectedHeadToHead.drawsCount = drawsCount+1;
                    }.bind(this))
                }

                break;
            case 'removeGame':

                if(winnerKey === playerA){
                    headToHeadsRef.child(key).update({"playerAWinCount": playerAWinCount-1}, function(){
                        this.selectedHeadToHead.playerAWinCount = playerAWinCount-1;
                    }.bind(this))
                } else if (winnerKey === playerB) {
                    headToHeadsRef.child(key).update({"playerBWinCount": playerBWinCount-1}, function(){
                        this.selectedHeadToHead.playerBWinCount = playerBWinCount-1;
                    }.bind(this))
                } else if (winnerKey === '') {
                    headToHeadsRef.child(key).update({"drawsCount": drawsCount-1}, function(){
                        this.selectedHeadToHead.drawsCount = drawsCount-1;
                    }.bind(this))
                }
                break;

            default:
                break;
        }
    };

    @computed get headToHeadPlayers(){
        let keys = [];

        this.headToHeads && this.headToHeads.length > 0 && this.headToHeads.map(headToHead => keys.push(headToHead.playerA, headToHead.playerB));

        return uniq(keys);
    }

}

export default ViewStore;