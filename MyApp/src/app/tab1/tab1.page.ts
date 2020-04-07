import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  tradeableShoes: Array<object> = [];
  userShoes: Array<object> = [];
  constructor(
    private alertController: AlertController,
    public afAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {}

  async createTrade() {
    const alert = await this.alertController.create({
      header: "Create trade",
      subHeader: "Not yet implemented",
      message:
        "This will create a request for the users shoe. This will show the other users available meetup locations, the shoe size, and the shoes they are willing to trade for",
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
    const ref = await db.collection("user_shoes");
    const query = await ref.orderBy("createdAt", "desc");
    const allShoes = await query.get();
    if (username) {
      allShoes.forEach((shoe) => {
        const shoeData = shoe.data();
        shoeData.shoeId = shoe.id;
        console.log(shoeData);
        if (shoe.data().username !== username) {
          this.tradeableShoes.push(shoeData);
        } else {
          this.userShoes.push(shoeData);
        }
      });
    }
  }
}
