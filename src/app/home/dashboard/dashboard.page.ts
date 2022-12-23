import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { timeStamp } from 'console';
import { Note } from '../models/note.model';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  notes: Note[]
  authors: string[]
  note: Note

  constructor(
    private navController: NavController,
    private notesService: NotesService,
  ) {
    this.notes = []
    this.authors = []
    this.note = new Note('', '', '', '', [], 0, 0, 0)
   }

  ngOnInit() {
    this.notesService.getNotes().subscribe((notes) => {
      this.notes = notes
      
      this.notes.forEach((note) => {
        if(!this.authors.includes(note.author)) {
          this.authors.push(note.author)
        }
      })

      this.note = this.notes[this.notes.length - 1]
    })


  }

  goLatest() {
    this.navController.navigateForward('/edit/' + this.note.id)
  }
}
