export function isNumeric(str: string): boolean {
          if (typeof str !== 'string' || str.length === 0) {
            return false;
          }
          return /^[0-9]+$/.test(str);
        }