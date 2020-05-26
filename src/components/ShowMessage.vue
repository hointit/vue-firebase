<template>
	<div class="col-md-8 col-xl-6 chat">
            <div class="card">
                <div class="card-header msg_head">
                    <div class="d-flex bd-highlight">
                        <div class="img_cont">
                            <img src="https://picsum.photos/200/300" class="rounded-circle user_img">
                            <span class="online_icon"></span>
                        </div>
                        <div class="user_info">
                            <span>Vuejs-firebase-chat</span>
                            <p>{{listMessages.length}} Messages</p>
                        </div>
                        <div class="video_cam">
                            <span><i class="fas fa-video"></i></span>
                            <span><i class="fas fa-phone"></i></span>
                        </div>
                    </div>
                    <span @click="LogoutAction" id="action_menu_btn"><i class="fas fa-sign-out-alt"></i></span>
                    <div class="action_menu">
                        <ul>
                            <li><i class="fas fa-user-circle"></i> View profile</li>
                            <li><i class="fas fa-users"></i> Add to close friends</li>
                            <li><i class="fas fa-plus"></i> Add to group</li>
                            <li><i class="fas fa-ban"></i> Block</li>
                        </ul>
                    </div>
                </div>
                <div class="card-body msg_card_body" id="message-list" ref="msgContainer">
                    <div v-for="item in listMessages" :key="item.key">
                        <div class="d-flex justify-content-start mb-4" v-if="!item.isMe">
                            <div class="img_cont_msg">
                                <img src="https://picsum.photos/200/300" class="rounded-circle user_img_msg">
                            </div>
                            <div class="msg_cotainer">
                                {{item.content}}
                                <span class="msg_time">{{item.timeSend |DateTimeFillters}}</span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end mb-4" v-else>
                            <div class="msg_cotainer_send"> {{item.content}}
                                <span class="msg_time_send">{{item.timeSend | DateTimeFillters}}</span>
                            </div>
                            <div class="img_cont_msg">
                                <img src="https://picsum.photos/200/300" class="rounded-circle user_img_msg">
                            </div>
                        </div>
                    </div>
                </div>
                <SendMessage v-bind:current-user-id="currentUserId"/>
            </div>
    </div>
</template>

<script>
import firebase from "../firebaseConfig"
import SendMessage from './SendMessage'

export default {
    mounted: function() {
        var self = this;
        // check login
        this.$nextTick(function() {
            var mesRef = firebase.database.ref('chatRoom');
            var self = this;
            mesRef.on('child_added', function(data) {
                var mes = data.val();
                self.listMessages.push({
                    isMe : self.currentUserId == mes.from,
                    content: mes.content,
                    timeSend: mes.timeSend
                })
            });

            mesRef.on('child_changed', function(data) {

            });

            mesRef.on('child_removed', function(data) {

            });
        });
    },
    name: "ShowMessage",
    data() {
        return {
            listMessages: []
        };
    },
    methods: {
        LogoutAction: function(){
            debugger
            firebase.auth.signOut();
        }
    },
    components:{
        SendMessage
    },
    props: ['currentUserId'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
