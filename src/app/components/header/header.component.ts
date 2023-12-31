import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  mouseEnterOpenAidLogo() {
    document.getElementById('svg5')?.setAttribute('transform', 'rotate(360)')
    var st = '' + document.getElementById('path365')?.getAttribute('style')
    document.getElementById('path365')?.setAttribute('style', '' + st?.replace('opacity: 1;', 'opacity: 0.1;'))
    document.getElementById('svg5')?.setAttribute('width', '19mm')
    document.getElementById('svg5')?.setAttribute('height', '19mm')
  }

  mouseLeaveOpeanAidLogo() {
    document.getElementById('svg5')?.setAttribute('transform', 'rotate(0)')
    var st = '' + document.getElementById('path365')?.getAttribute('style')
    document.getElementById('path365')?.setAttribute('style', '' + st?.replace('opacity: 0.1;', 'opacity: 1;'))
    document.getElementById('svg5')?.setAttribute('width', '15mm')
    document.getElementById('svg5')?.setAttribute('height', '15mm')
  }

}
