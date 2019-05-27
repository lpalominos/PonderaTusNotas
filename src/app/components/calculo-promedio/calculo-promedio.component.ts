import { Component, OnInit } from '@angular/core';
import { AjustesService } from 'src/app/services/ajustes.service';
import { Ajustes } from 'src/app/models/Ajustes';


@Component({
  selector: 'app-calculo-promedio',
  templateUrl: './calculo-promedio.component.html',
  styleUrls: ['./calculo-promedio.component.css']
})
export class CalculoPromedioComponent implements OnInit {
  notasPorcentajes: number[][] = [
    [, ,]
  ];

  promedio: string;
  promedioNumber: number;
  mensaje: string;
  ajustes: Ajustes;
  esPorcentajeTotal: boolean = false;
  nombreSegundoValor: string = "Porcentaje";

  seleccionCalculo: string = "ponderado";

  constructor(public ajustesService: AjustesService) {
  }

  ngOnInit() {
    this.ajustes = this.ajustesService.getAjustes();
  }

  addNotaPorcentaje(): void {
    this.notasPorcentajes.push([, ,]);
  }

  removeNotaPorcentaje(): void {
    if (this.notasPorcentajes.length > 1) {
      this.notasPorcentajes.pop();
    }
  }

  calcularPromedio(): void {
    switch (this.seleccionCalculo) {
      case 'ponderado':
        this.calculoPonderado();
        break;
      case 'simple':
        this.calculoSimple();
        break;
      case 'creditos':
        this.calculoCreditos();
        break;
    }
  }

  calculoPonderado(): void {
    let promedioTemp: number = 0.0;
    let sumaPorcentajes: number = 0.0;
    for (let i = 0; i < this.notasPorcentajes.length; i++) {
      if (this.notasPorcentajes[i][2]) {
        promedioTemp += this.notasPorcentajes[i][2];
        sumaPorcentajes += +this.notasPorcentajes[i][1];
      } else {
        this.promedio = "ERROR";
        this.promedioNumber = 0;
        this.mensaje = "Uno o más campos ingresados no son válidos, por favor asegurese que los valores señalados sean acordes a los ajustes establecidos";
        return;
      }
    }
    if (sumaPorcentajes === 100) {
      this.esPorcentajeTotal = true;
      if (this.ajustes.Aproximacion) {
        this.promedio = this.round(promedioTemp, this.ajustes.Decimales) + "";
      } else {
        this.promedio = this.floor(promedioTemp, this.ajustes.Decimales) + "";
      }

      this.promedioNumber = +this.promedio;

      if (+this.promedio >= this.ajustes.Aprobacion) {
        this.mensaje = "¡Felicidades!, has aprobado ;)";
      } else {
        if (this.ajustes.HayExamen) {
          this.mensaje = "Lo sentimos, no has logrado la nota mínima de aprobación. Pero quizás aún tengas una oportunidad en el examen final";
        } else {
          this.mensaje = "Lo sentimos, no has logrado la nota mínima de aprobación";
        }
      }
    } else if (sumaPorcentajes < 100) {
      this.esPorcentajeTotal = false;
      let promedioMomentaneo: number = promedioTemp + (this.ajustes.Minima * ((100 - sumaPorcentajes) / 100));
      if (this.ajustes.Aproximacion) {
        this.promedio = this.round(promedioMomentaneo, this.ajustes.Decimales) + "";
      } else {
        this.promedio = this.floor(promedioMomentaneo, this.ajustes.Decimales) + "";
      }

      this.promedioNumber = +this.promedio;

      if (promedioMomentaneo >= this.ajustes.Aprobacion) {
        this.mensaje = "¡Felicidades!, ya has aprobado faltando un " + (100 - sumaPorcentajes) + "%";
      } else {
        let notaNecesaria: number = (this.ajustes.Aprobacion - promedioTemp) / ((100 - sumaPorcentajes) / 100);
        if (this.ajustes.Aproximacion) {
          notaNecesaria = this.round(notaNecesaria, this.ajustes.Decimales);
        } else {
          notaNecesaria = this.floor(notaNecesaria, this.ajustes.Decimales);
        }

        if (notaNecesaria > this.ajustes.Maxima) {
          this.mensaje = "Lo sentimos, faltando un " + (100 - sumaPorcentajes) + "%, no existen posibilidades matemáticas de alcanzar el promedio mínimo de aprobación";
        } else {
          this.mensaje = "Necesitas un " + notaNecesaria + " al " + (100 - sumaPorcentajes) + "% restante para aprobar";
        }
      }

    } else {
      this.esPorcentajeTotal = false;
      this.promedio = "ERROR";
      this.promedioNumber = 0;
      this.mensaje = "Los porcentajes no pueden sumar más de 100%";
    }
  }

