import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { RouterOutlet } from '@angular/router';
import { ClerkService } from 'ngx-clerk';
import { environment } from 'src/environments/environment';
import { ptBR } from '@clerk/localizations';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet>`,
    standalone: true,
    imports: [RouterOutlet],
})
export class AppComponent {
  constructor(
    private swUpdate: SwUpdate,
    private clerkService: ClerkService
  ) {
    this.clerkService.__init({
      publishableKey: environment.clerkPublishableKey,
      localization: ptBR as any
    });

    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
      setInterval(() => {
        this.swUpdate.checkForUpdate();
      }, 300000); // 5 minutos
    }
  }
}
