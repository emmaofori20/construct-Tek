import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';


interface Chat {
  id:string;
  sender:string;
  receiver:string;
  message:string;
  read:boolean;
  time:string;
  commonChatString:string;
}
@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {
userid;
  constructor(private afs: AngularFirestore) {
    this.userid = localStorage.getItem("user");
   }



   sendmessage(sender,receiver,message){
    let id = this.afs.createId();


    let  chat:Chat={
      id : id,
      sender: sender,
      receiver: receiver,
      message: message,
      // date: firebase.firestore.FieldValue.serverTimestamp(),
      time: new Date().toLocaleTimeString(),
      read:false,
      commonChatString: this.formCommonStringId(sender,receiver)
    }

    //store msg to sender
    this.afs.collection("Users").doc(this.userid).collection('Chats').doc(sender).collection('messages').doc(id).set(chat);

    //store message to reciever
    this.afs.collection("Users").doc(this.userid).collection('Chats').doc(receiver).collection('messages').doc(id).set(chat);

   }


   private formCommonStringId(sender,receiver){
    let commonStr="";
    if (sender>receiver){
      commonStr = sender+receiver;
    }else  {
      commonStr = receiver+sender;
    }
    return commonStr
  }

   // read messages
   getChatMessage(user,targetUser,entity){
    // let commonStr = this.formCommonStringId(user,targetUser);
    // return this.afs.collection("Users").doc(this.userid).collection("Chats").doc(user).collection(messages,ref=>ref.where("commonChatString","==",commonStr).orderBy('date')).valueChanges();
  }
}
