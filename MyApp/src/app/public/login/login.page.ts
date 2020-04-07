import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";

interface User {
  email?: string;
  password?: string;
  username?: string;
}
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  user: User = {
    email: "",
    password: "",
    username: "",
  };

  error: string = "";
  resetEmail: string = "";
  show: Boolean = false;

  constructor(
    public afAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {}

  register() {
    const db = this.fireStore.firestore;
    const auth = this.afAuth.auth;
    const alreadyFoundError = new Error("userAlreadyExists");
    db.doc(`/users/${this.user.username.trim().toLowerCase()}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          throw alreadyFoundError;
        } else {
          return auth.createUserWithEmailAndPassword(
            this.user.email,
            this.user.password
          );
        }
      })
      .then((data) => {
        data.user.updateProfile({
          displayName: this.user.username,
        });
        const userCred = {
          userId: data.user.uid,
          email: this.user.email.trim().toLowerCase(),
          username: this.user.username.trim().toLowerCase(),
          createdAt: new Date().toISOString(),
        };
        db.doc(`/users/${this.user.username.trim().toLowerCase()}`).set(
          userCred
        );
      })
      .then(() => {
        this.router.navigate(["tabs"]);
      })
      .catch((error) => {
        if (error === alreadyFoundError) {
          console.log("User already found");
        } else {
          console.log("Something went wrong");
        }
      });
  }

  login() {
    this.afAuth.auth
      .signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(() => {
        this.router.navigate(["tabs"]);
      })
      .catch(() => {
        console.log("Invalid credentials, please try again");
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

  ngOnInit() {}
}
