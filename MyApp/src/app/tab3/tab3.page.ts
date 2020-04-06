import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  constructor(
    private alertController: AlertController,
    public afAuth: AngularFireAuth,
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
}
