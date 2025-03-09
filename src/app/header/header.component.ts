import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  
})
export class HeaderComponent {
  searchControl = new FormControl('');
  
  @Output() userIdEntered = new EventEmitter<number>();
  @Output() searchCleared: EventEmitter<void> = new EventEmitter();

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter(value => value === '' || value === null) 
      )
      .subscribe(() => {
        this.searchCleared.emit(); 
      });

    }

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500), 
        distinctUntilChanged()
      )
      .subscribe(value => {
        const id = Number(value);
        if (!isNaN(id) && id > 0) {
          this.userIdEntered.emit(id);
        }
      });
  }
}
