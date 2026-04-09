export function processString(str: string): string {
  // Remove caracteres especiais e acentos, converte para minúsculas e adiciona hifens
  const lowerStr = str.toLowerCase();
  const normalizedStr = lowerStr
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const replacedStr = normalizedStr.replace(/[^a-z0-9]+/g, '-');
  const finalStr = replacedStr.replace(/^-+|-+$/g, ''); // Remove hifens no início e fim

  return finalStr;
}
