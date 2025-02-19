import { Component, AfterViewInit, OnChanges, SimpleChanges, Input } from '@angular/core';
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
    // Initialize all SVGs with opacity 0 and scale 0.1
    this.setupSVGAnimations();

    // Add hover effects for buttons
    const buttons = document.querySelectorAll('button[ngbNavLink]');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.1, duration: 0.3 });
        this.animateSVGOnHover(button);
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.3 });
        // Reset SVG to initial state if the tab is inactive
        if (!this.isActiveTab(button)) {
          this.resetSVGOnHover(button);
        }
      });
    });

    // Animate the active tab's SVG on page load
    console.log("active when page loads: " + this.active);
    this.animateActiveTab();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['active'] && !changes['active'].isFirstChange()) {
      console.log("active when change is made: " + changes['active'].currentValue);
      // Reset all inactive tabs' SVGs and animate the active tab
      this.animateActiveTab();
    }
  }

  // Set all SVGs to opacity 0 and scale 0.1 initially
  private setupSVGAnimations() {
    const svgContainers = document.querySelectorAll('.svgContainer');
    svgContainers.forEach(svgContainer => {
      const svg = svgContainer.querySelector('svg');
      if (svg) {
        gsap.set(svg, { opacity: 0, scale: 0.1 });
      }
    });
  }

  // Animate SVG on hover over an inactive tab
  private animateSVGOnHover(button: Element) {
    const svgContainer = button.querySelector('.svgContainer');
    if (svgContainer) {
      const svg = svgContainer.querySelector('svg');
      if (svg) {
        gsap.to(svg, { opacity: 1, scale: 1, duration: 0.3 });
      }
    }
  }

  // Reset the SVG when mouse leaves the button, unless it's the active tab
  private resetSVGOnHover(button: Element) {
    const svgContainer = button.querySelector('.svgContainer');
    if (svgContainer) {
      const svg = svgContainer.querySelector('svg');
      if (svg) {
        gsap.to(svg, { opacity: 0, scale: 0.1, duration: 0.3 });
      }
    }
  }

  // Check if the tab is the active tab
  private isActiveTab(button: Element): boolean {
    const buttonIndex = Array.from(document.querySelectorAll('button[ngbNavLink]')).indexOf(button);
    return this.active === buttonIndex + 1;
  }

  // Animate the active tab's SVG and reset all inactive tab SVGs
  private animateActiveTab() {
    const svgContainers = document.querySelectorAll('.svgContainer');
    svgContainers.forEach((svgContainer, index) => {
      const svg = svgContainer.querySelector('svg');
      const button = svgContainer.closest('button[ngbNavLink]');
      if (svg && button) {
        // If the tab is active, animate the SVG to opacity 1 and scale 1
        if (index + 1 === this.active) {
          gsap.to(svg, { opacity: 1, scale: 1, duration: 1 });
        } else {
          // For inactive tabs, keep the SVG hidden and scaled down
          gsap.to(svg, { opacity: 0, scale: 0.1, duration: 0.3 });
        }
      }
    });
  }
}
