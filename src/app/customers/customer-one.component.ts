import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { Customer } from './customer';

// we can add our custom validator function above the component class because the validator will only be used by this component.
// to allow a formControl or a formgroup, we specify AbstractControl here
function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
  // we check if the AbstractControl has a value that is not null, is not a number, is less than 1, or greater than 5
  if (c.value !== null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    // if so, we return the key and value pair specifying the name of the validation rule, we'll call it range and true to indicate that the validation rule was broken. the validation rule name is then added to the errors collection for the passed passed in FormControl
    return { range: true };
  }
  // if the control is valid, we return null
  return null;
}

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
      // instaed of creating a new formcontrol instance, we simply set the default value to anything. here we add a validator
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: '',
      // we set rating to null because an empty string is not a good default for a numeric control and ratingRange as the custom validator
      rating: [null, ratingRange],
      // this is for the set of radio buttons and we don't need to put validation here
      notification: 'email',
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

  // this method takes in a string definiing which radio button was clicked and it returns a void
  setNotification(notifyVia: string): void {
    // here, the variable 'phoneControl' becomes the formcontrol 'phone'
    const phoneControl = this.customerForm.get('phone');
    // if the notification is via text, then we add a required validator for the phone FormControl by calling the setValidators method
    if (notifyVia == 'text') {
      phoneControl?.setValidators(Validators.required);
    } else {
      // otherwise, we clear the validators for the phone FormControl
      phoneControl?.clearValidators();
    }
    // After setting or clearing the validators, we need to reevaluate the phone FormControl's validation state
    phoneControl?.updateValueAndValidity();
  }
}
