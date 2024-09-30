import { PermissaoRotina } from './permissao-rotina.model';

export class PermissaoAcesso {

    public idMenuItem!: number;
    public nome!: string;
    public path!: string;
    public chave!: string;
    public acessoMenuCompleto!: string;
    public permitido!: boolean;
    public permissoes!: PermissaoRotina[];

}
