import { Component, computed, input, output, signal } from '@angular/core';
import { DisclosureButton } from '@shared/components/disclosure-button/disclosure-button';

export interface DropdownOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-dropdown',
  imports: [DisclosureButton],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
})
export class Dropdown {
  label = input.required<string>();
  options = input.required<DropdownOption[]>();
  selected = input<string>('');
  selectedChange = output<string>();

  isOpen = signal(false);

  selectedLabel = computed(() => {
    const match = this.options().find(
      (option) => option.value === this.selected(),
    );
    if (!match) {
      return '';
    }
    return match.label;
  });

  toggleOpen(): void {
    this.isOpen.set(!this.isOpen());
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  selectOption(value: string): void {
    this.selectedChange.emit(value);
    this.isOpen.set(false);
  }
}
