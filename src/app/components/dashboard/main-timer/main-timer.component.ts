import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-timer',
  templateUrl: './main-timer.component.html',
  styleUrls: ['./main-timer.component.css']
})

export class MainTimerComponent implements OnInit {
  timerFullDate: any;
  minutes: any = 0;
  seconds: any = 0;
  timerInterval: any;
  scoreLineText: string;
  
  constructor() { }

  ngOnInit() {
    this.timerFullDate = `${this.minutes < 10 ? '0' + this.minutes :  this.minutes} :
                              ${this.seconds < 10 ? '0' + this.seconds : this.seconds}`;
  }

  startTimer() {
    if(!this.timerInterval) {
      this.timerInterval = setInterval(() => {
        this.seconds = this.seconds + 1;
        if(this.seconds === 60) {
          this.minutes = this.minutes + 1;
          this.seconds = 0;
        }
        this.timerFullDate = `${this.minutes < 10 ? '0' + this.minutes :  this.minutes} :
                                ${this.seconds < 10 ? '0' + this.seconds : this.seconds}`;
      }, 1000);
    }
  }

  stopTimer() {
    if(this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  resetTimer() {
    if(this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.minutes = 0;
    this.seconds = 0;
    this.timerFullDate = `${this.minutes < 10 ? '0' + this.minutes :  this.minutes} :
                                ${this.seconds < 10 ? '0' + this.seconds : this.seconds}`;
  }

}
