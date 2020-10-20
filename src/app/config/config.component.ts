import { ThrowStmt } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import { Exercise } from '../exercise'


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent {
  @Input() visible: boolean;
  @Input() exercises: Exercise[] = [];

  error: string = '';

  exercise: Exercise = {
    name: "",
    duration: 30,
    repetition: 3,
    preparation: 15,
    rest: 20
  };

  inputs: object[] = [
    {label: "Exercício", type: "text", name: "name", model: this.exercise.name },
    {label: "Duração", type: "number", name: "duration", model: this.exercise.duration },
    {label: "Repetição", type: "number", name: "repetition", model: this.exercise.repetition },
    {label: "Preparação", type: "number", name: "preparation", model: this.exercise.preparation },
    {label: "Descanso", type: "number", name: "rest", model: this.exercise.rest }
  ];

  nameToLabel(name) {
    let arr = {
      "name": "Nome",
      "duration": "Duração",
      "repetition": "Repetição",
      "preparation": "Preparação",
      "rest": "Descanso",
    };

    return arr[name];
  }

  setExerciseValues() {
    for (let input of this.inputs) {
      this.exercise[input.name] = input.model;
    }
  }

  addExercise() {
    this.setExerciseValues();

    if (this.checkEmptyFields()) {
      this.exercises.push(this.exercise);
      this.exercise = {...this.exercise};
    } else {
      alert(this.error);
      this.error = "";
    }
  };

  checkEmptyFields(): boolean {
    for (let exercise in this.exercise) {
      switch (exercise) {
        case "name":
          if (this.exercise[exercise].length === 0) {
            const label: string = this.nameToLabel(exercise);
            this.error = `O campo '${label}' deve ser preenchido`;
            return false;
          }
        break;

        default:
          if (this.exercise[exercise] <= 0) {
            const label: string = this.nameToLabel(exercise);
            this.error = `O tempo do campo '${label}' deve ser maior que 0`;
            return false;
          }
        break;
      }
    }

    return true;
  };

  removeExercise(i: number) {
    this.exercises.splice(i, 1);
  }
}
