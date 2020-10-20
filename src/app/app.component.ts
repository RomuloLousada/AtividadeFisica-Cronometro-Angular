import { Component } from '@angular/core';
import { Exercise } from './exercise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  configVisible: boolean = false;
  timerVisible: boolean = true;
  exercises: Exercise[] = [
    {
      name: "Abdominal",
      duration: 30,
      repetition: 3,
      preparation: 15,
      rest: 15
    }
  ];

  toggleComponent(): void {
    this.configVisible = !this.configVisible;
    this.timerVisible = !this.timerVisible;
  }
}
