import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [


  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },


  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'e404',
    loadChildren: () => import('./pages/e404/e404.module').then(m => m.E404PageModule)
  },
  {
    path: 'contatos',
    loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsPageModule)
  },


  {
    path: 'usuarios/todos',
    loadChildren: () => import('./users/listusers/listusers.module').then(m => m.ListusersPageModule)
  },


  {
    path: 'usuarios/usuario/:id',
    loadChildren: () => import('./users/user/user.module').then(m => m.UserPageModule)
  },


  {
    path: 'usuarios/criar',
    loadChildren: () => import('./users/create/create.module').then(m => m.CreatePageModule)
  },


  {
    path: 'usuarios/editar/:id',
    loadChildren: () => import('./users/edit/edit.module').then(m => m.EditPageModule)
  },


  {
    path: 'dev/status',
    loadChildren: () => import('./device/status/status.module').then(m => m.StatusPageModule)
  },


  {
    path: 'dev/camera',
    loadChildren: () => import('./device/camera/camera.module').then(m => m.CameraPageModule)
  },


  {
    path: 'dev/gps',
    loadChildren: () => import('./device/geolocation/geolocation.module').then(m => m.GeolocationPageModule)
  },


  {
    path: '**',
    loadChildren: () => import('./pages/e404/e404.module').then(m => m.E404PageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
