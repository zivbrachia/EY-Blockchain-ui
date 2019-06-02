import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CalcService } from './../../services/calc.service';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {
  name = new FormControl({ value: 0, disabled: true });
  numbers: number | any = [];
  operators: any = [];
  statment: any = [];
  submitFlag = false;

  constructor(private calcService: CalcService) { }

  ngOnInit() {
    this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'C'];
    this.operators = ['*', '/'];
    this.name.setValue(0);
  }

  isNumber(item: any): boolean {
    if (isNaN(item)) {
      return false;
    }
    return true;
  }

  isOperator(item: any): boolean {
    if (this.operators.includes(item)) {
      return true;
    }
    return false;
  }

  async updateStatment(item: number | any) {
    if (item === 'C') {
      this.statment = [0];
    } else {
      const index = this.statment.length - 1;
      const lastItem = this.statment[index];
      if (lastItem === undefined) {
        if (this.isNumber(item)) {
          this.statment.push(item);
        }
      } else if (this.isNumber(lastItem)) {
        if (lastItem === 0) {
          this.statment[index] = `${item}`;
        } else {
          if (this.isNumber(item)) {
            if (this.submitFlag) {
              this.statment = [item];
              this.submitFlag = false;
            } else {
              this.statment[index] = `${lastItem}${item}`;
            }
          } else if (this.isOperator(item)) {
            this.statment.push(item);
          }
        }
      } else if (this.isOperator(lastItem)) {
        if (this.isOperator(item)) {
          this.statment[index] = item;
        } else if (this.isNumber(item)) {
          this.statment.push(item);
        }
      }
    }
    this.printStatment();
  }

  statmentToString() {
    return this.statment.join(' ');
  }

  printStatment() {
    this.name.setValue(this.statmentToString());
  }

  submitCalc() {
    this.calcService.calc(this.statmentToString())
      .subscribe((result) => {
        this.name.setValue(result);
        this.statment = [result];
        this.submitFlag = true;
      });
  }
}
