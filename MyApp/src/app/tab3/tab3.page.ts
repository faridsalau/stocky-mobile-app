import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  user: Object = {};
  hasWalmart: boolean = false;
  hasKroger: boolean = false;
  hasUnion: boolean = false;
  constructor(
    private alertController: AlertController,
    public afAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {}

  async pickShoeSize() {
    const alert = await this.alertController.create({
      header: "Pick Shoe Size",
      subHeader: "Not yet implemented",
      message:
        "The user will be able to select their shoe size out of a list of numbers",
      buttons: ["OK"],
    });

    await alert.present();
  }

  logout() {
    this.afAuth.auth
      .signOut()
      .then(() => {
        this.router.navigate([""]);
      })
      .catch(() => {
        console.log("Something went wrong, please try again");
      });
  }

  async ngOnInit() {
    let username;
    this.afAuth.auth.onAuthStateChanged((user) => {
      username = user.displayName;
    });
    const db = this.fireStore.firestore;
    // forces user state to exist
    const noData = await db.doc(`/users/${username}`).get();
    console.log(username);
    const userDoc = await db.doc(`/users/${username}`).get();
    const userData = userDoc.data();
    this.user = userData;
    if (userData.meetLocations) {
      userData.meetLocations.forEach((location) => {
        if (location === "Walmart") {
          this.hasWalmart = true;
        }
        if (location === "Kroger") {
          this.hasKroger = true;
        }
        if (location === "The Union") {
          this.hasUnion = true;
        }
      });
    }
  }
}
