<template>
    <div class="card-footer">
        <div class="input-group">
            <div class="input-group-append">
                <span class="input-group-text attach_btn"><i class="fas fa-paperclip"></i></span>
            </div>
            <input type="text" name="" class="form-control type_msg" placeholder="Type your message..." v-model="contentMessage"/>
            <div class="input-group-append" v-on:click="SendMessageHandler">
                <span class="input-group-text send_btn"><i class="fas fa-location-arrow"></i></span>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "../firebaseConfig"


export default {
    mounted: function(){
    },
    name: 'SendMessage',
    data () {
        return {
            contentMessage: ''
        }
    },
    methods:{
        SendMessageHandler: function(){
            var self = this;
            if(self.contentMessage == "" || self.contentMessage == null) return;
            var messageRefer = firebase.database.ref('messages').push();
            messageRefer.set({
                content: self.contentMessage,
                from: self.currentUserId,
                timeSend: Date.now(),
            }).then(function(){
                self.contentMessage = "";
            })
        }
    },
    props: ['currentUserId'],
}
</script>