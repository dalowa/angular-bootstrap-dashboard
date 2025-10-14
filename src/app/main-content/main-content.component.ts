import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var Chart: any;

@Component({
  selector: 'app-main-content',
  imports: [],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initChart();
    }
  }

  private initChart(): void {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    
    if (ctx && typeof Chart !== 'undefined') {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
          ],
          datasets: [{
            data: [
              15339,
              21345,
              18483,
              24003,
              23489,
              24092,
              12034
            ],
            lineTension: 0,
            backgroundColor: 'transparent',
            borderColor: '#007bff',
            borderWidth: 4,
            pointBackgroundColor: '#007bff'
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              boxPadding: 3
            }
          }
        }
      });
    }
  }
}
