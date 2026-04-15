import { Component } from '@angular/core';
import { CardUIComponent } from 'src/app/components/UI/card-ui/card-ui.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { ModalityComponent } from 'src/app/shared/components/modality/modality.component';
import { StringsNamesUrl } from 'src/app/shared/constants/strings-url/strings-names';
import { processString } from 'src/app/shared/utils/convert-urls';
import { cModalities } from 'src/app/shared/constants/modalities.constant';
import { NgFor } from '@angular/common';
import { MatTabGroup, MatTab } from '@angular/material/tabs';

@Component({
  selector: 'app-modalities',
  standalone: true,
  imports: [
    CardUIComponent,
    BreadcrumbComponent,
    ModalityComponent,
    NgFor,
    MatTabGroup,
    MatTab,
  ],
  templateUrl: './modalities.component.html',
  styleUrl: './modalities.component.css',
})
export class ModalitiesComponent {
  title: string = 'Modalidades';
  link = `/${processString(StringsNamesUrl.fundamentoLibras)}`;
  modalities = cModalities;
}
