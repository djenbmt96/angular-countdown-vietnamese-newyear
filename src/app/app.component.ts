import { Component } from "@angular/core";
import { CalendarVietnamese } from "date-chinese";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "";
  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  minDate = new Date();
  deadline;
  backgrounds = [
    "url(https://preview.uideck.com/items/bolt-demo/assets/img/slide1.jpg)",
    "url(https://preview.uideck.com/items/bolt-demo/assets/img/slide2.jpg)",
    "url(https://preview.uideck.com/items/bolt-demo/assets/img/slide3.jpg)"
  ];
  isMobile = false;

  ngOnInit() {
    this.initDeadline();
    this.countdown();
    this.isMobile = this.checkMobile();
    // this.changeBackground();
  }

  countdown() {
    setInterval(() => {
      let now = new Date().getTime();
      let t = this.deadline.getTime() - now;
      if (t < 0) {
        this.initDeadline();
      } else {
        this.days = Math.floor(t / (1000 * 60 * 60 * 24));
        this.hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        this.minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
        this.seconds = Math.floor((t % (1000 * 60)) / 1000);
      }
    }, 1000);
  }

  changeBackground() {
    var i = 1;
    setInterval(() => {
      document.getElementById(
        "body-inner"
      ).style.backgroundImage = this.backgrounds[i++];
      if (i == this.backgrounds.length) {
        i = 0;
      }
    }, 5000);
  }

  initDeadline() {
    let now = new Date();
    let currentYear = now.getFullYear();
    this.deadline = this.getVietnameseNewYear(currentYear);
    this.resetTitle(currentYear);
    let t = this.deadline.getTime() - now.getTime();
    if (t < 0) {
      this.deadline = this.getVietnameseNewYear(currentYear + 1);
      this.resetTitle(currentYear + 1);
    }
  }

  getVietnameseNewYear(year) {
    let cal = new CalendarVietnamese();
    let newYear = cal.newYear(year);
    cal.fromJDE(newYear);
    return cal.toDate();
  }

  resetTitle(year) {
    this.name = "TẾT " + this.getZodiac(year).toUpperCase() + " " + year;
  }

  getZodiac(year: number) {
    if (year < 0 || year >= 10000) {
      return;
    }
    let zodiac = [
      "Thân",
      "Dậu",
      "Tuất",
      "Hợi",
      "Tý",
      "Sửu",
      "Dần",
      "Mão",
      "Thìn",
      "Tỵ",
      "Ngọ",
      "Mùi"
    ];
    let canchi = [
      "Canh",
      "Tân",
      "Nhâm",
      "Quý",
      "Giáp",
      "Ất",
      "Bính",
      "Đinh",
      "Mậu",
      "Kỷ"
    ];
    let result = "";
    let can = canchi[year % 10];
    let zod = zodiac[year % 12];
    result += can + " " + zod;
    return result;
  }

  checkMobile() {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
