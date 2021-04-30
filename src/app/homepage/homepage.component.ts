import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private _element: ElementRef) {
    
  }

  ngOnInit() {
  }

}
