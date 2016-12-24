import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostComponent } from './post/post.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    FooterComponent,
    ContentComponent,
    AboutComponent,
    NavbarComponent,
    PostComponent,
    AdminComponent
],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
    
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
