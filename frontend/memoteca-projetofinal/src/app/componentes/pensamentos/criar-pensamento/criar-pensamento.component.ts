import { ActivatedRoute, Router } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from 'src/app/core/components/abstract.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent implements OnInit {

  id!: number;
  formGroup!: FormGroup;
  pensamento: Pensamento = new Pensamento();

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  public create() {

    if (this.formGroup.valid) {
      this.pensamentoService.create(this.formGroup.value, this.isEdicao).subscribe(() => {
          this.router.navigate([PensamentoService.MENU_PATH]);
        });
    }
    this.id = this.route.snapshot.params['id'];
  }

  get isEdicao(): boolean {
    return this.id !== undefined && this.id > 0;
  }

  ngOnInit(): void {
    this.validateForm();
  }

  habilitarBotao(): string {
    if (this.formGroup.valid) {
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }

  cancelar() {
    this.router.navigateByUrl(PensamentoService.MENU_PATH);
  }

  private validateForm() {
    this.formGroup = this.fb.group({
      conteudo: this.fb.control('', [
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
      ]),
      autoria: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      modelo: ['modelo1'],
      favorito: [false],
    });
  }
}
