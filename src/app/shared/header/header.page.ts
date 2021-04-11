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

      if (data && data['Usuario']) {
        const { nome, sobrenome } = data['Usuario'];
        const { rua, numero, cidade, estado } = data['Usuario']['Endereco'];

        this.nome = nome || 'USUÁRIO DESCONHECIDO';
        this.sobrenome = sobrenome || '';
        this.enderecoCompleto = `${rua}, ${numero} - ${cidade}/${estado}`;        
      }

    });
  }

}
