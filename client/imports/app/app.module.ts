import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { AppComponent } from "./app.component";
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostComponent } from './post/post.component';
import { AdminComponent } from './admin/admin.component';
import { routes } from './app.routes';

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
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  // Main Component
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {

  }
}
