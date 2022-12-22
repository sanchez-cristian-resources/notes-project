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
                      this.router.navigate(['/places/tabs/discover']);
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

}
