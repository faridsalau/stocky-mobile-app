import { Component, OnInit } from '@angular/core';
import { AlertController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(
    private alertController: AlertController,
    public afAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router

  ) { }

    onFileSelected(event){
      console.log(event);
    }


  ngOnInit() {
  }

}
