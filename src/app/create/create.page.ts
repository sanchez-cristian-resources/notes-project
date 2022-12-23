import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Note } from '../home/models/note.model';
import { NotesService } from '../home/services/notes.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  constructor(
    private notesServices: NotesService, 
    private alertCtrl: AlertController,
  ) { }

  ngOnInit() {
  }

  create() {
    const title = (<HTMLInputElement>document.querySelector('#title-create')).value; 
    const author = (<HTMLInputElement>document.querySelector('#author-create')).value; 
    const content = (<HTMLInputElement>document.querySelector('#content-create')).value;   
    
    if (title === '' || title[0].toUpperCase() !== title[0]) {
        this.alertCtrl
          .create({
            header: 'Title is empty or is invalid',
            message: 'Please enter a valid title. Capitalized and not empty',
            buttons: [
              {
                text: 'Okay',
              }
            ]
          })
          .then(alertEl => {
            alertEl.present();
          });

          return
    }

    if (author === '' || author[0].toUpperCase() !== author[0]) {
        this.alertCtrl
          .create({
            header: 'Author is empty or is invalid',
            message: 'Please enter a valid author. Capitalized and not empty',
            buttons: [
              {
                text: 'Okay',
              }
            ]
          })
          .then(alertEl => {
            alertEl.present();
          });

          return
    }

    if (content.length < 3) {
      this.alertCtrl
        .create({
          header: 'Content is too short',
          message: 'Please enter a valid content. At least 3 characters long',
          buttons: [
            {
              text: 'Okay',
            }
          ]
        })
        .then(alertEl => {
          alertEl.present();
        });

        return
    }

    const note = new Note(
      null,
      author,
      title,
      content,
      ['Common'],
      content.length,
      Date.now(),
      Date.now()
    )

    this.notesServices
      .addNote(note)
      .subscribe(() => {
        window.location.pathname = '/app/notes';
      });

  }
}
