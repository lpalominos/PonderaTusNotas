import { Component, OnInit } from '@angular/core';
import { AjustesService } from 'src/app/services/ajustes.service';
import { Ajustes } from 'src/app/models/Ajustes';
import { EscalaNotas } from 'src/app/models/EscalaNotas';

@Component({
  selector: 'app-calculo-escala',
  templateUrl: './calculo-escala.component.html',
  styleUrls: ['./calculo-escala.component.css']
})
export class CalculoEscalaComponent implements OnInit {

  resultado: string;
  resultadoNumber: number;
  mensaje: string;

  ptsObtenido: number;
  ptsTotal: number;
  ptsBase: number = 0;
  ptsExigencia: number;

  ptsObtenidoInvalido: boolean = true;
  ptsTotalInvalido: boolean = true;
  ptsBaseInvalido: boolean = false;
  ptsExigenciaInvalido: boolean = true;

  escalaNotas: EscalaNotas[] = [];

  ajustes: Ajustes;

  constructor(public ajustesService: AjustesService) { }

  ngOnInit() {
    this.ajustes = this.ajustesService.getAjustes();
  }

  calcularNota(): void {
    if (!this.ptsObtenidoInvalido && !this.ptsTotalInvalido && !this.ptsBaseInvalido && !this.ptsExigenciaInvalido) {
      if (+this.ptsBase <= +this.ptsObtenido && +this.ptsObtenido <= +this.ptsTotal) {
        let rango: number = this.ptsTotal - this.ptsBase;
        let obtenidoRango: number = this.ptsObtenido - this.ptsBase;
        let pivote: number = rango * (this.ptsExigencia / 100);

        let resultadoTemp: number;

        if (this.ajustes.Aproximacion) {
          pivote = this.round(pivote, 0);
        } else {
          pivote = this.floor(pivote, 0);
        }

        if (obtenidoRango > pivote) {
          resultadoTemp = (((obtenidoRango - pivote) * ((+this.ajustes.Maxima) - (+this.ajustes.Aprobacion))) / (rango - pivote)) + (+this.ajustes.Aprobacion);

          if (this.ajustes.Aproximacion) {
            this.resultado = this.round(resultadoTemp, this.ajustes.Decimales) + "";
          } else {
            this.resultado = this.floor(resultadoTemp, this.ajustes.Decimales) + "";
          }

          this.resultadoNumber = +this.resultado;

        } else if (obtenidoRango < pivote) {
          resultadoTemp = ((obtenidoRango * ((+this.ajustes.Aprobacion) - (+this.ajustes.Minima))) / pivote) + (+this.ajustes.Minima);

          if (this.ajustes.Aproximacion) {
            this.resultado = this.round(resultadoTemp, this.ajustes.Decimales) + "";
          } else {
            this.resultado = this.floor(resultadoTemp, this.ajustes.Decimales) + "";
          }

          this.resultadoNumber = +this.resultado;

        } else {
          this.resultado = this.ajustes.Aprobacion + "";
          this.resultadoNumber = 0;
        }

        this.mensaje = "Calificación obtenida de acuerdo al puntaje obtenido señalado";
      } else {
        this.resultado = "ERROR";
        this.resultadoNumber = 0;
        this.mensaje = "El puntaje obtenido se encuentra fuera de los rangos establecidos, asegurese que su valor se encuentre entre el puntaje base y el puntaje total";
      }
    } else {
      this.resultado = "ERROR";
      this.resultadoNumber = 0;
      this.mensaje = "Uno o más campos se encuentran vacíos o no cumplen con los formatos establecidos para un número entero o decimal";
    }
  }

  calcularEscala(target: HTMLElement){
    if (!this.ptsTotalInvalido && !this.ptsBaseInvalido && !this.ptsExigenciaInvalido) {
      if (+this.ptsBase <= +this.ptsTotal) {
        let rango: number = +this.ptsTotal - +this.ptsBase;
        let pivote: number = rango * (+this.ptsExigencia / 100);
        let incremento: number = +this.ajustes.IncrementoEscala;
        let notaTemp: number;

        if (this.ajustes.Aproximacion) {
          pivote = this.round(pivote, 0);
        } else {
          pivote = this.floor(pivote, 0);
        }

        this.escalaNotas = [];

        for(let i: number = 0; i < pivote; i+= incremento){
          notaTemp = ((i * ((+this.ajustes.Aprobacion) - (+this.ajustes.Minima))) / pivote) + (+this.ajustes.Minima);

          if (this.ajustes.Aproximacion) {
            this.escalaNotas.push({puntaje: (i + +this.ptsBase),nota: this.round(notaTemp, this.ajustes.Decimales)});
          } else {
            this.escalaNotas.push({puntaje: (i + +this.ptsBase),nota: this.floor(notaTemp, this.ajustes.Decimales)});
          }

        }

        for(let i: number = pivote; i <= rango; i+= incremento){
          notaTemp = (((i - pivote) * ((+this.ajustes.Maxima) - (+this.ajustes.Aprobacion))) / (rango - pivote)) + (+this.ajustes.Aprobacion);

          if (this.ajustes.Aproximacion) {
            this.escalaNotas.push({puntaje: (i + +this.ptsBase),nota: this.round(notaTemp, this.ajustes.Decimales)});
          } else {
            this.escalaNotas.push({puntaje: (i + +this.ptsBase),nota: this.floor(notaTemp, this.ajustes.Decimales)});
          }

        }

        setTimeout(() => target.scrollIntoView(),400);

      } else {
        alert("Error, el puntaje mínimo es mayor al maximo");
      }
    } else {
      alert("Uno o más campos se encuentran vacíos o no cumplen con los formatos establecidos para un número entero o decimal");
    }
  }

  setPtsObtenido(newValue: number): void {
    let patt = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
    if (patt.test(newValue + "")) {
      this.ptsObtenido = newValue;
      this.ptsObtenidoInvalido = false;
    } else {
      this.ptsObtenidoInvalido = true;
    }
  }

  setPtsTotal(newValue: number): void {
    let patt = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
    if (patt.test(newValue + "")) {
      this.ptsTotal = newValue;
      this.ptsTotalInvalido = false;
    } else {
      this.ptsTotalInvalido = true;
    }
  }

  setPtsBase(newValue: number): void {
    let patt = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
    if (patt.test(newValue + "")) {
      this.ptsBase = newValue;
      this.ptsBaseInvalido = false;
    } else {
      this.ptsBaseInvalido = true;
    }
  }

  setPtsExigencia(newValue: number): void {
    let patt = new RegExp(/^[0-9]+(\.[0-9]+)?$/);
    if (patt.test(newValue + "")) {
      this.ptsExigencia = newValue;
      this.ptsExigenciaInvalido = false;
    } else {
      this.ptsExigenciaInvalido = true;
    }
  }

  round(value: number, decimals: number): number {
    return Number(Math.round(+(value + 'e' + decimals)) + 'e-' + decimals);
  }

  floor(value: number, decimals: number): number {
    return Number(Math.floor(+(value + 'e' + decimals)) + 'e-' + decimals);
  }

}
