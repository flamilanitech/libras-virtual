import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { DialogService } from 'src/app/shared/cdk/dialog/dialog.service';
import { DialogImageComponent } from '../dialog-image/dialog-image.component';

@Component({
  selector: 'app-modality',
  standalone: true,
  imports: [NgIf, BootstrapIconsModule],
  templateUrl: './modality.component.html',
  styleUrl: './modality.component.css'
})
export class ModalityComponent {
  @Input() modality: any;

  constructor(private dialogService: DialogService) {}

  openZoom() {
    this.dialogService.open(DialogImageComponent, {
      data: {
        image: this.modality.image,
        title: this.modality.title
      }
    });
  }
}
