import { Injectable } from '@angular/core';

@Injectable()
export class DataUtils {

    static conveterString(data: Date): string {
        const lang = 'pt-BR';
        return `${data.toLocaleDateString(lang)} ${data.toLocaleTimeString(lang)}`;
    }

    static addMeses(quantidade: number, em: Date = new Date()): Date {

        // Acresenta meses à data atual, sendo que, se o dia não existir no mes alvo, coloca o último dia possível para o mes.
        const mes = new Date(em).getMonth() + quantidade;
        const dataAlvo = new Date(new Date(new Date(em).setDate(1)).setMonth(new Date(em).getMonth() + quantidade));
        let data = new Date(new Date(em).setMonth(new Date(em).getMonth() + quantidade));

        // Coloca 0 no dia para setar o último dia do mes. Aqui também volta um mes.
        if (data.getMonth() !== dataAlvo.getMonth()) {
            data = new Date(data.setDate(0));
        }

        return data;
    }

    static addMinutes(quantidade: number, date = new Date()): Date {

        return new Date(new Date(date).setMinutes(new Date(date).getMinutes() + quantidade));
    }

    static addHours(quantidade: number, date = new Date()): Date {

        return new Date(new Date(date).setHours(new Date(date).getHours() + quantidade));
    }

    static addDias(quantidade: number, em: Date = new Date()): Date {

        return new Date(new Date(em).setDate(new Date(em).getDate() + quantidade));
    }

    static decrementarDias(quantidade: number, em: Date = new Date()): Date {

        return new Date(new Date(em).setDate(new Date(em).getDate() - quantidade));
    }

    /**
     * Compara duas datas, retornando: 0 se forem iguais, -1 se d1 for menor que d2 e 1 se  d1 for maior que d2.
     * @param d1 Data base
     * @param d2 Data para comparar
     */
    static compare(d1: Date, d2: Date): number {

        const calc = d1.getTime() - d2.getTime();

        return calc === 0 ? 0 : calc > 0 ? 1 : -1;
    }



    static get dataInicialMesAtual(): Date {

        return new Date(new Date().setDate(1));
    }

    static get dataFinalMesAtual(): Date {

        let data = new Date();
        data = new Date(data.getFullYear(), data.getMonth() + 1, 0);

        return data;
    }

    static get primeiroDiaAnoAtual(): Date {

        return new Date(new Date(new Date().setDate(1)).setMonth(0));
    }

    /**
     * Retorna de forma númerica a quantidade de dias corridos desde a data informada até a data atual
     * @param data Data usada para calcular
     * @returns Quantidade de dias até a data informada
     */
    static calcularDiasAteHoje(data: Date): number {
        const diferencaTempo = new Date(Date.now()).getTime() - new Date(data).getTime();
        const diferencaDias = Math.ceil(diferencaTempo / (1000 * 3600 * 24));
        return diferencaDias;
    }

    /**
     * Obtém o período, utilizando o mês atual - 30 dias.
     * @returns Array contendo data inicial e data final.
     */
    static get periodoUltimoMes(): Date[] {

        const dataInicial = new Date();
        dataInicial.setDate(dataInicial.getDate() - 30);

        return [
            dataInicial,
            new Date(),
        ];
    }

    /**
     * Período com data inicial do mês atual até a data atual.
     * @returns Array contendo data inicial e data final.
     */
    static get periodoMesAtual(): Date[] {

        return [
            this.dataInicialMesAtual,
            new Date(),
        ];
    }

    /**
     * Recebe uma data, diminui um ano (deixando no ano passado) e retorna um novo objeto.
     * @param data
     */
    static decrementarUmAno(data: Date = new Date()): Date {

        const d = new Date(data.getFullYear() - 1, data.getMonth(), data.getDate());
        return d;
    }

    /**
     * Obtém o último dia do mês da data informada.
     * @param data Data para obter o último dia do mês ou data atual se nenhuma for informada.
     */
    static ultimoDiaMes(data: Date = new Date()): Date {

        return new Date(data.getFullYear(), data.getMonth() + 1, 0);
    }

    static getLastDayOfTheMonth(data = new Date()): number {

        return DataUtils.ultimoDiaMes(data).getDate();
    }

    /**
     * Verifica se a data informada é hoje.
     * @param data Data para comparação com a data atual
     */
    static isToday(data: Date): boolean {

        const hoje = new Date();
        return data.getDate() === hoje.getDate()
            && data.getMonth() === hoje.getMonth()
            && data.getFullYear() === hoje.getFullYear();
    }

    /**
     * Compara duas datas e determina se "date" é antes de "compare".
     * @param date Data para comparar se é antes que "compare".
     * @param compare Data para comparar se "date" é antes ou data atual se não informado.
     * @param ignoreTime Determina se a hora será ignorada na comparação.
     */
    static isBefore(date: Date, compare: Date = new Date(), ignoreTime = false): boolean {

        let d1 = new Date(date);
        let d2 = new Date(compare);

        if (ignoreTime) {
            d1 = this.startOfDay(d1);
            d2 = this.startOfDay(d2);
        }

        return DataUtils.compare(d1, d2) < 0;
    }

    /**
    * Compara duas datas e determina se "date" é depois de "compare".
    * @param date Data para comparar se é depois que "compare".
    * @param compare Data para comparar se "date" é depois ou data atual se não informado.
    * @param ignoreTime Determina se a hora será ignorada na comparação.
    */
    static isAfter(date: Date, compare: Date = new Date(), ignoreTime = false): boolean {

        let d1 = new Date(date);
        let d2 = new Date(compare);

        if (ignoreTime) {
            d1 = this.startOfDay(d1);
            d2 = this.startOfDay(d2);
        }

        return DataUtils.compare(d1, d2) > 0;
    }

    /**
     * Verifica se duas datas são iguais.
     * @param date Data para comparação.
     * @param compare Data para comparação ou data atual se não informada.
     * @param ignoreTime Determina se a hora será ignorada na comparação.
     */
    static isEquals(date: Date, compare: Date = new Date(), ignoreTime = false): boolean {

        let d1 = new Date(date);
        let d2 = new Date(compare);

        if (ignoreTime) {
            d1 = this.startOfDay(d1);
            d2 = this.startOfDay(d2);
        }

        return DataUtils.compare(d1, d2) === 0;
    }

    /**
     * Verifica se a data informada ou data atual é o último dia do mês.
     * @param date Data para verificação ou data atual se não informado.
     */
    static isLastDayOfMonth(date: Date = new Date()): boolean {

        const d1 = new Date(date.getTime());
        d1.setDate(d1.getDate() + 1);

        return d1.getDate() === 1;
    }

    static removeTimezoneOffset(date: Date | null): Date | null {
      return !date ? null : new Date(date.getTime() - (date.getTimezoneOffset() * 1000 * 60));
   }
    static startOfDay(date = new Date()): Date {

        return new Date(date.setHours(0, 0, 0, 0));
    }

    static endOfDay(date = new Date()): Date {

        return new Date(date.setHours(23, 59, 59, 999));
    }

}
