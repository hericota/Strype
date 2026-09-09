import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-detalhe-produto',
  styleUrl: './detalhe-produto.css',
  templateUrl: './detalhe-produto.html',
})
export class DetalheProduto {

  private route = inject(ActivatedRoute);

  id = this.route.snapshot.paramMap.get('id')

}
