import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  nombre: string = "Manuel Agudelo"
  edad: number = 32
  sueldos: number[] = [1000, 1500, 1250]
  activo: boolean = true

  ultimosSueldos(): number {
    let suma = 0
    for (let i = 0; i < this.sueldos.length; i++) {
      suma += this.sueldos[i]
      console.log(this.sueldos[i])
    }

    return suma
  }
}