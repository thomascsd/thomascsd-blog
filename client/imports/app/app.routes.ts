import { Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    { path: '', component: ContentComponent },
    { path: 'about', component: AboutComponent }
];