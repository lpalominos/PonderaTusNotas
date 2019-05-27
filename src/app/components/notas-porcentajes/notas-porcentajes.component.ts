import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AjustesService } from 'src/app/services/ajustes.service';
import { Ajustes } from 'src/app/models/Ajustes';

@Component({
  selector: 'app-notas-porcentajes',
  templateUrl: './notas-porcentajes.component.html',
  styleUrls: ['./notas-porcentajes.component.css']
})
export class NotasPorcentajesComponent implements OnInit {
  @Input() idNP: number;
  @Input() seleccionCalculo: string;
  nota: number;
  porcentaje: number;
  peso: number;

  @Output() notaEvent = new EventEmitter<number>();
  @Output() porcentajeEvent = new EventEmitter<number>();
  @Output() pesoEvent = new EventEmitter<number>();

  @ViewChild('inputNota') inputNota: NgModel;
  @ViewChild('inputPorcentaje') inputPorcentaje: NgModel;

  ajustes: Ajustes;

  errorNota: boolean = true;
  errorPorcentaje: boolean = true;

  constructor(public ajustesService: AjustesService) {
  }

  ngOnInit() {
    this.ajustes = this.ajustesService.getAjustes();
  }

  getPeso(): number {
    if (!this.errorNota && !this.errorPorcentaje) {
      this.peso = this.nota * (this.porcentaje / 100);
      return this.peso;
    } else {
      return null;
    }
  }

  getPorcentaje(): number {
    if (this.porcentaje) {
      return this.porcentaje;
    } else {
      return 0;
    }
  }

  setNota(newValue: number): void {
    let patt = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
    if (patt.test(newValue + "")) {
      if (newValue > this.ajustes.Maxima || newValue < this.ajustes.Minima) {
        this.inputNota.control.setErrors({ 'outOfBorders': true });
        this.notaEvent.emit(null);
        this.errorNota = true
      } else {
        this.nota = newValue;
        this.notaEvent.emit(this.nota);
        this.errorNota = false;
      }
    } else {
      this.errorNota = true;
    }
    
    this.pesoEvent.emit(this.getPeso());
  }

  setPorcentaje(newValue: number): void {
    let patt = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
    if (patt.test(newValue + "")) {
      if (newValue > 100) {
        this.inputPorcentaje.control.setErrors({ 'outOfBorders': true });
        this.porcentajeEvent.emit(null);
        this.errorPorcentaje = true;
      } else {
        this.porcentaje = newValue;
        this.porcentajeEvent.emit(this.porcentaje);
        this.errorPorcentaje = false;
      }
    } else {
      this.porcentajeEvent.emit(null);
      this.errorPorcentaje = true;
    }
    
    this.pesoEvent.emit(this.getPeso());
  }

}
