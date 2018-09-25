import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firebase:AngularFireDatabase ) { }

  customerList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    date_created: new FormControl(''),
    image_url: new FormControl(''),
    source_link: new FormControl(''),
    team_id: new FormControl(''),
    team_name: new FormControl(''),
    title: new FormControl('')
  });

  getCustomers() {
    this.customerList = this.firebase.list('news/news');
    return this.customerList.snapshotChanges();
  }

  insertCustomer(customer) {
    this.customerList.push({
      date_created: customer.date_created,
      image_url: customer.image_url,
      source_link: customer.source_link,
      team_id: customer.team_id,
      team_name: customer.team_name,
      title: customer.title
    });
  }

  updateCustomer(customer) {
    this.customerList.update(customer.$key, {
      date_created: customer.date_created,
      image_url: customer.image_url,
      source_link: customer.source_link,
      team_id: customer.team_id,
      team_name: customer.team_name,
      title: customer.title
    });
  }

  deleteCustomer(customer) {
    this.customerList.remove(customer.$key);
  }
  populateForm(customer) {
    this.form.setValue(customer);
  }
}
