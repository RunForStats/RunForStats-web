import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { GeocodingService } from '../../services/geocoding.service';

import { Router, ActivatedRoute } from '@angular/router';
import { latLng, LatLng, tileLayer, circle, polygon } from 'leaflet';



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
    overlays: {
      'Big Circle': circle([41.902, 12.4963], { radius: 5000 }),
      'Big Square': polygon([[46.8, -121.55], [46.9, -121.55], [46.9, -121.7], [46.8, -121.7]])
    }
  }

  options = {
    layers: this.baseLayers.CartoDB_DarkMatter,
    center: latLng(41.90278349999999, 12.496365500000024),
    zoom: 12,
    minZoom: 4,
    maxZoom: 19
  };

  constructor(private mapService: MapService, private geocoder: GeocodingService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    console.log('ngOnInit');


  }





  // showHeatmap(json, name, color) {

  //   var heat = L.heatLayer(json, { radius: 10 });
  //   var races = L.featureGroup();
  //   var lastLatLng;
  //   var currentRacePoints = [];
  //   var count = 0;
  //   var map = this.map;

  //   // each point
  //   json.map(function (p) {
  //     var latLng = L.latLng(p); // get latLng
  //     if (lastLatLng && map.distance(latLng, lastLatLng) > 100) {
  //       // distance > 100 meters: new race
  //       L.polyline(currentRacePoints, { weight: 1, opacity: 0.4, color: color }).addTo(races);
  //       currentRacePoints = [];
  //       count++;
  //     } else {
  //       currentRacePoints.push(p);
  //     }
  //     lastLatLng = latLng;
  //   });
  //   L.polyline(currentRacePoints, { weight: 1, opacity: 0.4, color: color }).addTo(races);
  //   this.layersControl.addOverlay(races, 'Races ' + name);
  //   this.layersControl.addOverlay(heat, 'Heatmap ' + name);
  // }


}
