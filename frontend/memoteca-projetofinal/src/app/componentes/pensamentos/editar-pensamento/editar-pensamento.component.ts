import { Router, ActivatedRoute } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Pensamento } from './../pensamento';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css'],
})
export class EditarPensamentoComponent implements OnInit {

  id!: number;
  formGroup!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { this.id = this.route.snapshot.params['id']; }

  ngOnInit(): void {

    this.update();
  }

  public create() {
    this.service.create(this.formGroup.value).subscribe(() => {
      this.router.navigate([PensamentoService.MENU_PATH]);
    });
  }

  public update() {

    const id = this.id;
    this.service.find(id).subscribe((pensamento) => {
      this.formGroup = this.fb.group({
        id: [pensamento.id],
        conteudo: [pensamento.conteudo, Validators.compose([ Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
        autoria: [pensamento.autoria, Validators.compose([ Validators.required, Validators.minLength(3)])],
        modelo: [pensamento.modelo],
        favorito: [pensamento.favorito]
      })
    })
  }

  public cancelar() {
    this.router.navigate([PensamentoService.MENU_PATH]);
  }

  public find() {
  }

  habilitarBotao(): string {
    if (this.formGroup.valid) {
      return 'botao';
    } else return 'botao__desabilitado';
  }
}
