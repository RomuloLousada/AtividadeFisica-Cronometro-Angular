import { Injectable } from '@angular/core';
import { Exercise } from './exercise';

@Injectable({
    providedIn: 'root'
})

export class TimerService {
    exercises: Exercise[] = [{
        name: "Abdominal",
        duration: 30,
        repetition: 3,
        preparation: 15,
        rest: 20
    }];

    currentExercise: number;
    currentRepetition: number;
    currentPhase: number;
    timeLeft: number;

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

    public decreaseTimeLeft() {
        if (this.timeLeft > 0.1) {
            this.timeLeft = this.timeLeft - 0.1
        } else {
            this.next()
        }
    }
  
    private getPhaseTime() {
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

    addExercise(exercise: Exercise) {
        this.exercises.push(this.exercise);
    };

    removeExercise(i: number) {
        his.exercises.splice(i, 1);
    }
}