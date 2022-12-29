import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';


@Component({
  selector: 'app-total-cost',
  templateUrl: './total-cost.component.html',
  styleUrls: ['./total-cost.component.scss']
})
export class TotalCostComponent implements OnInit {
  pricePerCourse: number[]=[];
  nameCourses:string[]=[];
  employeesRenewPerCourse: number[] = [];
  totalCostPerCourse: number[] = [];
  usersDC:any;

  courses:any;
  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;

  constructor() { }

  async ngOnInit() {
    let yearNow = new Date().getFullYear();

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
    this.canvas = document.getElementById("chartNamePriceEmployee");
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

    //Get all the DC of all Users
  //Users with DataCourse list
  let fetchUsersWithDC = await fetch('http://localhost:3001/users/datacourses');
  this.usersDC = await fetchUsersWithDC.json();

  for(let user of this.usersDC){
    let year = new Date(user.DataCourse.dateExpired).getFullYear();
    let month = new Date(user.DataCourse.dateExpired).getMonth();
    let day = new Date(user.DataCourse.dateExpired).getDay();
    let dateExpired= {
      'year': year,
      'month': month,
      'day': day
    };
    user.DataCourse.dateExpired = dateExpired;

    let yearC = new Date(user.DataCourse.dateCertified).getFullYear();
    let monthC = new Date(user.DataCourse.dateCertified).getMonth();
    let dayC = new Date(user.DataCourse.dateCertified).getDay();
    
    let dateCertified = {
      'year': yearC,
      'month': monthC,
      'day': dayC
    };
    user.DataCourse.dateCertified = dateCertified;
  }

  for(let c of this.courses){
    let coun = 0;
    let nameC = c.nameCourse;
    for(let user of this.usersDC){
      //We have all the Users with each DC
      //We will run each
      if(nameC == user.DataCourse.Course.nameCourse && (Math.abs(user.DataCourse.dateExpired.year  - yearNow)) < 2){
        coun++;
      }
    }
    //Save the count of users with expireDate about to expire
    this.employeesRenewPerCourse.push(coun)
  }
  console.log(this.employeesRenewPerCourse)
  let i:number;
  for(i = 0 ; i< this.employeesRenewPerCourse.length; i++){
    this.totalCostPerCourse.push(this.employeesRenewPerCourse[i] * this.pricePerCourse[i]);
  }
  console.log(this.totalCostPerCourse)
    //CosForNextYear
    this.canvas = document.getElementById("chartCostCourse");
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
          data: this.totalCostPerCourse
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
  
}
