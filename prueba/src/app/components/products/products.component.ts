import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products = [
    {
      codigo: 1,
      descripcion: "Naranjas",
      precio: 10
    },
    {
      codigo: 2,
      descripcion: "Tomates",
      precio: 5
    },
    {
      codigo: 3,
      descripcion: "Limon",
      precio: 3
    }
  ]

}
