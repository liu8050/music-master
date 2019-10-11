import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-audioplayer',
  templateUrl: './audioplayer.component.html',
  styleUrls: ['./audioplayer.component.scss']
})
export class AudioplayerComponent implements OnInit {

  @Input("srcFile") srcfile: string;//必须
  @Input("autoPlay") audioplay: boolean=true;//非必须
  @Input("Title") title: string;//非必须
  audiotime="00:00";
  myaudioPlayer:any;
  stepvalue=0;
  oldstepvalue=0;
  isloading=true;
  currenttime="00:00";
  dtime=100;
  constructor() { }

  ngOnInit() {
    this.myaudioPlayer=document.getElementById('audioPlayer'); 
    // if(this.audioplay){
    //   this.playaudio();
    // }



    this.myaudioPlayer.addEventListener('loadedmetadata', ()=> {
      this.isloading=false;
      if(this.audioplay){
        this.playaudio();
      }
  }, false);

  this.myaudioPlayer.addEventListener('playing', ()=> {
    // if(this.audioplay){
    //   // this.playaudio();
    // }
}, false);

this.myaudioPlayer.addEventListener('timeupdate',  ()=> {
  this.updateProgress();
}, false);
  


  this.myaudioPlayer.addEventListener('ended', ()=> {
    this.audioEnded();
}, false);


  }



  playaudio(){
    // this.baseService.myalert(this.myaudioPlayer.duration)
    // this.myaudioPlayer.currentTime=200;
    this.dtime=this.myaudioPlayer.duration;
    this.audiotime=this.transTime(this.myaudioPlayer.duration);
    this.audioplay=true;
    this.myaudioPlayer.play();
    

  }
  audioEnded(){
    this.myaudioPlayer.currentTime=0;
    this.stepvalue=0;
    this.audioplay=false;
  }

  transTime(durationtime) {
    
    let h =durationtime/3600;
    let showttime="";
    h=parseInt(h.toString());
    durationtime %= 3600;
    var m = parseInt((durationtime / 60).toString());
    var s = parseInt((durationtime % 60).toString());
    if (h > 0) {
      showttime = this.formatTime(h + ":" + m + ":" + s);
    } else {
      showttime= this.formatTime(m + ":" + s);
    }
    return showttime;
}

updateProgress(){
   this.stepvalue = this.myaudioPlayer.currentTime;
    this.currenttime=this.transTime(this.myaudioPlayer.currentTime);
  
}

changeProgress(e){
  
   
  //  if(this.audioplay){
  //   this.myaudioPlayer.pause();
  //   this.myaudioPlayer.load();
    // this.myaudioPlayer.currentTime=e.target.value;
    // alert(parseInt(this.stepvalue.toString()))
  //   setTimeout(() => {
  //     this.myaudioPlayer.play();
  //   }, 500);
  //  }else{
  //   this.myaudioPlayer.currentTime=this.stepvalue;
  //  }


  //  this.myaudioPlayer.currentTime=0
  if(Math.abs(this.stepvalue-e.target.value)>2){
    // alert(JSON.stringify(e.detail.value))
    if(this.audioplay){
    this.myaudioPlayer.pause();
    // this.myaudioPlayer.load();
    this.myaudioPlayer.currentTime=e.target.value;
    setTimeout(() => {
          this.myaudioPlayer.play();
        }, 100);
       }else{
        this.myaudioPlayer.currentTime=e.target.value;
       }
  }
  // this.oldstepvalue=this.stepvalue;
}

formatTime(value) {
  var time = "";
  var s = value.split(':');
  var i = 0;
  for (; i < s.length - 1; i++) {
      time += s[i].length == 1 ? ("0" + s[i]) : s[i];
      time += ":";
  }
  time += s[i].length == 1 ? ("0" + s[i]) : s[i];

  return time;
}

  stopaudio(){
    this.audioplay=false;
    this.myaudioPlayer.pause();
  }

}
