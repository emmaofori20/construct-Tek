import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  // chatRecipient;



  constructor() { }

  ngOnInit(): void {
  }

  /*Event emitter open*/


  openChat(){

    document.getElementById('friends-list').style.display="block";

    // this.dataManager.set_Chatbox_to_open();
   // this.onSound ();
  }

  closeChat(){
    console.log("clicked")
    document.getElementById('friends-list').style.display="none";
    // this.dataManager.set_Chatbox_to_close();
  }
  searchUser(e){
    console.log("details", e)
  }

  OpenChat(){
    var objDiv = document.getElementById("sendMess");
    // setTimeout(
    //   ()=>{
    //     objDiv.scrollTop = objDiv.scrollHeight;
    //     // console.log(objDiv.scrollHeight);
    //   },200)

    document.getElementById('chatview').style.display="flex";

  }

  back(){

  }

  sendMessage(chatRecipient){
    console.log()
  }
  // sendMessage(chatRecipient){

  // }
}
