import { Component, Input, NgModule } from '@angular/core';
import * as moment from 'moment';
import { Data } from './data';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'sample-app';
  public data2 : Data;

  public data1 : Data[];
  gridApi: any;
  rowSelection;
  gridColumnApi: any;
  constructor(){
    this.data2 = new Data();
  }

  columnDefs = [
    {headerName: "Make",field : "make",
    cellRenderer:  (data) => {
        if(data.value === 'NULL'){
            return '';
        }
        return data.value;
    }
  },
    {headerName: "Model",field : "model",
      cellRenderer: (data) => {
        if(data.value === '1'){
            return 'external';
        }else if(data.value === '0'){
            return 'internal'
        }
        return 'notdefined';
      }
    },
    {headerName: "Date",field : "date", 
    cellRenderer: (data) => {
      return moment(data.date).format('YYYY/DD/MM')
  }
  }
  ];

  rowData = [
  {make : 'Toyota', model : '1', date : '2017-07-04 13:23:55'},
  {make : 'NULL', model : '0', date : '2017-07-04 13:23:55'},
  {make : 'Porche', model : '1', date : '2017-07-04 13:23:55'}
  ];
  
  onSubmit(formData : NgForm){
    console.log(this.data2);
  }

  onRowClicked(event: any) { console.log('row', event);
      this.data2 = event.data
  }
  onCellClicked(event: any) { console.log('cell', event); }
  
  onSelectionChanged(event: any) { console.log("selection", event); }
}
