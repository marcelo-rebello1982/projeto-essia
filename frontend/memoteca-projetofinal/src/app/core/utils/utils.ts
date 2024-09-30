import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { SelectOption } from '../../core/components/select-option.model';
import { environment } from '../environments/environment';
import { Enum } from '../models/enum.model';

export class Utils {

    public static readonly PERCENT_MASK = { prefix: '', precision: 2, suffix: ' %' };
    public static readonly NUMBER_MASK = { prefix: '', precision: 0, suffix: '' };
    public static readonly FILTER_OPEN_TIMEOUT = 500;

    static apenasNumeros(value: string): string {

        if (!value) { return ''; }

        return value.replace(/\D/g, '');
    }

    /**
    * Returns TRUE if the first specified array contains all elements
    * from the second one. FALSE otherwise.
    *
    * @param {array} superset
    * @param {array} subset
    *
    * @returns {boolean}
    */
    static arrayContainsArray(superset: Array<any>, subset: Array<any>): boolean {
        if (!subset.length) {
            return false;
        }

        return subset.every((value) => {
            return superset.indexOf(value) >= 0;
        });
    }

    static removerEspacos(value: string) {

        if (!value) { return ''; }

        return value.replace(/\s/g, '');
    }

    static searchIgnoringSpecialCharacters(search: string, strToCompare: string): boolean {

        if (!search || !strToCompare) { return false; }
        const a = search.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const b = strToCompare.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return a.toLocaleLowerCase().indexOf(b.toLocaleLowerCase()) >= 0;
    }

    /**
     * Abre nova aba utilizando endereço informado em url.
     * @param {string} url Endereço para abrir nova aba.
     * @param {'_blank'|'_parent'|'_self'|'_top'} target Define o atributo target. O padrão é _blank.
     */
    static windowOpen(url: string, target: '_blank' | '_parent' | '_self' | '_top' = '_blank', legado = false) {

        if (!url) {
            console.error(`[Utils] Url não pode ser null.`);
            return '';
        }

        url = !url.startsWith(`/`) ? `/${url}` : url;
        const path = !legado ? `${environment.path}${url}` : url;

        window.open(path, target);
    }

    static goToUrl(url: string): void {
        if (!url) {
            console.error(`[Utils] Url não pode ser null.`);
            return;
        }

        window.open(url, '_blank');
    }

    /**
     * Converte um valor do tipo string ou array de string para array de números.
     * @param value Valor para conversão
     * @returns Array de números.
     */
    static stringToNumberArray(value: string | string[]): number[] {
        return !value ? [] : Array.isArray(value) ? value.map(v => +v) : [+value];
    }

    static enumToSelectOption(enums: Enum[], idsToSelect?: string[], idsToDisable?: string[]): SelectOption[] {

        return (enums || []).map(e => {

            const selectOption: SelectOption = {
                ...new SelectOption(),
                id: e.name,
                text: e.descricao,
                selected: (idsToSelect || []).includes(e.name),
                disabled: (idsToDisable || []).includes(e.name)
            };

            return selectOption;
        });
    }

    static newUUID(): string {
        return uuidv4();
    }

    static substring(str: string, start: number, end?: number, addEllipsis = false): string {

        if (!str) { return ''; }

        const subString = str.substring(start, end);

        if (addEllipsis && subString.length !== str.length) {
            return `${subString}...`;
        }

        return subString;
    }

}
