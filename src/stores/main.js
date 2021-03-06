import {defineStore} from 'pinia';
import axios from 'axios';

export const useMainStore = defineStore('main', {
    state: () =>{
        return {
            username : "Jeremy",
            kanyeResponse : undefined
        }
    },
    actions :{
        async getQuote(){
            axios.request({
                url : "https://api.kanye.rest/",
                method : "GET"
            }).then((response)=>{
                this.kanyeResponse = response;
                this.newQuoteNotification();
            }).catch((error)=>{
                console.log(error);
            })
        },
        newQuoteNotification(){
            console.log("New Quote");
        }
    },
    getters: {
        firstInitial: state => {
            return state.username.charAt(0);
        },
        quoteHttpCode : state =>{
            if (state.kanyeResponse){
                return state.kanyeResponse.status;
            }
            return undefined;
        },
        quoteText : state =>{
            if (state.kanyeResponse){
                return state.kanyeResponse.data.quote;
            }
            return undefined;
        }
    }
})