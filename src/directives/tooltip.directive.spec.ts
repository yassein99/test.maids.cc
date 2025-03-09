import { TooltipDirective } from './tooltip.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('TooltipDirective', () => {
  let elementRefMock: ElementRef;
  let rendererMock: Renderer2;

  beforeEach(() => {
    elementRefMock = { nativeElement: document.createElement('div') } as ElementRef;
    rendererMock = jasmine.createSpyObj('Renderer2', ['setStyle', 'appendChild', 'removeChild']);
  });

  it('should create an instance', () => {
    const directive = new TooltipDirective(elementRefMock, rendererMock);
    expect(directive).toBeTruthy();
  });
});
