import { Component, OnInit } from '@angular/core';
import { Note } from '../models/note.model';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  notes: Note[]
  constructor(
    private notesService: NotesService
  ) { 
    this.notes = []
  }
  
  ngOnInit() {    
    this.notesService
      .getNotes()
      .subscribe(notes => {
        this.notes = notes
      })
  }

}
