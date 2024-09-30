import { AbstractModel } from '../../core/models/abstract.model';
import { PermissaoMenu } from './permissoes-usuario/permissao-usuario/permissao-usuario-lista-permissoes/permissao-menu.model';
import { MenuItemCompleto } from '../../shared/menu/menuitemcompleto.model';

export class Permissao extends AbstractModel {

    public descricao!: string;
    public diasSemanaAcesso!: string[];
    public periodosAcesso!: { dataInicial: Date, dataFinal: Date }[];
    public horariosAcesso!: { horarioInicial: Date, horarioFinal: Date }[];
    public gestorAcessos!: boolean;

}
