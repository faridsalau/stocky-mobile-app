import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  requests: Array<Object> = [];
  constructor(
    private alertController: AlertController,
    public afAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {}

  async showRequest() {
    const alert = await this.alertController.create({
      header: "Shoe Request",
      subHeader: "Not yet implemented",
      message:
        "This will show a request for the users shoe. This request will show the other users available meetup locations, the shoe size, and the shoes they are willing to trade for",
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
    let shoeSet = new Set();
    this.afAuth.auth.onAuthStateChanged((u) => {
      username = u.displayName;
    });
    const db = this.fireStore.firestore;
    // forces user state to exist
    const noData = await db.doc(`/users/${username}`).get();
    console.log(username);
    const ref = await db.collection("/trade_requests");
    const fromUser = await ref.where("fromUsername", "==", username).get();
    const toUser = await ref.where("toUsername", "==", username).get();

    if (fromUser) {
      fromUser.forEach((shoe) => {
        let shoeData = shoe.data();
        shoeData.fromCurrentUser = true;
        shoeSet.add(shoeData);
      });
    }

    if (toUser) {
      toUser.forEach((shoe) => {
        let shoeData = shoe.data();
        shoeData.fromCurrentUser = false;
        shoeSet.add(shoeData);
      });
    }
    for (let shoe of shoeSet.values()) {
      this.requests.push(shoe);
    }
    console.log(shoeSet);
  }
}
