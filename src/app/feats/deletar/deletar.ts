import { Component, inject, signal } from '@angular/core';
import { DeleteInterface } from './delete-interface';
import { form, required, FormField } from '@angular/forms/signals';
import { Deletando } from './deletando';

@Component({
  imports: [FormField],
  selector: 'app-deletar',
  styleUrl: './deletar.css',
  templateUrl: './deletar.html',
})
export class Deletar {
  protected readonly consumoService = inject(Deletando)

  deleteModel = signal<DeleteInterface>({
    id:null,
  });
  deleteForm = form(this.deleteModel, (s) => {
    required(s.id, { message: "Campo vazio" })
  })

  submitDelete(event: SubmitEvent) {
    event.preventDefault()

    const deletar = this.deleteModel();
    this.consumoService.cadastrarDelete(deletar).subscribe({
      next: () => {
        this.deleteModel.set({
          id:null
        });
        console.log("Você conseguiu")
        this.deleteForm().reset()
      },
      error:()=>{
        console.log("ta tudo errado")
      }
    })
  }
}
