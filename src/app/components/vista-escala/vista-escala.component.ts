import { Component, OnInit, Input } from '@angular/core';
import { EscalaNotas } from 'src/app/models/EscalaNotas';
import { AjustesService } from 'src/app/services/ajustes.service';
import { Ajustes } from 'src/app/models/Ajustes';

@Component({
  selector: 'app-vista-escala',
  templateUrl: './vista-escala.component.html',
  styleUrls: ['./vista-escala.component.css']
})
export class VistaEscalaComponent implements OnInit {
  @Input() escalaNotas: EscalaNotas[];
  ajustes: Ajustes;

  constructor(public ajustesService: AjustesService) { }

  ngOnInit() {
    this.ajustes = this.ajustesService.getAjustes();
  }

  counter(i: number) {
    return new Array(this.ceil(i,0));
  }

  ceil(value: number, decimals: number): number {
    return Number(Math.ceil(+(value + 'e' + decimals)) + 'e-' + decimals);
  }

}
