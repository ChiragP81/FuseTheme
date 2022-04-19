import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
@Injectable()
export class PwaService {
    constructor(private swUpdate: SwUpdate) {
        if (this.swUpdate.isEnabled) {
            this.swUpdate.available.subscribe(next => {
                if (confirm('New version available. Load New Version?')) {
                    window.location.reload();
                }
            });
        }
    }
}
