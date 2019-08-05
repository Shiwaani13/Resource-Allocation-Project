import { Component, OnInit } from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';


const URL = 'http://localhost:3000/api/upload';
 
@Component({
 selector: 'app-adminpage',
 templateUrl: './adminpage.component.html',
 styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
    
 
 constructor() {
   
 }
 public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'file'});
 
 
 ngOnInit() {
 this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
 this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
 console.log('FileUpload:uploaded:', item, status, response);
 alert('File uploaded successfully');
}
 };

}
