import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ExploreContainerComponentModule } from "../explore-container/explore-container.module";
// import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from "./tab4.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // Tab4PageRoutingModule
    RouterModule.forChild([{ path: "", component: Tab4Page }]),
    ExploreContainerComponentModule,
  ],
  declarations: [Tab4Page],
})
export class Tab4PageModule {}
