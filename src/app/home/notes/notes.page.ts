import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  notes: string[]
  constructor() { 
    this.notes = ['Note 1', 'Note 2', 'Note 3']
  }

  ngOnInit() {
  }

}
