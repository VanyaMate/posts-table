export const cn = function (...classNames: (string | null | undefined)[]): string {
    return classNames.filter((className) => className).join(' ');
}