const consonants = [
    'କ', 'ଖ', 'ଗ', 'ଘ', 'ଙ',
    'ଚ', 'ଛ', 'ଜ', 'ଝ', 'ଞ',
    'ଟ', 'ଠ', 'ଡ', 'ଢ', 'ଣ',
    'ତ', 'ଥ', 'ଦ', 'ଧ', 'ନ',
    'ପ', 'ଫ', 'ବ', 'ଭ', 'ମ',
    'ଯ', 'ୟ', 'ର', 'ଲ', 'ଳ',
    'ଶ', 'ଷ', 'ସ', 'ହ', 'କ୍ଷ'
];

const vowels = [
    'ଅ', 'ଆ', 'ଇ', 'ଈ', 'ଉ', 'ଊ',
    'ଏ', 'ଐ', 'ଓ', 'ଔ'
];

const matras = [
    'ା', 'ି', 'ୀ', 'ୁ', 'ୂ', 'େ', 'ୈ', '୍ର',
    'ୋ', 'ୌ', 'ଂ', 'ଃ', 'ଁ', '୍',
    '୍ତ', '୍ତ୍ର', '୍ୱ', '୍ନ', '୍ୟ', '୍ମ',
];

const conjuncts = [
    'କ୍କ', 'କ୍ତ', 'କ୍ତ୍ର', 'କ୍ଷ', 'କ୍ଷ୍ଣ',
    'ଙ୍କ', 'ଙ୍କ୍ତ', 'ଚ୍ଚ', 'ଜ୍ଞ',
    'ଟ୍ଟ', 'ଣ୍ଟ', 'ଣ୍ଠ',
    'ତ୍ତ', 'ତ୍ର', 'ନ୍ତ', 'ନ୍ଧ', 'ନ୍ଦ',
    'ପ୍ତ', 'ପ୍ନ', 'ପ୍ର', 'ମ୍ପ',
    'ବ୍ର', 'ଦ୍ବ', 'ଦ୍ଧ', 'ଦ୍ଗ', 'ଦ୍ୱ',
    'ସ୍ତ', 'ସ୍ପ', 'ସ୍ମ', 'ହ୍ନ', 'ହ୍ମ',
    'ଣ୍ଡ', 'ଣ୍ଢ', 'ଦ୍ଡ'
];

const numbers = [
    '୦', '୧', '୨', '୩', '୪', '୫', '୬', '୭', '୮', '୯'
];

const keyToBoxMap = {
    V: 0,
    C: 1,
    M: 2,
    c: 3,
    N: 4
};

const keyToBoxMapName = {
    V: "Vowels",
    C: "Consonants",
    M: "Matras",
    c: "Conjuncts",
    N: "Numbers"
};

const boxArray = [
    {
        title: "Vowels",
        letters: vowels
    },
    {
        title: "Consonants",
        letters: consonants
    },
    {
        title: "Matras",
        letters: matras
    },
    {
        title: "Conjuncts",
        letters: conjuncts
    },
    {
        title: "Numbers",
        letters: numbers
    }
]


export { boxArray, keyToBoxMap, keyToBoxMapName };
