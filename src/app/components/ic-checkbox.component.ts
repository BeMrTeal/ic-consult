import { Component, Input } from '@angular/core';

@Component({
  selector: 'ic-checkbox',
  template: `
     <label>
      <input type="checkbox" [(ngModel)]="checked" />
      <span class="label">
        <ng-content></ng-content>
      </span>
    </label>
  `,
})
export class IcCheckboxComponent {
  @Input()
  checked: boolean = false;
}
