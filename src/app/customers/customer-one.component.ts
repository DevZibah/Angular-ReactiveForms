import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  // inject the formbuilder instance using the constructor parameter
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // we use the formbuilder instance and call its group method. the group method allows us to define the set of controls and nested formGroups that are associated with the root FormGroup
    this.customerForm = this.fb.group({
      // instaed of creating a new formcontrol instance, we simply set the default value to anything
      firstName: '',
      lastName: '',
      email: '',
      // the default value for sendCatalog is true
      sendCatalog: true,
    });
  }

  // in the method below, we use setValue to update each of the values in the form model and its required that we set all formControls on the form but we can use patchValue to just set a subset of all values
  populateTestData(): void {
    this.customerForm.setValue({
      firstName: 'Jack',
      lastName: 'Harkness',
      email: 'jack@forwood.com',
      sendCatalog: false,
    });
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }
}
