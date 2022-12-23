import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/home/models/note.model';
import { NotesService } from 'src/app/home/services/notes.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.page.html',
  styleUrls: ['./edit-details.page.scss'],
})
export class EditDetailsPage implements OnInit {
  note: Note
  private noteSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private notesService: NotesService,
    private alertCtrl: AlertController,
    private router: Router,
  ) {
    this.note = new Note('', '', '', '', [], 0, 0, 0)
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.navCtrl.navigateBack('/app/notes');
        return;
      }
      
      this.noteSub = this.notesService
        .getNote(paramMap.get('id'))
        .subscribe(note => {
            this.note = note;
          },
          error => {
            this.alertCtrl
              .create({
                header: 'An error ocurred!',
                message: 'Could not load place.',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['/app/notes']);
                    }
                  }
                ]
              })
              .then(alertEl => alertEl.present());
          }
        );
    });
  }

  ngOnDestroy() {
    if (this.noteSub) {
      this.noteSub.unsubscribe();
    }
  }

  deleteNote() {
    this.notesService
        .delete(this.note.id)
        .subscribe(() => {
            window.location.pathname = '/app/notes'
        }
    );
  }

  updateNote() {
    const title = (<HTMLInputElement>document.querySelector('#title')).value
    const author = (<HTMLInputElement>document.querySelector('#author')).value
    const content = (<HTMLInputElement>document.querySelector('#content')).value
    
    const newNote = {
        ...this.note,
        title: title,
        author: author,
        content: content,
        lastEditAt: new Date().getTime()
    }

    console.log(newNote, newNote.author)

    this.notesService
        .updateNote(this.note.id, newNote)
        .subscribe((note) => {
            console.log(note)
            const button = document.querySelector('#save')
            button.innerHTML = 'Saved'
            window.location.pathname = '/app/notes'
        }
    );
  }

}
