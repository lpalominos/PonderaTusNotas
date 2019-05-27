import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  innerHeight: any;
  outerHeight: any;

  constructor() { }

  ngOnInit() {
    this.innerHeight = window.innerHeight;
    this.outerHeight = document.body.clientHeight;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerHeight = window.innerHeight;
    this.outerHeight = document.body.clientHeight;
  }

}
