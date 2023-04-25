import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TogyebuComponent } from "./togyebu.component";

const routes: Routes = [
    {
        path: 'togyebu',
        component:TogyebuComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TogyebuRoutingModule {}