import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective {
  @Input() tooltipText: string = '';
  private tooltipElement: HTMLElement | null = null;
  private hostElement: HTMLElement; 

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.tooltipElement = this.renderer.createElement('span');
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'background', '#4878BC');
    this.renderer.setStyle(this.tooltipElement, 'color', '#fff');
    this.renderer.setStyle(this.tooltipElement, 'padding', '5px 10px');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '5px');
    this.renderer.setStyle(this.tooltipElement, 'font-size', '12px');
    this.renderer.setStyle(this.tooltipElement, 'white-space', 'nowrap');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '1000');
    this.renderer.setStyle(this.tooltipElement, 'display', 'none'); 
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement); 
    this.hostElement = this.el.nativeElement;
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.createTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.destroyTooltip();
  }

  @HostListener('mousemove', ['$event']) 
  onMouseMove(event: MouseEvent) {
    if (!this.tooltipElement) return;

    const hostRect = this.hostElement.getBoundingClientRect();
    const containerWidth = hostRect.width;
    const containerHeight = hostRect.height;

    let left = event.clientX - hostRect.left + 20;
    let top = event.clientY - hostRect.top + 20;

    if (left + this.tooltipElement.offsetWidth > containerWidth) {
        left = event.clientX - hostRect.left - this.tooltipElement.offsetWidth - 10;
    }

    if (top + this.tooltipElement.offsetHeight > containerHeight) {
        top = event.clientY - hostRect.top - this.tooltipElement.offsetHeight - 10;
    }

    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
  }

  private createTooltip() {
    this.tooltipElement = this.renderer.createElement('span');
    this.tooltipElement!.innerText = this.tooltipText; 

    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'background', '#4878BC');
    this.renderer.setStyle(this.tooltipElement, 'color', '#fff');
    this.renderer.setStyle(this.tooltipElement, 'padding', '4px 10px');
    this.renderer.setStyle(this.tooltipElement, 'font-size', '12px');
    this.renderer.setStyle(this.tooltipElement, 'border-radius', '5px');
    this.renderer.setStyle(this.tooltipElement, 'white-space', 'nowrap');

    this.renderer.appendChild(this.hostElement, this.tooltipElement);
  }

  private destroyTooltip() {
    if (this.tooltipElement) {
      this.renderer.removeChild(this.hostElement, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}