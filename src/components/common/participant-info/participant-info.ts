import { Component, ViewChild, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { isTrueProperty } from 'ionic-angular/util/util';

import { MultiPickerColumn } from 'ion-multi-picker';
import { Province } from '../../../models/webapi';

import { CacheApiProvider } from './../../../providers/cache-api/cache-api';
import { UtilityProvider } from '../../../providers/utility/utility';
import { MultiPickerProvider } from '../../../providers/multi-picker/multi-picker';

import 'rxjs/add/operator/finally';

@Component({
  selector: 'participant-info',
  templateUrl: 'participant-info.html'
})
export class ParticipantInfoComponent {

  @ViewChild("submit") _submit: ElementRef;
  get submit() {
    return this._submit.nativeElement;
  }

  @Input()
  get unrequired() {
    return this._unrequired;
  }
  set unrequired(val: boolean) {
    this._unrequired = isTrueProperty(val);
  }
  _unrequired = false;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(val: boolean) {
    this._disabled = isTrueProperty(val);
  }
  _disabled = false;

  @Input() data: any = {};
  @Input() button: any;

  @Output() process: EventEmitter<any> = new EventEmitter<any>();

  info: FormGroup;

  area: any = {};
  areaPicker: MultiPickerColumn[];
  completed = false;

  credential = this.multiPicker.fromatString("身份证", "回乡证", "军官证", "护照");
  sex = this.multiPicker.fromatString("男", "女");
  size = this.multiPicker.fromatString("XS码", "S码", "M码", "L码", "XL码", "XXL码");

  idcard_pattern = /^\d{17}(\d|X|x)$/;
  phone_pattern = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;

  constructor(public fb: FormBuilder, public cacheApi: CacheApiProvider, public utility: UtilityProvider, public multiPicker: MultiPickerProvider) {
  }

  ngOnInit() {
    this.initForm();
    this.getArea();
  }

  validators(type: "text" | "phone" | "idcard" | "email" = "text"): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (!this.unrequired) {
      validators.push(Validators.required);
    }

    if (type == "phone") {
      validators.push(Validators.pattern(this.phone_pattern));
    }
    else if (type == "idcard") {
      validators.push(Validators.pattern(this.idcard_pattern));
    }
    else if (type == "email") {
      validators.push(
        (c: AbstractControl) => {
          return c.value ? Validators.email(c) : null;
        }
      );
    }

    return validators;
  }

  initForm() {
    const data = this.data;

    const card = data.card ? data.card : {};
    const contact = data.contact ? data.contact : {};

    let area = null;
    if (data.province) {
      const province = data.province || { name: null, code: null };
      const city = data.city || { name: null, code: null };
      const district = data.district || { name: null, code: null };

      this.area = { province, city, district };
      area = `${province.code || ''} ${city.code || ''} ${district.code || ''}`;
    }

    this.info = this.fb.group({
      name: [data.name, this.validators()],
      card: this.fb.group({
        type: [card.type, this.validators()],
        number: [card.number, this.validators()],
      }),
      birthday: [data.birthday, this.validators()],
      sex: [data.sex, this.validators()],
      mobile: [data.mobile, this.validators("phone")],
      email: [data.email, this.validators("email")],
      area: [area, this.validators()],
      address: [data.address, this.validators()],
      tshirt: [data.tshirt, this.validators()],
      contact: this.fb.group({
        name: [contact.name, this.validators()],
        mobile: [contact.mobile, this.validators("phone")],
        connection: [contact.connection, this.validators()],
      })
    });

    // 联系电话不能重复
    const contact_mobile = this.validators("phone");
    contact_mobile.push(
      (c: AbstractControl) => {
        return (c.value && this.info.get("mobile").value == c.value) ? { "repeat": true } : null;
      }
    );
    this.info.get("contact").get("mobile").setValidators(contact_mobile);

    // 区域列表不能为空
    this.info.setValidators(
      (c: AbstractControl) => {
        return this.areaPicker ? null : { "noarea": true };
      }
    );

    // 是否禁用表单
    if (this.disabled) {
      this.info.disable();
    }

    this.cardTypeChange();
  }

  getArea() {
    const params = new HttpParams().set("notAuthorize", null);
    const area$ = this.cacheApi.get<Province>("/area", params);

    area$.finally(
      () => {
        this.completed = true;
      }
    ).subscribe(
      (result) => {
        this.areaPicker = this.multiPicker.fromatArea(result.data);
      },
      (error) => { }
    );
  }

  areaChange(area) {
    for (const pair in area) {
      const element = area[pair];
      this.area[pair] = { name: element.text, code: element.value };
    }
  }

  cardTypeChange() {
    const card = this.info.value.card;
    const number = this.info.get("card").get("number");

    if (card.type == 1) {
      number.setValidators(this.validators("idcard"));
      number.updateValueAndValidity();
    }
    else {
      number.setValidators(this.validators());
      number.updateValueAndValidity();
    }
  }

  cardNumberChange() {
    const card = this.info.value.card;
    const number = this.info.get("card").get("number");

    if (number.valid && card.type == 1) {
      this.idCardSetValue(card.number);
    }
  }

  idCardSetValue(idcard) {
    const year = idcard.substring(6, 10);
    const month = idcard.substring(10, 12);
    const day = idcard.substring(12, 14);
    const sexno = idcard.substring(16, 17);

    const birthday = new Date(`${year}/${month}/${day}`);

    if (!!birthday.getTime()) {
      const datePipe = new DatePipe("en-US");
      this.info.patchValue({ birthday: datePipe.transform(birthday, "yyyy-MM-dd") });
    }

    this.info.patchValue({ sex: (sexno % 2 == 0 ? "2" : "1") });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      Object.assign(form.value, this.area);
      this.process.emit(form);
    }
    else {
      this.utility.toast("表单中有未通过验证项，请更正后重试");
    }
  }

}
