import { Component, OnInit, ElementRef, Input } from '@angular/core';
import * as D3 from 'd3/index';

export interface ITweets {
  tweets: ITweet[];
}

export interface ITweet {
  statuses_counts: any;
  following_counts: any;
  followers_counts: any;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
  errorMessage: string;
  host: any;
  svg: any;
  streamContainer: any;
  data: any[];
  htmlElement: HTMLElement;
  margin: any;
  height: number;
  width: number;
  xAxis: any;
  yAxis: any;
  xScale: any ;
  yScale: any ;
  zScale: any ;
  twitterState: ITweets;

  constructor(private _element: ElementRef) {
    this.host = D3.select(this._element.nativeElement);

    const tweets = Array.from(Array(120).keys()).map(() => {
      return {
        followers_counts: Math.floor(Math.random() * 80),
        following_counts: Math.floor(Math.random() * 80),
        statuses_counts: Math.floor(Math.random() * 230)
      };
    });

    this.twitterState = { tweets };
  }

  ngOnInit() {
    this.streamContainer = this.host.append('div');
    this.setup();
    this.buildSVG();
    this.populate();
    this.drawXAxis();
    this.drawYAxis();
  }

  setup() {
    this.margin = {
      top: 15,
      right: 50,
      bottom: 40,
      left: 50
    };
    this.width = document.querySelector('#scatterplot').clientWidth - this.margin.left - this.margin.right;
    this.height = this.width * 0.6 - this.margin.bottom - this.margin.top;
    this.xScale = D3.scaleLinear().range([0, this.width]);
    this.yScale = D3.scaleLinear().range([this.height, 0]);
    this.zScale = D3.scaleLinear().range([2, 15]);
  }

  buildSVG(): void{
    this.host.html('');
    this.svg = this.host.append('svg')
    .attr('width', this.width + this.margin.left + this.margin.right)
    .attr('height', this.height + this.margin.top + this.margin.bottom)
    .style('background-color', 'white')
    .append('g')
    .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
  }

  drawXAxis() {
    this.xAxis = D3.axisBottom(this.xScale)
      .ticks(5)
      .tickPadding(15);
    this.svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(this.xAxis)
      .append('text')
        .attr('class', 'label')
        .attr('x', this.width)
        .attr('y', -6)
        .style('text-anchor', 'end')
        .style('fill', 'grey')
        .text('Followers');
  }

  drawYAxis() {
    this.yAxis = D3.axisLeft(this.yScale)
      .ticks(5)
      .tickPadding(10);
    this.svg.append('g')
      .attr('class', 'y axis')
      .call(this.yAxis)
      .append('text')
        .attr('class', 'label')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .style('fill', 'grey')
        .text('Following');
  }

  getMaxX() {
    let followers_counts = [];
    if(this.twitterState.tweets) {
      this.twitterState.tweets.forEach(tweet => {
        followers_counts.push(tweet.followers_counts);
      });
      return D3.max(followers_counts);
    }
  }

  getMaxY() {
    let following_counts = [];
    if (this.twitterState.tweets) {
      this.twitterState.tweets.forEach(tweet => {
        following_counts.push(tweet.following_counts);
      });

      return D3.max(following_counts);
    }
  }

  getMaxZ() {
    let statuses_counts = [];
    if (this.twitterState.tweets) {
      this.twitterState.tweets.forEach(tweet => {
        statuses_counts.push(tweet.statuses_counts);
      });

      return D3.max(statuses_counts);
    }
  }

  populate() {
    if (this.twitterState.tweets) {
      this.twitterState.tweets.forEach( () => {
        this.xScale.domain([0, this.getMaxX()]);
        this.yScale.domain([0, this.getMaxY()]);
        this.zScale.domain([0, this.getMaxZ()]);
      });

      this.svg.selectAll('.dot')
        .data(this.twitterState.tweets)
        .enter().append('circle')
          .attr('class', 'dot')
          .attr('r', (d) => this.zScale(d.statuses_counts))
          .attr('cx', (d) => this.xScale(d.followers_counts))
          .attr('cy', (d) => this.yScale(d.following_counts))
          .style('fill', 'blue')
          .style('opacity', 0.4);
    }
  }
}
