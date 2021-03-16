import { Injectable } from "@angular/core";
import { ViacepResponseInterface } from "../interfaces/viacep.interface";

@Injectable()
export class ViacepService {

  constructor(
  ) { }

  getAddress(cep: string): Promise<ViacepResponseInterface> {
    return fetch(`http://viacep.com.br/ws/${cep}/json`)
      .then(response => {
        if (response) {
          return response.json();
        }
      })
      .catch(error => console.error(`Erro ao consultar o viacep: ${error.status}: ${error.error}. headers: ${error.headers}`));
  }
}