import {Component, OnInit} from '@angular/core';

import 'leaflet';
import 'leaflet.heat';
import 'leaflet-sidebar';
import {Http} from "@angular/http";
import {MapService} from "../../services/map.service";
import {GeocodingService} from "../../services/geocoding.service";
import {StravaService} from "../../services/strava.service";
import {Activity} from "../../models/activity";
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

  mymap;
  private layersControl;
  private siderBarContent;

  constructor(private mapService: MapService,
              private geocoder: GeocodingService,
              private stravaService: StravaService,
              private http: Http) {
  }

  ngOnInit(): void {

    this.map = L.map("map", {
      zoomControl: false,
      center: L.latLng(40.731253, -73.996139),
      zoom: 12,
      minZoom: 4,
      maxZoom: 19
    });

    L.control.zoom({position: "topright"}).addTo(this.map);
    //L.control.layers(this.mapService.baseMaps).addTo(this.map);
    L.control.scale().addTo(this.map);


    var tl = this.mapService.baseMaps.CartoDB_DarkMatter;
    this.layersControl = new L.Control.Layers(null, null).addTo(this.map);
    this.layersControl.addBaseLayer(tl, 'Dark Map');
    tl.addTo(this.map);


    var sidebar = L.control.sidebar('sidebar', {
      closeButton: true,
      position: 'left'
    });


    this.siderBarContent = "<h3>Last 30 runs: </h3>";
    sidebar.setContent(this.siderBarContent);


    this.map.addControl(sidebar);
    setTimeout(function () {
      sidebar.show();
    }, 500);


    //this.mapService.map = this.map;
    this.geocoder.getCurrentLocation()
      .subscribe(
        location => this.map.panTo([location.latitude, location.longitude]),
        err => console.error(err)
      );


    this.http.get('assets/model/myjsonfile.json')
      .subscribe(res => {
        this.showHeatmap(res.json(), 'ciccio', 'blue');
      });


    this.http.get('assets/model/myjsonfile1.json')
      .subscribe(res => {
        this.showHeatmap(res.json(), 'blascone', 'red');
      });


    this.stravaService.getUserActivities().subscribe(
      activities => {
        activities.map(activity => {
          this.stravaService.getActivityStream(activity).subscribe(streams => {
            this.siderBarContent += activity.name + ": " + streams[0].data.length + " points </br>";
            sidebar.setContent(this.siderBarContent);
          });
        });
      }
    );

  }


  showHeatmap(json, name, color) {

    var heat = L.heatLayer(json, {radius: 10});
    var races = L.featureGroup();
    var lastLatLng;
    var currentRacePoints = [];
    var count = 0;
    var map = this.map;

    // each point
    json.map(function (p) {
      var latLng = L.latLng(p); // get latLng

      if (lastLatLng && map.distance(latLng, lastLatLng) > 100) {
        // distance > 100 meters: new race
        L.polyline(currentRacePoints, {weight: 1, opacity: 0.4, color: color}).addTo(races);
        currentRacePoints = [];

        count++;
      } else {
        currentRacePoints.push(p);
      }

      lastLatLng = latLng;
    });

    L.polyline(currentRacePoints, {weight: 1, opacity: 0.4, color: color}).addTo(races); // last race


    this.layersControl.addOverlay(races, 'Races ' + name);

    this.layersControl.addOverlay(heat, 'Heatmap ' + name);

    //bootbox.alert(count + ' races found for ' + name);


  }


}
