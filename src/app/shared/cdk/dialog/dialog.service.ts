import { ComponentType, Overlay } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable, Injector } from "@angular/core";
import { DialogRef } from "./dialog-ref";
import { DIALOG_DATA } from "./dialog-tokens";
import { DialogConfig } from "../interfaces/dialog-config.interface";

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  open<T>(component: ComponentType<T>, config?: DialogConfig): DialogRef {
    // Globally centered position strategy
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    // Create the overlay with customizable options
    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel',
    });

    // Create dialogRef to return
    const dialogRef = new DialogRef(overlayRef);

    // Close on backdrop click unless disableClose is true
    if (!config?.disableClose) {
      overlayRef.backdropClick().subscribe(() => {
        dialogRef.close();
      });
    }

    // Create injector to be able to reference the DialogRef from within the component
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: config?.data },
      ],
    });

    // Attach component portal to the overlay
    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);

    return dialogRef;
  }
}
