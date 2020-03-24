import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  constructor(private alertController: AlertController) {}

  async showRequest() {
    const alert = await this.alertController.create({
      header: "Shoe Request",
      subHeader: "Not yet implemented",
      message:
        "This will show a request for the users shoe. This request will show the other users available meetup locations, the shoe size, and the shoes they are willing to trade for",
      buttons: ["OK"]
    });

    await alert.present();
  }
}
