import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() visible: boolean;
  @Input() exercises: Exercise[] = [];

  interval;
  currentExercise: number;
  currentRepetition: number;
  currentPhase: number;
  timeLeft: number;

  ngOnInit() {
    this.restart();
  }

  ngOnDestroy() {
    this.pause();
  }

  phaseName(name: number) {
    switch(name) {
      case 0:
        return "Preparação";
      break;
      case 1:
        return "Exercício";
      break;
      case 2:
        return "Descanso";
      break;
    }
  }

  start() {
    if (this.interval == undefined) {
      this.interval = setInterval(() => {
        if (this.timeLeft > 0.1) {
          this.timeLeft = this.timeLeft - 0.1
        } else {
          this.next()
        }
      }, 100);
    }
  }

  pause() {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  restart() {
    this.currentExercise = 0;
    this.currentRepetition = 0;
    this.currentPhase = 0;
    this.timeLeft = this.getPhaseTime();
  }

  next() {
    if (this.currentPhase < 2) {
      this.currentPhase++;
    } else if (this.currentRepetition < this.exercises[this.currentExercise].repetition - 1) {
      this.currentRepetition++;
      this.currentPhase = 1;
    } else if (this.currentExercise < this.exercises.length - 1) {
      this.currentExercise++;
      this.currentRepetition = 0;
      this.currentPhase = 0;
    } else {
      return;
    }

    this.timeLeft = this.getPhaseTime();
  }

  getPhaseTime() {
    switch(this.currentPhase) {
      case 0:
        return this.exercises[this.currentExercise].preparation;
      break;
      case 1:
        return this.exercises[this.currentExercise].duration;
      break;
      case 2:
        return this.exercises[this.currentExercise].rest;
      break;
    }
  }
}
