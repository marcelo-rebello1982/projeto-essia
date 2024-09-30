import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Permissao } from './permissao.model';
import { PermissaoAcesso } from './permissao-acesso.model';
import { Utils } from 'src/app/core/utils/utils';
import { PermissaoRotina } from './permissao-rotina.model';

@Injectable({
  providedIn: 'root',
})
export class PermissaoService {
  static BASE_PATH = 'erp/admin-geral/permissao-usuario';
  private readonly PATH = '/server/api/erp/permissao';
  private _permissoes: PermissaoAcesso[] = [];

  error: any;

  constructor(private httpClient: HttpClient, private titleService: Title) {}

  findAll(): Observable<Permissao[]> {
    return this.httpClient.get<Permissao[]>(`${this.PATH}`);
  }

  get permissoes(): PermissaoAcesso[] {
    return this._permissoes;
  }

  obterPorChave(chave: string): PermissaoAcesso {

    const permissao = this.permissoes.find((p) =>
      p.chave
        ? Utils.searchIgnoringSpecialCharacters(p.chave, chave)
        : Utils.searchIgnoringSpecialCharacters(p.nome, chave)
    );

    if (!permissao)
      throw new Error(`Permissão XXXX ( confirmar por usuario ) não encontrada para a chave: ${chave}`);
    else return permissao;
  }

  obterPermissoesPorChave(chave: string): PermissaoRotina[] {
    const permissao = this.obterPorChave(chave);
    return permissao ? permissao.permissoes : [];
  }
}
