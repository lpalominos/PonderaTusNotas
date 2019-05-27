import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculoPromedioComponent } from './components/calculo-promedio/calculo-promedio.component';
import { CalculoEscalaComponent } from './components/calculo-escala/calculo-escala.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'promedio', component: CalculoPromedioComponent},
  {path: 'escala', component: CalculoEscalaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
