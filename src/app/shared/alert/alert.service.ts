import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackbarService: MatSnackBar) {}

  showMessage(message: string): void {
    this.snackbarService.open(message);
  }

  showSuccess(message: string): void {
    this.snackbarService.open(message, 'Close', {
      panelClass: 'success',
      duration: 2000
    });
  }

  showError(message: string): void {
    this.snackbarService.open(message, 'Close', {
      panelClass: 'error',
      duration: 0
    });
  }
}
