import { Injectable } from '@angular/core';
import { MultiPickerColumn } from 'ion-multi-picker';
import { isArray } from 'ionic-angular/util/util';
import { Province } from '../../models/webapi';

interface ArrayBase {
  id: number;
  name: string;
}

@Injectable()
export class MultiPickerProvider {

  constructor() {
  }

  /** 格式化字符串数据 */
  fromatString(data: string[]);
  /** 格式化字符串组数据 */
  fromatString(...data: string[]);
  /** 实现函数 */
  fromatString(...input: (string | string[])[]) {
    let array: string[];

    const firstInput = input[0];
    if (isArray(firstInput)) {
      array = firstInput;
    }
    else {
      array = input as string[];
    }

    const data = array.filter(value => !!value).map<ArrayBase>(
      (value, index) => {
        return { id: (index + 1), name: value };
      }
    );

    return this.fromatArray(data);
  }

  /** 格式化数组数据 */
  fromatArray(data: ArrayBase[]): MultiPickerColumn[] {
    let column: MultiPickerColumn = { options: [] };

    data && data.filter(value => !!value).forEach(
      (value) => {
        column.options.push({ text: value.name, value: value.id, disabled: false });
      }
    );

    return [column];
  }

  /** 格式化区域数据 */
  fromatArea(data: Province[]): MultiPickerColumn[] {
    let provinceColumn: MultiPickerColumn = { name: "province", columnWidth: "30%", options: [] };
    let cityColumn: MultiPickerColumn = { name: "city", columnWidth: "30%", options: [] };
    let districtColumn: MultiPickerColumn = { name: "district", columnWidth: "30%", options: [] };

    data && data.filter(value => !!value).forEach(
      (province) => {
        provinceColumn.options.push({ text: province.name, value: province.code, disabled: false });

        province.cities.filter(value => !!value).forEach(
          (city, idx) => {

            cityColumn.options.push({ text: city.name, value: city.code, parentVal: province.code, disabled: false });

            city.districts.filter(value => !!value).forEach(
              (third) => {
                districtColumn.options.push({ text: third.name, value: third.code, parentVal: city.code, disabled: false });
              }
            );

          }
        );
      }
    );

    // 防止空值错乱
    cityColumn.options.unshift({ text: "", value: "", parentVal: "ETXIN", disabled: true });
    districtColumn.options.unshift({ text: "", value: "", parentVal: "ETXIN", disabled: true });

    return [provinceColumn, cityColumn, districtColumn];
  }
}
