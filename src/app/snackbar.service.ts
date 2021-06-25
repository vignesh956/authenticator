import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(public snackBar: MatSnackBar) {}
  openSnackBar(message: string) { 
    this.openSnackBarWithAction(message, 'Close');
  }

  openSnackBarWithAction(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
      
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
}
