import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customer = new Customer();

  constructor() {}

  ngOnInit(): void {}

  // this method is executed when a user submits the form. we pass in the form model(customerForm: NgForm) from the template so we can check the form state and view its values.
  save(customerForm: NgForm): void {
    // we call a service here to save our data to a back-end server
    console.log(customerForm.form);
    console.log('Saved: ' + JSON.stringify(customerForm.value));
  }
}
