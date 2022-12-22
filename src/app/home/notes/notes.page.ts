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
  variableNotes: Note[]
  
  constructor(
    private notesService: NotesService
  ) { 
    this.notes = this.resfreshNotes()
    this.variableNotes = []
  }
  
  ngOnInit() { 
    console.log('ngOnInit')   
    this.notesService
      .getNotes()
      .subscribe(notes => {
        this.notes = notes
        this.variableNotes = [...notes]
      })
  }

  resfreshNotes() {
    console.log('refresh will enter')
    let notes = []
    this.notesService
      .getNotes()
      .subscribe(sNotes => {
        notes = sNotes
      })

    return notes
  }

  update(value: any) {
    console.log(value.target.value)
    if(value.target.value.length <= 0) {
        this.notesService
            .getNotes()
            .subscribe(notes => {
                this.notes = notes
            })

        return 
    }

    const tempNotes = this.notes.map(note => {
      if (note.title.toLowerCase().includes(value.target.value.toLowerCase())) {
        return note
      } 

      return null
    })

    this.variableNotes = tempNotes.filter(note => note !== null)
  }
}
