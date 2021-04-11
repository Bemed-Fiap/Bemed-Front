import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'bmd-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {

  public auth$: Observable<any> = new Observable();
  
  public nome: string;
  public sobrenome: string;
  public enderecoCompleto: string;
  
  constructor(
    private readonly _authService: AuthService
  ) { }

  ngOnInit() { 
    this.auth$ = this._authService.auth$;

    this.auth$.subscribe(data => {

      this.nome = data.nome || 'USUÁRIO DESCONHECIDO';
      this.sobrenome = data.sobrenome || '';
      
      if (data && data['Endereco']) {
        const { rua, numero, cidade, estado } = data.Endereco;
        this.enderecoCompleto = `${rua}, ${numero} - ${cidade}/${estado}`;
      }
      
    });
  }

}
