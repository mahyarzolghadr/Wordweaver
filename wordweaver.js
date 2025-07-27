const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => {
    rl.question(question, answer => resolve(answer.trim()));
  });
}
function generateCasePermutations(word, level) {
  if (level <= 0 || level >= word.length || word.length === 0) return [];

  const result = new Set();

  function getCombinations(arr, k) {
    const res = [];
    const combine = (prefix, rest, k) => {
      if (k === 0) {
        res.push(prefix);
        return;
      }
      for (let i = 0; i <= rest.length - k; i++) {
        combine(prefix.concat(rest[i]), rest.slice(i + 1), k - 1);
      }
    };
    combine([], arr, k);
    return res;
  }

  const indices = Array.from({ length: word.length }, (_, i) => i);
  const selectedLevels = Array.isArray(level) ? level : [level];

  for (const lvl of selectedLevels) {
    if (lvl <= 0 || lvl >= word.length) continue;

    const combos = getCombinations(indices, lvl);
    combos.forEach(combo => {
      const chars = word.toLowerCase().split('');
      combo.forEach(i => {
        chars[i] = chars[i].toUpperCase();
      });
      result.add(chars.join(''));
    });
  }

  return Array.from(result);
}



function generateWordlist(data) {
  const { name, lastname, nickname, birth, city, partner, pet, number, extraWords } = data;
  let base = [name, lastname, nickname, city, partner, pet].filter(Boolean).map(s => s.toLowerCase());
  const extras = [birth, number].filter(Boolean);
  const combinations = new Set();

  if (data.caseLevels && data.caseLevels.length > 0) {
    const newBase = [...base];
    base.forEach(word => {
      const perms = generateCasePermutations(word, data.caseLevels);
      newBase.push(...perms);
    });
    base = newBase;
  }
  
  if (extraWords && extraWords.length > 0) {
    base = base.concat(extraWords);
  }

  
  const patterns = [
    a => a,
    a => a.charAt(0).toUpperCase() + a.slice(1),
    (a, b) => `${a}${b}`,
    (a, b) => `${a}@${b}`,
    (a, b) => `${a}!${b}`,
    (a, b) => `${a}$${b}`,
    (a, b) => `${a}_${b}`,
    (a, b) => `${a}.${b}`,
    (a, b) => `${a}123`,
    (a, b) => `${a}!`,
    (a, b) => `${a}1`,
    (a, b) => `${a}2024`,
    (a, b) => `${a}2025`,
    (a, b) => `${a}#1`,
    (a, b) => `${b}${a}`,
  ];

  base.forEach(a => {
    patterns[0] && combinations.add(patterns[0](a)); // name
    patterns[1] && combinations.add(patterns[1](a)); // Name

    extras.forEach(b => {
      combinations.add(a + b);       // name1995
      combinations.add(b + a);       // 1995name
      combinations.add(a + '@' + b); // name@1995
      combinations.add(a + '!' + b); // name!1995
    });

    base.forEach(b => {
      if (a === b) return;
      patterns.slice(2).forEach(pattern => {
        combinations.add(pattern(a, b));
        combinations.add(pattern(a.charAt(0).toUpperCase() + a.slice(1), b));
      });
    });
  });

  return Array.from(combinations);
}

function saveToFile(words, filename) {
  const outputPath = `./output/${filename}.txt`;
  fs.writeFileSync(outputPath, words.join('\n'));
  console.log(`\n✅ Your wordlist has been woven into destiny:`);
  console.log(`>>>  ${outputPath}`);
  console.log(`>>>  ${words.length} passwords generated`);
}

(async () => {
  console.log(`
  ╔════════════════════════════════╗
  ║           🕸️ WORDWEAVER        ║
  ║    The Password Spellbook CLI  ║
  ╚════════════════════════════════╝
  `);

  if (!fs.existsSync('./output')) fs.mkdirSync('./output');

    const data = {
    name: await ask(">>> First name: "),
    lastname: await ask(">>> Last name (optional): "),
    nickname: await ask(">>> Nickname (optional): "),
    birth: await ask(">>> Birth year (e.g. 1990, optional): "),
    city: await ask(">>> City (optional): "),
    partner: await ask(">>> Partner's name (optional): "),
    pet: await ask(">>> Pet's name (optional): "),
    number: await ask(">>> Favorite number (e.g. 7, 123, optional): ")
  };

  const extrasInput = await ask(">>> Extra words? (comma-separated: football,red,123): ") || "";
  data.extraWords = extrasInput.split(',')
                                .map(word => word.trim().toLowerCase())
                                .filter(word => word.length > 0);
  const caseLevelInputRaw = await ask(">>> Case permutations? (e.g. Ahmad, aHmad). Enter level (2,3 or 2,3): ");
  const caseLevelInput = caseLevelInputRaw.trim();
  data.caseLevels = [];

  if (caseLevelInput) {
    data.caseLevels = caseLevelInput.split(',')
      .map(lvl => parseInt(lvl.trim(), 10))
      .filter(lvl => !isNaN(lvl) && lvl >= 2 && lvl < 10); 
  }

  const filename = await ask(">>>  Output filename (no extension): ") || "wordweaver_output";

  console.log("\n>>>  Weaving your words into passwords...");
  const wordlist = generateWordlist(data);
  saveToFile(wordlist, filename);

  rl.close();
})();