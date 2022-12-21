import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/note.model';
import { tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes: Note[]

  constructor(
    private http: HttpClient
  ) { 
    this.notes = []
  }

  getNotes() {
    return this.http
      .get<Note[]>('https://notes-57739-default-rtdb.europe-west1.firebasedatabase.app/notes.json')
      .pipe(
        map(resData => {
          const notes: Note[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              notes.push(
                new Note(
                  resData[key].id,
                  resData[key].author,
                  resData[key].title,
                  resData[key].content,
                  resData[key].tags,
                  resData[key].length,
                  resData[key].createdAt,
                  resData[key].lastEditAt
                )
              );
            }
          }
          return notes;
        })
      )
  }

  addNote( note: Note ) {
    return this.http
      .post<Note>(
        'https://notes-57739-default-rtdb.europe-west1.firebasedatabase.app/nuevas.json', 
        {...note}    
      )
  }

  getNote(id: string) {
    return this.http
      .get<Note>(
        `https://https://notes-57739-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}.json`
      )
      .pipe(
        map(note => {
          return new Note(
            id,
            note.author,
            note.title,
            note.content,
            note.tags,
            note.length,
            note.createdAt,
            note.lastEditAt
          );
        })
      );
  }

  updateNote(id: string) {
    return this.http
      .put<Note>(
        `https://https://notes-57739-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}.json`, 

      )
  }
}
