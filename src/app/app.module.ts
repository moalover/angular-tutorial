import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListadoDeHeroesComponent } from './listado-de-heroes/listado-de-heroes.component';
import { HeroesService } from './heroes.service';
import { HeroProfileComponent } from './hero-profile/hero-profile.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ModalPollComponent } from './modal-poll/modal-poll.component';

@NgModule({
  declarations: [
    AppComponent,
    ListadoDeHeroesComponent,
    HeroProfileComponent,
    SpinnerComponent,
    ModalPollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HeroesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
