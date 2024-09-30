export class NumberUtils {

    public static readonly SCALE_MONEY = 2;
    public static readonly MAX_PERCENT = 100;
    public static readonly UM_CENTAVO = 0.01;

    static avg(values: number[], precision = 2): number {

        if (!values?.length) { return 0; }

        const sum = values.reduce((a, b) => a + b);
        return parseFloat((sum / values.length).toFixed(precision));
    }

    static getValueByPercentage(valueReference: number, percentage: number): number {

        if (!percentage) { return 0; }

        const valorCalculado = percentage / 100;
        return valueReference * valorCalculado;
    }

    static getPercentageByValue(value: number, valueReference: number): number {

        const divisor = !valueReference ? 1 : valueReference;

        const valorCalculado = value / divisor;
        return valorCalculado * 100;
    }

    static toFixed(value: number, precision = 2): number {

        const v = value ? value : 0;
        return +v.toFixed(precision);
    }

    static toString(value: number ): string | undefined {
        return value == null ? undefined : `${value}`;
    }

    static sort(a: number, b: number, order: 'asc' | 'desc' = 'asc'): number {

        switch (order) {
            case 'desc':
                if (b < a) {
                    return -1;
                } else if (b > a) {
                    return 1;
                }

                break;

            case 'asc':
            default:
                if (a < b) {
                    return -1;
                } else if (a > b) {
                    return 1;
                }

                break;
        }

        return 0;
    }

}
