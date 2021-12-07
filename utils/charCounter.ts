export function countCharsInName(array: any[], char: string) {
    const arrMatches = array
            .map( i => i.name )
            .reduce( (a, b) => `${a}${b}`).toLowerCase()
            .match(new RegExp(char, 'g'));
          
    return (arrMatches || []).length;
}