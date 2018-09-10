import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';
import { Modal } from 'ionic-angular';
import { UtilityProvider } from './../../providers/utility/utility';

@Directive({
  selector: '[image-select]'
})
export class ImageSelectDirective {

  maxImageSize = 10;
  allowImageType = ["image/jpeg", "image/jpg", "image/gif", "image/png", "image/bmp"];

  cropper: Modal;

  @Output() process: EventEmitter<any> = new EventEmitter<any>();

  constructor(public element: ElementRef, public utility: UtilityProvider) {
  }

  ngOnInit() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.onchange = (event) => {
      var file = input.files[0];
      this.cropperImage(file);

      input.value = null;
    };

    const elemet = this.element.nativeElement
    elemet.onclick = (event) => {
      input.click();
    }
  }

  cropperImage(file: File) {
    if (!file) {
      return false;
    }

    if (this.allowImageType.indexOf(file.type) < 0) {
      this.utility.alert("不允许的图片格式", "仅可上传jpg、gif、png、bmp格式的图片");
      return false;
    }
    if (file.size > this.maxImageSize * 1024 * 1024) {
      this.utility.alert("图片大小超出" + this.maxImageSize + "MB限制", "当前大小 " + (file.size / 1024 / 1024).toFixed(2) + " MB");
      return false;
    }

    this.utility.dismissModal(this.cropper);
    const cropper$ = this.cropper = this.utility.openModal("modal-image-cropper", { file });

    cropper$.onDidDismiss(
      (data, role) => {
        if (role == "ok") {
          this.process.emit(data);
        }
      }
    );
  }

}
