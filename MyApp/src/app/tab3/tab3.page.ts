import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

interface User {
  shoeSize?: number;
  username?: string;
}
@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  user: User = {};
  hasWalmart: boolean = false;
  hasKroger: boolean = false;
  hasUnion: boolean = false;
  show: boolean = false;
  resetEmail: string = "";
  constructor(
    private alertController: AlertController,
    public afAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {}

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

  sendReset() {
    const auth = this.afAuth.auth;
    auth
      .sendPasswordResetEmail(this.resetEmail)
      .then(() => {
        console.log("Email sent");
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          console.log("No account associated with this email has been found.");
        } else if (err.code === "auth/too-many-requests") {
          console.log(
            "Too many requests for this email have been detected, please try again later."
          );
        } else {
          console.log("Something went wrong, please try again.");
        }
      });
  }

  toggleShow() {
    this.show = !this.show;
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
