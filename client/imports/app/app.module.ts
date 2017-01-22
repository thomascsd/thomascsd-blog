import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import { AppComponent } from "./app.component";
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostComponent } from './post/post.component';
import { AdminComponent } from './admin/admin.component';
import { routes } from './app.routes';
import { LoginComponent } from './Login/Login.component';
import { LoggedInGuardService } from './services/LoggedInGuard.service';
import { PostlistComponent } from './postlist/postlist.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    FooterComponent,
    ContentComponent,
    AboutComponent,
    NavbarComponent,
    PostComponent,
    AdminComponent,
    LoginComponent,
    PostlistComponent,
    HeaderComponent
],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
    LoggedInGuardService
  ],
  // Modules
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AccountsModule,
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
