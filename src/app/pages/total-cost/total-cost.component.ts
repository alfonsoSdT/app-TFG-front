import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { first } from 'rxjs';

@Component({
  selector: 'app-total-cost',
  templateUrl: './total-cost.component.html',
  styleUrls: ['./total-cost.component.scss']
})
export class TotalCostComponent implements OnInit {
  pricePerCourse: number[]=[];
  nameCourses:string[]=[];
  
  courses:any;
  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;

  constructor() { }

  async ngOnInit() {
    let fetchCourses = await fetch('http://localhost:3001/courses/status')
    this.courses = await fetchCourses.json();
    //Get all the prices of the courses in order
    
    for( let c of this.courses ){
      this.nameCourses.push(c.nameCourse);

      let coursePricePerEmployee = c.pricePerHour * c.hoursNeeded;
      //Get the price of each course
      this.pricePerCourse.push(coursePricePerEmployee);
    }

    this.chartColor = "#FFFFFF";
    this.canvas = document.getElementById("chartEmail");
    this.ctx = this.canvas.getContext("2d");

    this.chartEmail = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: this.nameCourses,
        datasets: [{
          label: "Emails",
          pointRadius: 0,
          pointHoverRadius: 0,
          backgroundColor: [
            '#e3e3e3',
            '#4acccd',
            '#fcc468',
            '#ef8157',
            '#000000'
          ],
          borderWidth: 0,
          data: this.pricePerCourse
        }]
      },
      options: {
        legend: {
          display: true
        },
        pieceLabel: {
          render: 'percentage',
          fontColor: ['white'],
          precision: 2
        },
        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              display: false
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "transparent",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent"
            },
            ticks: {
              display: false,
            }
          }]
        },
      }
    });
    

  }
  async getAllThePricesOfCourses(){
  }
}
