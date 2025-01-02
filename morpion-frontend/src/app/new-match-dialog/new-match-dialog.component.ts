import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-match-dialog',
  templateUrl: './new-match-dialog.component.html',
  styleUrl: './new-match-dialog.component.scss'
})
export class NewMatchDialogComponent {


  playerX: string = '';
  playerO: string = '';

  constructor(public dialogRef: MatDialogRef<NewMatchDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close({ playerX: this.playerX, playerO: this.playerO });
  }
}
