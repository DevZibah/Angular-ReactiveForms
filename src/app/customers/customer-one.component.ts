import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Customer } from './customer';

@Component({
  selector: 'app-customer-one',
  templateUrl: './customer-one.component.html',
  styleUrls: ['./customer-one.component.css'],
})
export class CustomerOneComponent implements OnInit {
  // customerForm is a property that has FormGroup as its type and this type defines our form model
  customerForm!: FormGroup;
  // customer is a data model and its passed to and from a back-end server
  customer = new Customer();

  constructor() {}

  ngOnInit() {
    // the code below creates an instance of the FormGroup and assigns it to the customerForm property
    this.customerForm = new FormGroup({
      // we add a FormControl for each input element in the template's form
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      // the default value for sendCatalog is true
      sendCatalog: new FormControl(true),
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }
}
