import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  title = 'weather-app';
  constructor(private updateds: SwUpdate, private snackbar: MatSnackBar ){}
  ngOnInit(): void {
   this.updateds.versionUpdates.pipe(
    filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
    switchMap(()=> this.snackbar.open('A new version is available!', 'Update now').afterDismissed()),
    filter(result=> result.dismissedByAction),
    map(()=> this.updateds.activateUpdate().then(()=> location.reload()))
   ).subscribe();
  }
}
