import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { DemoComponent } from "./demo/demo.component";
import { DemoDataService } from "./demo/demo-data.service";
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { NavibarComponent } from './navibar/navibar.component';

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    DemoComponent,
    FooterComponent,
    ContentComponent,
    NavibarComponent
  ],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
    DemoDataService
  ],
  // Modules
  imports: [
    BrowserModule
  ],
  // Main Component
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {

  }
}
