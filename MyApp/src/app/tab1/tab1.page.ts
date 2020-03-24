import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  constructor(private alertController: AlertController) {}

  async createTrade() {
    const alert = await this.alertController.create({
      header: "Create trade",
      subHeader: "Not yet implemented",
      message:
        "This will create a request for the users shoe. This will show the other users available meetup locations, the shoe size, and the shoes they are willing to trade for",
      buttons: ["OK"]
    });

    await alert.present();
  }
}
