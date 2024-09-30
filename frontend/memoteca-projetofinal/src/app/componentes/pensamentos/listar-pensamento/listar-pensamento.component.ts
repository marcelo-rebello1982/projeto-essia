import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterUtils } from 'src/app/core/utils/filter-utils';
import { Observable } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

interface ListaPagamentoForm {
  conteudo: FormControl<string>;
}

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css'],
})
export class ListarPensamentoComponent implements OnInit {

  page: number = 1;
  size: number = 6;
  formGroup!: UntypedFormGroup;
  hasNext: boolean = true;
  filters: string = '';
  favoritos: boolean = false;
  titulo: string = 'Meu Mural';
  listaFavoritos: Pensamento[] = [];
  listaPensamentos: Pensamento[] = [];
  pensamento = new Pensamento();

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.findAll();
  }

  public createForm() {
    this.formGroup = this.fb.group({
      conteudo: this.fb.control('', [Validators.required, Validators.pattern('^[A-Za-z0-9]+$')]),
    });
  }

  public reloadComponents() {
    this.favoritos = false;
    this.page = 1;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

  public listFavorites() {
    this.titulo = 'Meus Favoritos';
    this.favoritos = true;
    this.hasNext = true;
    this.page = 1;
    this.pensamento.favorito = this.favoritos;

    this.service.findByFilters(this.pensamento, '', this.page, this.size).subscribe((listaPensamentosFavoritos) => {
        this.listaPensamentos = listaPensamentosFavoritos;
        this.listaFavoritos = listaPensamentosFavoritos;
      });
  }

  public findAll() {
    this.service.all(this.page, this.size, this.filters, this.favoritos).subscribe((listaPensamentos) => {
        this.listaPensamentos = listaPensamentos;
      });
  }

  public findByFilters() {

    // aqui esta filtrando por conteudo somente, poderia ser
    // montado um busca por qualquer propriedade em
    // pensamento com uma table mais especifica para cada campo.

    const formValue = this.formGroup.getRawValue();
    this.pensamento.conteudo = formValue.conteudo;

    if (this.formGroup.valid ) {
    this.service.findByFilters(this.pensamento, '', this.page, this.size).subscribe((listaPensamentos) => {
        this.listaPensamentos = listaPensamentos;
      });
    }
  }

  public loadNextPage() {
    this.service
      .all(++this.page, this.size, this.filters, this.favoritos)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos.push(...listaPensamentos);
        if (!listaPensamentos.length) {
          this.hasNext = false;
        }
      });
  }
}
