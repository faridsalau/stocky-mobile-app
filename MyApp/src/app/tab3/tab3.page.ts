import { Component } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page {
  constructor(private alertController: AlertController) {}

  async pickShoeSize() {
    const alert = await this.alertController.create({
      header: "Pick Shoe Size",
      subHeader: "Not yet implemented",
      message:
        "The user will be able to select their shoe size out of a list of numbers",
      buttons: ["OK"]
    });

    await alert.present();
  }
}
