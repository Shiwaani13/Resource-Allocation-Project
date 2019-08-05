import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import {HttpClientModule} from '@angular/common/http';
import { results } from '../dmsearch/search.model';
interface MyObj {
  resource_id: string
  resource_name: string
  role: string
  portfolio: string
  status_type: string
  project_name: string
  current_DM: string
}

let obj;

@Component({
  selector: 'app-searchtable',
  templateUrl: './searchtable.component.html',
  styleUrls: ['./searchtable.component.css']
})
export class SearchtableComponent implements OnInit {
  title = 'app';

  

  constructor(private http: HttpClient) {

  }
  mData: any;
  results: results[];

  async ngOnInit() {
    try {
      this.mData = await this.http.get('http://127.0.0.1:3000/api/search').toPromise();
      this.results = this.mData.results;
    } catch (error) {

    }
  }
}

  




