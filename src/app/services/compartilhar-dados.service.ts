import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompartilharDadosService {
  itemDeletado: EventEmitter<void> = new EventEmitter<void>();

  emitirItemDeletado(): void {
    this.itemDeletado.emit();
  }
}
