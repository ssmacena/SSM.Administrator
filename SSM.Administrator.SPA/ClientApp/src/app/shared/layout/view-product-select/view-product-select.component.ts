import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProductType } from '@app/business/enumerators';


@Component({
  selector: 'app-view-product-select',
  templateUrl: './view-product-select.component.html',
  styleUrls: ['./view-product-select.component.css']
})
export class ViewProductSelectComponent implements OnInit {

  arrayItems = [
    { id: ProductType.Fundo, text: 'Fundos de Investimento' },
    { id: ProductType.RendaVariavel, text: 'Renda Variáveil' },
    { id: ProductType.RendaFixa, text: 'Títulos' },
    { id: ProductType.Ndf, text: 'NDF' },
    { id: ProductType.Swap, text: 'SWAP' },
    { id: ProductType.Coe, text: 'COE' },
    { id: ProductType.BoxOpcaoFlexivel, text: 'Opções Flexíveis' }
  ];
  allItem:any = { id: ProductType.None, text: 'Produtos' }
  currentSelectedItem: any = this.allItem;
  items = [];

  @Input() keepDefaulsItems: boolean = false;
  @Input() products: Array<number>;
  @Output() selectedItem: EventEmitter<any> = new EventEmitter<any>();

  constructor() { 
  }

  ngOnInit() {
    this.loadItems();
  }

  onSelectedItem(selectedItem:any) {
    if (selectedItem) this.currentSelectedItem = selectedItem;
    else this.currentSelectedItem = this.allItem;

    this.selectedItem.emit(this.currentSelectedItem);
  }

  //============================================================================================ #Privates Methods
  private loadItems(): any {
    let results: Array<any> = [];

    if (!this.keepDefaulsItems) {
      if (this.products && this.products.length > 0) {
        this.items = this.arrayItems.filter(e => this.products.includes(e.id));
      }
    } else {
      this.items = this.arrayItems;
    }
  }
}
