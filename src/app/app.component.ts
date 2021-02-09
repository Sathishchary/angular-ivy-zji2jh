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
    { start: 1, end: 3, price: 2 },
    { start: 2, end: 8, price: 3 },
    { start: 7, end: 11, price: 10 }
  ];
  /// expected output [{0, 2, 5 }, { 2, 8, 3}, {8, 11, 10}]

  /// expected output [{0, 1, 5 }, {1, 3, 2} { 3, 8, 3}, {8, 11, 10}]
  constructor() {}
  ngOnInit() {
    this.modifyCode(this.inputArray);
  }

  modifyCode(arr) {
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      let storeValue = { start: 0, end: 0, price: 0 };
      for (let j = 0; j < arr.length; j++) {
        if (item !== arr[j]) {
          let allNums = this.getNumberValue(arr[j].start, arr[j].end);
          if (allNums.includes(item.start)) {
            if (item.price > arr[j].price) {
              storeValue.start = arr[j].end;
            } else {
              storeValue.end = item.end;
            }
          } else {
            storeValue.start = item.start;
          }
          if (allNums.includes(item.end)) {
            if (item.price > arr[j].price) {
              storeValue.end = arr[j].start;
            } else {
              storeValue.end = item.end;
            }
          } else {
            if (storeValue.end === 0) {
              storeValue.end = item.end;
            }
          }
          storeValue.price = item.price;
        }
      }
      this.setValues(storeValue.start, storeValue.end, storeValue.price);
    }
  }
  setValues(start, end, price) {
    return this.updatedArray.push({ start: start, end: end, price: price });
  }

  getNumberValue(start, end) {
    let value = [];
    for (let i = start; i <= end; i++) {
      value.push(i);
    }
    return value;
  }
}
