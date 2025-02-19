import { Component, AfterViewInit,OnChanges, SimpleChanges, Input } from '@angular/core';
import { gsap } from 'gsap';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeTabComponent } from '../home-tab/home-tab.component';
@Component({
  selector: 'app-header',
  imports: [NgbNavModule, HomeTabComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit, OnChanges {
  @Input() active: number = 1;

  
  ngAfterViewInit() {
    const buttons = document.querySelectorAll('button[ngbNavLink]');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.1, duration: 0.3 });
      });
      button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.3 });
      });
    });
    // logging for starting
    console.log("active when page loads" + this.active);
    this.animateActiveTab();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['active'] && !changes['active'].isFirstChange()) {
      console.log("active when change is made: " + changes['active'].currentValue);
      this.animateActiveTab();
    }
  }

  animateActiveTab() {
    const activeSvgContainer = document.querySelector('.svgContainer');
    if (activeSvgContainer) {
      const svg = activeSvgContainer.querySelector('svg');
      if (svg) {
        gsap.fromTo(svg, { opacity: 0, scale: 0.1 }, { opacity: 1, scale: 1, duration: 1 });
      }
    }
  }
}
