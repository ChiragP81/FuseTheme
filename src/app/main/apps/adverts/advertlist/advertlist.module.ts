import { NgModule } from '@angular/core';

import { MatButtonModule, MatIconModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';
import { AdvertlistComponent } from './advertlist.component';
import { AdvertlistRoutingModule } from './advertlist-routing.module';
import { AdvertListService } from './advertlist.service';
import { GridModule  } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material';

@NgModule({
    declarations: [AdvertlistComponent],
    imports: [
        AdvertlistRoutingModule,
        GridModule,
        MatButtonModule,
        MatIconModule,
        FuseSharedModule,
        DropDownsModule,

        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatOptionModule

    ],
    providers: [AdvertListService]
})
export class AdvertlistModule {}