  calculoSimple(): void {
    let promedioTemp: number = 0.0;
    let i: number;
    for (i = 0; i < this.notasPorcentajes.length; i++) {
      if (this.notasPorcentajes[i][0]) {
        promedioTemp += +this.notasPorcentajes[i][0];
      } else {
        this.promedio = "ERROR";
        this.promedioNumber = 0;
        this.mensaje = "Uno o más campos ingresados no son válidos, por favor asegurese que los valores señalados sean acordes a los ajustes establecidos";
        return;
      }
    }

    promedioTemp = promedioTemp / i;

    if (this.ajustes.Aproximacion) {
      this.promedio = this.round(promedioTemp, this.ajustes.Decimales) + "";
    } else {
      this.promedio = this.floor(promedioTemp, this.ajustes.Decimales) + "";
    }

    this.promedioNumber = +this.promedio;

    this.mensaje = null;
  }

  calculoCreditos(): void {
    let promedioTemp: number = 0.0;
    let sumaCreditos: number = 0.0;
    for (let i = 0; i < this.notasPorcentajes.length; i++) {
      if (this.notasPorcentajes[i][2]) {
        promedioTemp = promedioTemp + (this.notasPorcentajes[i][0] * this.notasPorcentajes[i][1]);
        sumaCreditos += +this.notasPorcentajes[i][1];
      } else {
        this.promedio = "ERROR";
        this.promedioNumber = 0;
        this.mensaje = "Uno o más campos ingresados no son válidos, por favor asegurese que los valores señalados sean acordes a los ajustes establecidos";
        return;
      }
    }

    promedioTemp = promedioTemp / sumaCreditos;

    if (this.ajustes.Aproximacion) {
      this.promedio = this.round(promedioTemp, this.ajustes.Decimales) + "";
    } else {
      this.promedio = this.floor(promedioTemp, this.ajustes.Decimales) + "";
    }

    this.promedioNumber = +this.promedio;

    this.mensaje = null;

  }

  getExamen(): void {
    let promedioActual: number = +this.promedio
    let notaExamen: number;
    notaExamen = (this.ajustes.AprobacionExamen - (promedioActual * ((100 - this.ajustes.PorcentajeExamen) / 100))) / (this.ajustes.PorcentajeExamen / 100);

    if (this.ajustes.Aproximacion) {
      notaExamen = this.round(notaExamen, this.ajustes.Decimales);
    } else {
      notaExamen = this.floor(notaExamen, this.ajustes.Decimales);
    }

    if (notaExamen > this.ajustes.Maxima) {
      this.mensaje = "Lo sentimos, no hay posibilidades matemáticas de aprobar en el examen final :(";
    } else {
      this.mensaje = "Necesitas un " + notaExamen + " en el examen final para aprobar";
    }

    this.esPorcentajeTotal = false;
  }

  setNombreSegundo(selectedValue: string): void {
    this.mensaje = null;
    this.promedio = null;
    this.promedioNumber = 0;
    this.esPorcentajeTotal = false;
    switch (selectedValue) {
      case 'ponderado':
        this.nombreSegundoValor = "Porcentaje";
        break;
      case 'creditos':
        this.nombreSegundoValor = "Créditos";
        break;
    }
  }

  receiveNota($event: number, i: number): void {
    this.notasPorcentajes[i][0] = $event;
  }

  receivePorcentaje($event: number, i: number): void {
    this.notasPorcentajes[i][1] = $event;
  }

  receivePeso($event: number, i: number): void {
    this.notasPorcentajes[i][2] = $event;
  }

  round(value: number, decimals: number): number {
    return Number(Math.round(+(value + 'e' + decimals)) + 'e-' + decimals);
  }

  floor(value: number, decimals: number): number {
    return Number(Math.floor(+(value + 'e' + decimals)) + 'e-' + decimals);
  }

}
