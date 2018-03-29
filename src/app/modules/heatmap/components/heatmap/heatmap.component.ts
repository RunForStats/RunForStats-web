import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {latLng, LatLng, tileLayer, circle, polygon} from 'leaflet';

import * as L from 'leaflet';
import 'leaflet.heat';


@Component({
  selector: 'heatmap',
  templateUrl: 'heatmap.component.html',
  styleUrls: ['heatmap.component.css']
})
export class HeatmapComponent implements OnInit {

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
    map.addControl(L.control.zoom({position: 'topright'}));

    this.http.get('https://mockactivities-jblcwvxsel.now.sh/myjsonfile.json')
      .subscribe(res => {
        this.showHeatmap(map, res, 'ciccio', 'blue');
      });


    this.http.get('https://mockactivities-jblcwvxsel.now.sh/myjsonfile1.json')
      .subscribe(res => {
        this.showHeatmap(map, res, 'blascone', 'red');
      });

  }

  constructor(private http: HttpClient) {
  }


  ngOnInit(): void {
    console.log('ngOnInit');


  }


  showHeatmap(map: L.Map, json, name, color) {


    const totalLines = [];
    let totalCoordinates = [];

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


    totalCoordinates = totalCoordinates.concat(currentRacePoints);
    const currentLine = L.polyline(currentRacePoints, {weight: 1, opacity: 0.4, color: color});
    totalLines.push(currentLine);
    this.layersControl.overlays['Races ' + name] = currentLine;
    totalLines.forEach(function (line) {
      line.addTo(races);
    });

    const heat = L.heatLayer(totalCoordinates, {radius: 10});

    const racesOverlayName = 'Races ' + name;
    const heatmapOverlayName = 'Heatmap ' + name;

    this.layersControl.overlays[racesOverlayName] = races;
    this.layersControl.overlays[heatmapOverlayName] = heat;
  }


}
