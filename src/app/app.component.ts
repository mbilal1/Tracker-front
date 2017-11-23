import "reflect-metadata";
import "zone.js"
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { FetchCoordinates } from './fetchcoordinates';

@Component({
  selector: 'app-root',
  providers: [FetchCoordinates],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Google maps app';
  public coordinates: Observable<any>;
  
  constructor(private http: HttpClient, private fetchCoordinates: FetchCoordinates){

    //this.http.get('trb.herokuapp.com/').subscribe(data => {
      //console.log("DATA RECIEVED: " + data);
    //});

  }
  
  mapCenterLat: number = 33.602448 ;
  mapCenterLng: number = 73.023064;

  lat:number = 0.0000;
  lng:number = 0.0000;
  markers = [];
  latestlat: number;  
  latestlng: number;
  startlat: number;
  startlng: number;
  results: string[];
  
  ngOnInit(){
    setInterval(() => {
    this.coordinates = this.fetchCoordinates.getCoordinates();
    this.coordinates.subscribe(data => {
      var latlng = data.split(" ", 2);
      this.lat = parseFloat(latlng[0]);
      this.lng = parseFloat(latlng[1]);

  //    this.markers.push ({
  //        lat: this.lat,
  //        lng: this.lng
  //    });

      //Snap to road request

      this.http.get('https://roads.googleapis.com/v1/snapToRoads?interpolate=true&path=' + this.latestlat + ',' + this.latestlng + '|' + this.lat + ',' + this.lng + '&interpolate=true&key=AIzaSyBW2sDZ3WW7tPB16f3PpwlxGMJqnfnwwic')
      .subscribe(data => {
        for (var i = 0; i < data['snappedPoints'].length; i++) {
        //  console.log (data['snappedPoints'][i].location.latitude);
        //  console.log (data['snappedPoints'][i].location.longitude);

          if  (data['snappedPoints'][i].location.latitude && data['snappedPoints'][i].location.longitude != undefined) {
          this.markers.push ({
            lat: data['snappedPoints'][i].location.latitude,
            lng: data['snappedPoints'][i].location.longitude
        });
      }
        }

        this.latestlat = data['snappedPoints'][data['snappedPoints'].length-1].location.latitude;
        this.latestlng = data['snappedPoints'][data['snappedPoints'].length-1].location.longitude;
      });
    

     // console.log(this.http.request);
      this.latestlat = this.lat;
      this.latestlng = this. lng
      console.log(this.lat,this.lng);
    })
  }, 4000);
  }

}
