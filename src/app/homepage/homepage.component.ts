import { Component, ElementRef, OnInit } from '@angular/core';
import * as D3 from 'd3/index';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  host: any;
  svg: any;
  constructor(private _element: ElementRef) {
    this.host = D3.select(this._element.nativeElement);
  }

  ngOnInit() {
    this.buildSVG();
  }

  buildSVG() {
    this.host.html('');
    this.svg = this.host.append('svg')
    .attr('width', '600')
    .attr('height', '400')
    .style('background-color', 'blue');
  }
}
