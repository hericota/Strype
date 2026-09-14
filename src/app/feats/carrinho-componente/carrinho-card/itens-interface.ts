import { Produto } from "../../posts/produto";

export interface ItensInterface {
  produto: Produto; //o produto recebe a interface Produto que tem na api. interface dentro de interface :)
  quantidade: number | null;
}
