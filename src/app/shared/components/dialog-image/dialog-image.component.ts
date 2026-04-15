import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef } from 'src/app/shared/cdk/dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/shared/cdk/dialog/dialog-tokens';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';

@Component({
  selector: 'app-dialog-image',
  standalone: true,
  imports: [CommonModule, BootstrapIconsModule],
  templateUrl: './dialog-image.component.html',
  styleUrl: './dialog-image.component.css',
})
export class DialogImageComponent {
  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: { image: string; title?: string }
  ) {}

  close() {
    this.dialogRef.close();
  }
}
