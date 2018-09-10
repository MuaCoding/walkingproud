import { Directive, ContentChild, ElementRef, Renderer2 } from "@angular/core";
import { Content, ScrollEvent } from "ionic-angular";

import { SlideTabsComponent } from "../../components/common/slide-tabs/slide-tabs";
import { ScrollMenusComponent } from './../../components/common/scroll-menus/scroll-menus';

@Directive({
  selector: '[fixed-scroll]'
})
export class FixedScrollDirective {

  @ContentChild(SlideTabsComponent)
  _slideTabs: SlideTabsComponent;

  @ContentChild(ScrollMenusComponent)
  _scrollMenus: ScrollMenusComponent;

  private _elRect: any;

  private _isFixed: boolean = false;

  constructor(private _content: Content, private _renderer: Renderer2, private _el: ElementRef) {
    _content.ionScroll.subscribe(this._onScroll.bind(this));
  }

  ngAfterContentInit() {
    this._slideTabs && this._slideTabs.change.subscribe(this._onScroll.bind(this));
    this._scrollMenus && this._scrollMenus.change.subscribe(this._onScroll.bind(this));
  }

  _updateRect() {
    this._elRect = this._el.nativeElement.getBoundingClientRect();
  }

  _setFixed() {
    this._renderer.setStyle(this._content.getScrollElement(), 'padding-top', `${this._elRect.height}px`);
    this._renderer.addClass(this._el.nativeElement, 'fixed');
    this._isFixed = true;
  }

  _removeFixed() {
    this._isFixed = false;
    this._renderer.removeStyle(this._content.getScrollElement(), 'padding-top');
    this._renderer.removeClass(this._el.nativeElement, 'fixed');
  }

  _onScroll(ev: ScrollEvent) {
    const d = this._content.getContentDimensions();

    if (!this._elRect) {
      return this._updateRect();
    }

    if (!this._isFixed && d.scrollTop >= this._elRect.top) {
      return this._setFixed();
    }

    if (this._isFixed && d.scrollTop < this._elRect.top) {
      return this._removeFixed();
    }

    return;
  }

}
