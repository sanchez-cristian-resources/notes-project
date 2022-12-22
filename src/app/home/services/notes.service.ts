import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Note } from '../models/note.model';
import { tap, map, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private _notes = new BehaviorSubject<Note[]>([]);

  get notes() {
    return this._notes.asObservable();
  }

  constructor(
    private http: HttpClient
  ) { }

  getNotes() {
    return this.http
      .get<{ [key: string]: Note }>(
        'https://notes-57739-default-rtdb.europe-west1.firebasedatabase.app/notes.json'
      )
      .pipe(
        map(resData => {
          const notes = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              notes.push(
                new Note(
                  key,
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
        }),
        tap(notes => {
          this._notes.next(notes);
        })
      );
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
        `https://notes-57739-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}.json`, 
      )
      .pipe(
        map(notesData => {
          return new Note(
            id,
            notesData.author,
            notesData.title,
            notesData.content,
            notesData.tags,
            notesData.createdAt,
            notesData.lastEditAt,
            notesData.length
          );
        })
      );
  }

  delete(id: string) {
    return this.http
      .delete(
        `https://notes-57739-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}.json`
      )
  }
}
