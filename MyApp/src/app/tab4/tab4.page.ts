import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

interface Shoe {
  name?: string;
  url?: string;
  condition?: string;
}

@Component({
  selector: "app-tab4",
  templateUrl: "./tab4.page.html",
  styleUrls: ["./tab4.page.scss"],
})
export class Tab4Page implements OnInit {
  shoe: Shoe = {
    name: "",
    url: "",
    condition: "",
  };

  constructor(
    public afAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {}

  async submit() {
    let username;
    this.afAuth.auth.onAuthStateChanged((user) => {
      username = user.displayName;
    });
    const db = this.fireStore.firestore;
    const ref = await db.collection("user_shoes");
    let newShoe = {
      createdAt: new Date().toISOString(),
      hasOffer: false,
      shoeName: this.shoe.name,
      shoeUrl: this.shoe.url,
      condition: this.shoe.condition,
      username,
    };
    ref
      .add(newShoe)
      .then(() => {
        alert(`${this.shoe.name} shoe has been added`);
        this.shoe = {
          name: "",
          url: "",
          condition: "",
        };
      })
      .catch((err) => {
        console.log(err);
      });
  }

  ngOnInit() {}
}
