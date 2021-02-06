import { Component, OnInit, VERSION } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Angular " + VERSION.major;
  updatedArray: any = [];
  inputArray = [
    { start: 0, end: 4, price: 5 },
    { start: 2, end: 8, price: 3 },
    { start: 7, end: 11, price: 10 }
  ];
  /// expected output [{0, 2, 5 }, { 2, 8, 3}, {8, 11, 10}]
  constructor() {}
  ngOnInit() {
    this.modifyCode(this.inputArray);
  }

  modifyCode(arr) {
    let value: any;
    for (let i = 0; i < arr.length; i++) {
      let getValue = arr.filter(item => item.start < arr[i].end);
      if (getValue.length > 1) {
        value = getValue.reduce((prev, current) => {
          if (+current.start > +prev.start) {
            return current;
          } else {
            return prev;
          }
        });
        console.log(value, 1);
      } else {
        value = getValue;
        console.log(value);
      }
      this.setValues(arr[i].start, value.start, arr[i].price);
    }
  }
  setValues(start, end, price) {
    return this.updatedArray.push({ start: start, end: end, price: price });
  }
}
