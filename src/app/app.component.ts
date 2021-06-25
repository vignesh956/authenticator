import { Component, Input } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarService } from './snackbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';
  opened = false;

  constructor(
    public snackBar: MatSnackBar,
    private snackbarService: SnackbarService,
  ) {}

  @Input() name: string | undefined;

  openSnackBar() {
      this.snackbarService.openSnackBar('Test!!');
  }
  togglesidebar(){
    this.opened=!this.opened;
  }
}
