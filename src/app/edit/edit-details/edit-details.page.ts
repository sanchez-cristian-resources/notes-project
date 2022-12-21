import { Component, Input, OnInit } from '@angular/core';
import { Note } from 'src/app/home/models/note.model';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.page.html',
  styleUrls: ['./edit-details.page.scss'],
})
export class EditDetailsPage implements OnInit {

  @Input() 
  note: Note 

  constructor() {
    this.note = new Note('hola', '', '', '', [], 0, 0, 0)
  }

  ngOnInit() {
  }

}
