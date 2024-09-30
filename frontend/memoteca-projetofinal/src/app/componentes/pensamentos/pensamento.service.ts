import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PensamentoService {

  constructor(private httpClient: HttpClient) {}

  private apiUrl = environment.erpLink;
  private readonly API_ = `${this.apiUrl}/st-api-cadastro-pensamento/administracao/pensamento`;

  static MENU_PATH = '/listarPensamento';

  private readonly PAGE= 1; // aqui vira do front end os dados ref a paginação dos registros,
  private readonly LENGTH = 100; //

  public all_(): Observable<Pensamento[]> {
    return this.httpClient.get<Pensamento[]>(`${this.API_}/all/${this.PAGE}/${this.LENGTH}`);
  }

  public all(page: number, size: number, filtro: string, favoritos: boolean): Observable<Pensamento[]> {

    const itensPorPagina = 10;

    let params = new HttpParams()
      .set("_page", page)
      .set("_limit", itensPorPagina)

    if(filtro.trim().length > 2) {
      params = params.set("q", filtro)
    }

    if(favoritos) {
      params = params.set("favorito", true)
    }
    return this.httpClient.get<Pensamento[]>(`${this.API_}/all/${page}/${size}`, { params})
  }

  public updateFavorite(pensamento: Pensamento): Observable<Pensamento> {
    pensamento.favorito = !pensamento.favorito
    return this.create(pensamento, true)
  }

  public create(pensamento: Pensamento, isEditar?: Boolean): Observable<any> {

    if (isEditar)
        return this.httpClient.put<any>(`${this.API_}/update/${pensamento.id}`, pensamento);
      else return this.httpClient.post<any>(`${this.API_}/create`, pensamento);

  }

  public delete(id: number): Observable<Pensamento> {
    return this.httpClient.delete<Pensamento>(`${this.API_}/delete/${id}`);
  }

  public find(id: number): Observable<Pensamento> {
    return this.httpClient.get<Pensamento>(`${this.API_}/find/${id}`);
  }

  public findByFilters(pensamento: Pensamento, filters: string , page: number, size: number ): Observable<any> {

      const itensPorPagina = 6
      let params = new HttpParams()
      .set("_page", page)
      .set("_limit", size)
      .set("favorito", true)

      if (filters.trim.length >2)
        params = params.set("q", filters)

      // aqui uma busca livre filtrando por uma determinada propriedade, consome recurso.
      // const filtrosStr = FilterUtils.convertToString(this.pensamento); alterado para receber o proprio objeto no filtro.
      return this.httpClient.post<any>(`${this.API_}/findByFilters/${page}/${size}`, pensamento);
  }

}
