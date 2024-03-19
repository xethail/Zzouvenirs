import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appArticleBorder]'
})
export class ArticleBorderDirective {

  constructor(private el: ElementRef)
  {
    this.setHeight(180); // Hauteur de base de 180px
    this.setBorder('#f5f5f5'); // Code Hexa de la couleur
  }


  @Input('appArticleBorder') colorBorder : string;


  private setHeight(h : number)
  {
    this.el.nativeElement.style.height = `${h}px`;
  }


  private setBorder(c : string)
  {
    this.el.nativeElement.style.border = `solid 4px ${c}`;
  }


  @HostListener('mouseenter') onMouseEnter() { this.setBorder(this.colorBorder || '#005bc4');} // Code Hexa d'une couleur bleu nuit
  @HostListener('mouseleave') onMouseLeave() { this.setBorder('#f5f5f5');}

}
