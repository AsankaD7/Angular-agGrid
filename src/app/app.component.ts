import { Component, Input, NgModule } from '@angular/core';
import * as moment from 'moment';
import { Data } from './data';
import { NgForm } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { Observable } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'sample-app';
  public data2: Data;

  /* file upload */
  fileToUpload: File = null;

  public data1: Data[];
  gridApi: any;
  rowSelection;
  gridColumnApi: any;
  constructor(private httpClient: HttpClient) {
    this.data2 = new Data();
  }

  columnDefs = [
    {
      headerName: "Make", field: "make",
      cellRenderer: (data) => {
        if (data.value === 'NULL') {
          return '';
        }
        return data.value;
      }
    },
    {
      headerName: "Model", field: "model",
      cellRenderer: (data) => {
        if (data.value === '1') {
          return 'external';
        } else if (data.value === '0') {
          return 'internal'
        }
        return 'notdefined';
      }
    },
    {
      headerName: "Date", field: "date",
      cellRenderer: (data) => {
        return moment(data.date).format('YYYY/DD/MM')
      }
    }
  ];

  rowData = [
    { make: 'Toyota', model: '1', date: '2017-07-04 13:23:55' },
    { make: 'NULL', model: '0', date: '2017-07-04 13:23:55' },
    { make: 'Porche', model: '1', date: '2017-07-04 13:23:55' }
  ];

  onSubmit(formData: NgForm) {
    console.log(formData);
    console.log(formData.value);
  }

  onRowClicked(event: any) {
    console.log('row', event);
    this.data2 = event.data
  }
  onCellClicked(event: any) { console.log('cell', event); }

  onSelectionChanged(event: any) { console.log("selection", event); }

  logChange(data) {
    console.log(data);
  }


  /* file import funtion call */
  handleFileInput(event) {
    this.fileToUpload = event.target.files[0];
    let file = event.target.files[0].name;
    var ds = (new Date()).toISOString().replace(/[^0-9]/g, "");
    let a = file.split('.').slice()[0] + ds +'.'+ file.split('.').slice()[1];
    console.log(a);
  }


  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'text/plain;charset=UTF-8'
    })
  }


  /* upload funtion */
  uploadFileToServer(){
    console.log(this.fileToUpload);
    if (this.fileToUpload !== null) {

      let file = new Blob([""], {type: "application/csv"});

      const endpoint = 'http://localhost:8080/upload';
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload, this.fileToUpload.name);
      this.httpClient.post(endpoint, formData, { observe: 'response' })
        .subscribe((response) => {
          console.log(response.statusText);

          if(response.status == 200){
             document.getElementById("button").click();
          }
        }
        );
    }

  }

}
