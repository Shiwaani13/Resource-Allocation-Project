import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { results } from '../dmsearch/search.model';


@Component({
  selector: 'app-dmsearch',
  templateUrl: './dmsearch.component.html',
  styleUrls: ['./dmsearch.component.css']
})



export class DmsearchComponent implements OnInit {

  mData: any;
  results: results[];


  constructor(private http: HttpClient) {
  }

  async ngOnInit() {
    try {
      this.mData = await this.http.get('http://127.0.0.1:3000/api/search').toPromise();
      this.results = this.mData.results;
    } catch (error) {
               console.log(error);
    }
    
  }
}
