import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Note } from '../../models/note.model';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {

  @Input() 
  note: Note;
    
  constructor(
    private router: Router, 
    private notesService: NotesService
  ) {
    this.note = new Note('', '', '', '', [], 0, 0, 0)
  }

  ngOnInit() {}

  addItem() {
    const result = this.notesService.addNote() 

    result.subscribe(res => {
        console.log(res)
    })
  }

  editItem() {
    this.router.navigate(['/edit-note', this.note.id])
  }
}
