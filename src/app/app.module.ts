import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CalculoPromedioComponent } from './components/calculo-promedio/calculo-promedio.component';
import { CalculoEscalaComponent } from './components/calculo-escala/calculo-escala.component';

import { ModalModule } from 'ngx-bootstrap/modal';

import { HeaderComponent } from './components/header/header.component';
import { NotasPorcentajesComponent } from './components/notas-porcentajes/notas-porcentajes.component';

import { AjustesService} from './services/ajustes.service';
import { FooterComponent } from './components/footer/footer.component';
import { PromocionComponent } from './components/promocion/promocion.component';
import { VistaEscalaComponent } from './components/vista-escala/vista-escala.component';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculoPromedioComponent,
    CalculoEscalaComponent,
    HeaderComponent,
    NotasPorcentajesComponent,
    FooterComponent,
    PromocionComponent,
    VistaEscalaComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [
    AjustesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
