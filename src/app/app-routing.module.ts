import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoDeHeroesComponent } from './listado-de-heroes/listado-de-heroes.component';
import { HeroProfileComponent } from './hero-profile/hero-profile.component';

const routes: Routes = [
  { path: 'listado-heroes', component: ListadoDeHeroesComponent},
  { path: 'heroe/:id', component: HeroProfileComponent},
  { path: '**', redirectTo: '/listado-heroes'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
