import { Component } from '@angular/core';
import { Weather } from '../weather';
import { WeatherService } from '../weather.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-weather',
  standalone: false,
  
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {

  
   today = new Date();

// // Get the year, month, and day
//  year = this.today.getFullYear();
//  month = (this.today.getMonth() + 1).toString().padStart(2, '0');  // Months are 0-based, so add 1
//  day = this.today.getDate().toString().padStart(2, '0');  // Pad single digit days with 0

// // Format the date as YYYY-MM-DD
formattedDate = this.today.toLocaleDateString('en-IN');

  weather: Weather | undefined;
  city = 'Mumbai';

  onClick(){
    this.search(this.city);
  }
  constructor(private weatherServive: WeatherService){}

  search(city: string){
    this.weatherServive.getWeather(city).subscribe(weather=> this.weather = weather);
  }

}
