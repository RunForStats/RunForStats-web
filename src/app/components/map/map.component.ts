import {Component, OnInit} from '@angular/core';

import 'leaflet';
import 'leaflet.heat';
import 'leaflet-sidebar';
import {Http} from "@angular/http";
import {MapService} from "../../services/map.service";
import {GeocodingService} from "../../services/geocoding.service";
import {StravaService} from "../../services/strava.service";
import {Activity} from "../../models/activity";
import {forEach} from "@angular/router/src/utils/collection";
// Add this line to remove typescript errors
declare var L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title = 'app';
  map;


  private layersControl;
  private siderBarContent;
  private heat = L.heatLayer([], {radius: 10});
  private totalCoordinates= [];
  private totalLines= [];
  private cartoDb: L.TileLayer;


  constructor(private mapService: MapService,
              private geocoder: GeocodingService,
              private stravaService: StravaService,
              private http: Http) {
  }

  ngOnInit(): void {

    this.map = L.map("map", {
      zoomControl: false,
      center: L.latLng(41.90278349999999, 12.496365500000024),
      zoom: 12,
      minZoom: 4,
      maxZoom: 19
    });

    L.control.zoom({position: "topright"}).addTo(this.map);
    //L.control.layers(this.mapService.baseMaps).addTo(this.map);
    L.control.scale().addTo(this.map);


    this.cartoDb = this.mapService.baseMaps.CartoDB_DarkMatter;
    this.layersControl = new L.Control.Layers(null, null).addTo(this.map);
    this.layersControl.addBaseLayer(this.cartoDb, 'Last 30 runs');
    this.cartoDb.addTo(this.map);


    var sidebar = L.control.sidebar('sidebar', {
      closeButton: true,
      position: 'left'
    });


    this.siderBarContent = "<h3>Last 30 runs:</h3>";
    sidebar.setContent(this.siderBarContent);

    // for the moment I am disabling the slidepanel
    //this.map.addControl(sidebar);
    // setTimeout(function () {
    //   sidebar.show();
    // }, 500);



    // this.geocoder.getCurrentLocation()
    //   .subscribe(
    //     location => this.map.panTo([location.latitude, location.longitude]),
    //     err => console.error(err)
    //   );


    // this.http.get('assets/model/myjsonfile.json')
    //   .subscribe(res => {
    //     this.showHeatmap(res.json(), 'ciccio', 'blue');
    //   });
    //
    //
    // this.http.get('assets/model/myjsonfile1.json')
    //   .subscribe(res => {
    //     this.showHeatmap(res.json(), 'blascone', 'red');
    //   });

    this.layersControl.addOverlay(this.heat, 'Heatmap ' + name);





    this.stravaService.getUserActivities().subscribe(
      activities => {
        activities.map(activity => {
          this.stravaService.getActivityStream(activity).subscribe(streams => {
            this.siderBarContent += activity.name + ": " + streams[0].data.length + " points </br>";
            sidebar.setContent(this.siderBarContent);

            this.showHeatmap(streams[0].data, activity.name, 'green');

          });
        });
      }
    );

  }


  showHeatmap(json, name, color) {


    // remove all layers
    var map = this.map;
    this.map.eachLayer(function (layer) {
      map.removeLayer(layer);
    });



    var races = L.featureGroup();
    var currentRacePoints = [];


    // each point
    json.map(function (p) {
      var latLng = L.latLng(p); // get latLng

      if(latLng == null){
        console.error('Latitude and Longitude must not be null');
      } else if(isNaN(latLng.lat) || isNaN(latLng.lng)) {
        console.error('Latitude and Longitude must be valid. lat='+latLng.lat+', lng='+latLng.lng);
      } else {
        currentRacePoints.push(latLng);
      }
    });


    this.totalCoordinates = this.totalCoordinates.concat(currentRacePoints);


    var currentLine = L.polyline(currentRacePoints, {weight: 1, opacity: 0.4, color: color});
    this.totalLines.push(currentLine);
    this.layersControl.addOverlay(currentLine, 'Races ' + name);
    this.totalLines.forEach(function(line){
      line.addTo(races);
    });
    races.addTo(this.map);

    this.layersControl.removeLayer(this.heat);
    this.heat = L.heatLayer(this.totalCoordinates, {radius: 10});
    this.layersControl.addOverlay(this.heat, 'Heatmap');

    this.heat.addTo(this.map);
    this.cartoDb.addTo(this.map);
  }


}
