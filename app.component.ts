import { Component, OnInit } from '@angular/core';
import { AppService } from './api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})




export class AppComponent implements OnInit {
  title = 'exincome';

  list: any = [];
  expenses: any = [];
  exincome: any = [];
  utype: any;
  udesc: any;
  uamt: any;
  incomee: any;
  expene: any;
  totalIncome: any;
  totalExpense: any;
  totalBalance: any;
  name: any;
  obj:any;

  // l:any;u:any;d:any;
  incomeFunction() {
    this.incomee = true;
    this.expene = false;
  }
  expenseFunction() {
    this.expene = true;
    this.incomee = false;
  }

  add() {
    let f= {

      type: this.utype,
      description: this.udesc,
      amount:this.uamt,
      
    };

    this.api.post('http://localhost/load.php',
      f).then((x: any) => {
        console.log('Item Saved', x);
      }).catch((x: any) => {
        console.error('Error is', x);
      });
    this.exincome.push(f);
    }
    gettotalBalance()
    {
    let obj = this.exincome.filter((a: any) => a.type === 'income');
    
    this.totalIncome = obj.reduce((a: number, b: any) => {
      return a + parseInt(b.amount);
    }, 0);
    
    let obj1 = this.exincome.filter((x: any) => x.type === 'expense');
    this.totalExpense = obj1.reduce((a: number, b: any) => {
      return a + parseInt(b.amount);
    }, 0);
    
    
    this.totalBalance = (parseInt(this.totalIncome) - parseInt(this.totalExpense));
  
    }

  getTotalIncome() {
    let obj = this.exincome.filter((a: any) => a.type === 'income');
    
    let totalIncome = obj.reduce((a: number, b: any) => {
      return a + parseInt(b.amount);
    }, 0);
    return totalIncome;
  }
  getTotalExpense() {
   
    let obj1 = this.exincome.filter((x: any) => x.type === 'expense');
    this.totalExpense = obj1.reduce((a: number, b: any) => {
      return a + parseInt(b.amount);
    }, 0);
    return this.totalExpense;
  }

  


  delete(i: any) {
    let arrEl = this.exincome[i];
    
    if (arrEl.type === 'income') {
      let qua = arrEl.amount;
      this.totalIncome = this.totalIncome - (parseInt(qua));
      
      this.totalBalance = (parseInt(this.totalBalance) - parseInt(qua));
      
    } else if (arrEl.type === 'expense') {
      let aqua = arrEl.amount;
      this.totalExpense = this.totalExpense - (parseInt(aqua));
      
      this.totalBalance = (parseInt(this.totalBalance) + parseInt(aqua));
      
    }
    this.exincome.splice(i, 1);
  }

  constructor(private api: AppService) {
    this.loadData();
    console.log('Request sent');

  }

  



  async loadData() {
    try {
      let res: any = await this.api.get(`http://localhost/load.php`);
      console.log('Response is ', res);
      this.exincome = res.data;
      this.title = res.name;
    } catch (e) {

    }
  }

  saveItem() {
    this.api.post('http://localhost/load.php',
      { type: this.utype } && { amount: this.uamt }).then((x: any) => {
        console.log('Item Saved', x);
      }).catch((x: any) => {
        console.error('Error is', x);
      });
  }

  
  refresh() {
    setInterval(function () {
      document.location.reload();
    }, 100);
    window.localStorage.removeItem('exincome');
  }



  ngOnInit(): void {
  }

}