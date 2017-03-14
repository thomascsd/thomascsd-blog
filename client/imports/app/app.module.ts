import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from "./app.component";
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostComponent } from './post/post.component';
import { AdminComponent } from './admin/admin.component';
import { PostlistComponent } from './postlist/postlist.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './Login/Login.component';
import { MarkdownPipe } from './pipes/markdown/markdown.pipe';
import { routes } from './app.routes';
import { LoggedInGuardService } from './services/LoggedInGuard.service';
import { MarkdownService } from './pipes/markdown/markdown.service';


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
    LoginComponent,
    PostlistComponent,
    HeaderComponent,
    MarkdownPipe
  ],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
    LoggedInGuardService,
    MarkdownService
  ],
  // Modules
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  // Main Component
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {

  }
}
