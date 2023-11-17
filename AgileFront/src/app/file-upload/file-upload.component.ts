import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: FileUploadComponent,
    },
  ],
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input()
  onChange: (value: File | null) => void = (/* value: File | null */) => {
    // This is a default implementation that does nothing.
  };
  public file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles(
    event: FileList | null,
  ): void {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    console.log(file);
  }

  constructor(private host: ElementRef<HTMLInputElement>) {}

  writeValue(): void {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: (value: File | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(): void {
    // Optional: You can implement this method if needed.
  }
}
