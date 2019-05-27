import { Injectable } from '@angular/core';
import { Ajustes } from '../models/Ajustes'

@Injectable({
  providedIn: 'root'
})
export class AjustesService {
  private ajustes: Ajustes;
  constructor() {
    this.ajustes = {
      Maxima: 7,
      Minima: 1,
      Aprobacion: 4,
      Decimales: 1,
      PorcentajeExamen: 40,
      AprobacionExamen: 4,
      IncrementoEscala: 1,
      Aproximacion: true,
      HayExamen: true
    };

    if(localStorage.getItem("ajustes")) {
      this.ajustes = JSON.parse(localStorage.getItem("ajustes"));
    } else{

      localStorage.setItem("ajustes",JSON.stringify(this.ajustes));
    }
  }

  getAjustes() {
    return this.ajustes;
  }

  setMaxima(newMaxima: number): void {
    this.ajustes.Maxima = newMaxima;
    this.updateLocalStorage();
  }

  setMinima(newMinima: number): void {
    this.ajustes.Minima = newMinima;
    this.updateLocalStorage();
  }

  setAprobacion(newAprobacion: number): void {
    this.ajustes.Aprobacion = newAprobacion;
    this.updateLocalStorage();
  }

  setDecimales(newDecimales: number): void {
    this.ajustes.Decimales = newDecimales;
    this.updateLocalStorage();
  }

  setPorcentajeExamen(newPorcentajeExamen: number): void {
    this.ajustes.PorcentajeExamen = newPorcentajeExamen;
    this.updateLocalStorage();
  }

  setAprobacionExamen(newAprobacionExamen: number): void {
    this.ajustes.AprobacionExamen = newAprobacionExamen;
    this.updateLocalStorage();
  }

  setIncrementoEscala(newIncrementoEscala: number): void {
    this.ajustes.IncrementoEscala = newIncrementoEscala;
    this.updateLocalStorage();
  }

  setAproximacion(newAproximacion: boolean): void {
    this.ajustes.Aproximacion = newAproximacion;
    this.updateLocalStorage();
  }

  setHayExamen(newHayExamen: boolean): void {
    this.ajustes.HayExamen = newHayExamen;
    this.updateLocalStorage();
  }

  updateLocalStorage(): void{
    localStorage.setItem("ajustes",JSON.stringify(this.ajustes));
  }

}
