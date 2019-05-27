import { Component, OnInit, ViewChild } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AjustesService } from '../../services/ajustes.service';
import { Ajustes } from '../../models/Ajustes';
import { from } from 'rxjs';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isCollapsed: boolean = true;
  ajustes: Ajustes;
  menorMinima: boolean = false;

  @ViewChild('maxima') maxima: NgModel;
  @ViewChild('minima') minima: NgModel;
  @ViewChild('aprobacion') aprobacion: NgModel;
  @ViewChild('aprobacionExamen') aprobacionExamen: NgModel;
  @ViewChild('pExamen') pExamen: NgModel;

  constructor(public ajustesService: AjustesService) { }

  ngOnInit() {
    this.ajustes = this.ajustesService.getAjustes();
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  getCurrentModel(): number {
    return this.ajustes.Decimales;
  }

  setMaxima(newMaxima: number): void {
    let patt = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
    if (patt.test(newMaxima + "")) {
      if (newMaxima < this.ajustes.Minima) {
        this.maxima.control.setErrors({ 'menorMinima': true });
      } else if (newMaxima < this.ajustes.Aprobacion) {
        this.maxima.control.setErrors({ 'menorAprobacion': true });
      } else {
        this.ajustes.Maxima = newMaxima;
        this.ajustesService.setMaxima(newMaxima);
      }
    }
  }

  setMinima(newMinima: number): void {
    let patt = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
    if (patt.test(newMinima + "")) {
      if (newMinima > this.ajustes.Maxima) {
        this.minima.control.setErrors({ 'mayorMaxima': true });
      } else if (newMinima > this.ajustes.Aprobacion) {
        this.minima.control.setErrors({ 'mayorAprobacion': true });
      } else {
        this.ajustes.Minima = newMinima;
        this.ajustesService.setMinima(newMinima);
      }
    }
  }

  setAprobacion(newAprobacion: number): void {
    let patt = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
    if (patt.test(newAprobacion + "")) {
      if (newAprobacion > this.ajustes.Maxima) {
        this.aprobacion.control.setErrors({ 'mayorMaxima': true });
      } else if (newAprobacion < this.ajustes.Minima) {
        this.aprobacion.control.setErrors({ 'menorMinima': true });
      } else {
        this.ajustes.Aprobacion = newAprobacion;
        this.ajustesService.setAprobacion(newAprobacion);
      }
    }
  }

  setPorcentajeExamen(newPorcentajeExamen: number): void {
    let patt = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
    if (patt.test(newPorcentajeExamen + "")) {
      if(newPorcentajeExamen > 100){
        this.pExamen.control.setErrors({'mayorPorcentaje': true});
      } else {
      this.ajustes.PorcentajeExamen = newPorcentajeExamen;
      this.ajustesService.setPorcentajeExamen(newPorcentajeExamen);
      }
    }
  }

  setAprobacionExamen(newAprobacionExamen: number): void {
    let patt = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
    if (patt.test(newAprobacionExamen + "")) {
      if (newAprobacionExamen > this.ajustes.Maxima) {
        this.aprobacionExamen.control.setErrors({ 'mayorMaxima': true });
      } else if (newAprobacionExamen < this.ajustes.Minima) {
        this.aprobacionExamen.control.setErrors({ 'menorMinima': true });
      } else {
        this.ajustes.AprobacionExamen = newAprobacionExamen;
        this.ajustesService.setAprobacionExamen(newAprobacionExamen);
      }
    }
  }

  setDecimales(newDecimales: number): void {
    this.ajustes.Decimales = newDecimales;
    this.ajustesService.setDecimales(newDecimales);
  }

  setIncremento(newincremento: number): void {
    this.ajustes.IncrementoEscala = newincremento;
    this.ajustesService.setIncrementoEscala(newincremento);
  }

  setAproximacion(newAproximacion: boolean): void {
    this.ajustes.Aproximacion = newAproximacion;
    this.ajustesService.setAproximacion(newAproximacion);
  }

  setHayExamen(newHayExamen: boolean): void {
    this.ajustes.HayExamen = newHayExamen;
    this.ajustesService.setHayExamen(newHayExamen);
  }

}
