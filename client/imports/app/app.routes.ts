import { LoginComponent } from './Login/Login.component';
import { AdminComponent } from './admin/admin.component';
import { Routes, CanActivate } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { AboutComponent } from './about/about.component';
import { LoggedInGuardService } from './services/LoggedInGuard.service';


export const routes: Routes = [
    { path: '', component: ContentComponent },
    { path: 'about', component: AboutComponent },
    { path: 'admin', component: AdminComponent, canActivate: [LoggedInGuardService] },
    { path: 'login', component: LoginComponent }
];

