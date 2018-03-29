import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {latLng, LatLng, tileLayer, circle, polygon} from 'leaflet';

import * as L from 'leaflet';
import 'leaflet.heat';
import {StravaService} from '../../../../services/strava.service';


@Component({
  selector: 'heatmap',
  templateUrl: 'heatmap.component.html',
  styleUrls: ['heatmap.component.css']
})
export class HeatmapComponent implements OnInit {


  map;
  totalLines = [];
  totalCoordinates = [];

  baseLayers = {
    'OpenStreetMap': tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '...'
    }),
    'Esri': tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '...'
    }),
    'CartoDB_DarkMatter': tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
      attribution: '...',
      maxZoom: 19
    })
  };


  layersControl = {
    baseLayers: this.baseLayers,
    overlays: []
  };

  options = {
    layers: this.baseLayers.CartoDB_DarkMatter,
    center: latLng(41.90278349999999, 12.496365500000024),
    zoom: 12,
    minZoom: 4,
    maxZoom: 19,
    zoomControl: false,
  };


  mapReady(map: L.Map) {

    this.map = map;

    this.map.addControl(L.control.zoom({position: 'topright'}));

    // MOCKUP ACTIVITIES
    //
    // this.http.get('https://mockactivities-jblcwvxsel.now.sh/myjsonfile.json')
    //   .subscribe(res => {
    //     this.showHeatmap(map, res, 'ciccio', 'blue');
    //   });
    //
    //
    // this.http.get('https://mockactivities-jblcwvxsel.now.sh/myjsonfile1.json')
    //   .subscribe(res => {
    //     this.showHeatmap(map, res, 'blascone', 'red');
    //   });

  }

  constructor(private stravaService: StravaService, private http: HttpClient) {
  }


  ngOnInit(): void {
    console.log('ngOnInit');



    this.stravaService.getUserActivities().subscribe(
      activities => {
        activities.map(activity => {
          this.stravaService.getActivityStream(activity).subscribe(streams => {
            //this.siderBarContent += activity.name + ": " + streams[0].data.length + " points </br>";
            //sidebar.setContent(this.siderBarContent);

           this.showHeatmap(this.map,streams[0].data, activity.name, 'green');

          });
        });
      }
    );
  }


  showHeatmap(map: L.Map, json, name, color) {

    const races = L.featureGroup();
    const currentRacePoints = [];

    // each point
    json.map(function (p) {
      const latLng = L.latLng(p); // get latLng
      if (latLng == null) {
        console.error('Latitude and Longitude must not be null');
      } else if (isNaN(latLng.lat) || isNaN(latLng.lng)) {
        console.error('Latitude and Longitude must be valid. lat=' + latLng.lat + ', lng=' + latLng.lng);
      } else {
        currentRacePoints.push(latLng);
      }
    });


    this.totalCoordinates = this.totalCoordinates.concat(currentRacePoints);
    const currentLine = L.polyline(currentRacePoints, {weight: 1, opacity: 0.4, color: color});
    this.totalLines.push(currentLine);

    this.totalLines.forEach(function (line) {
      line.addTo(races);
    });

    const heat = L.heatLayer(this.totalCoordinates, {radius: 10});

    const racesOverlayName = 'Run ' + name;
    const totalOverlayName = 'Total runs';
    const heatmapOverlayName = 'Heatmap';

    this.layersControl.overlays[racesOverlayName] = currentLine;
    this.layersControl.overlays[totalOverlayName] = races;
    this.layersControl.overlays[heatmapOverlayName] = heat;
  }


}
