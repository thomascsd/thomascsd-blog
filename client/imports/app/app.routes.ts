import { Meteor } from 'meteor/meteor';
import { AdminComponent } from './admin/admin.component';
import { Routes, CanActivate } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { AboutComponent } from './about/about.component';


export const routes: Routes = [
    { path: '', component: ContentComponent },
    { path: 'about', component: AboutComponent },
    { path: 'admin', component: AdminComponent }
];

export const routesPrivider = [{
    provide: '',
    useValue: () => !!Meteor.user()
}];