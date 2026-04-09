const fs = require("fs");
const pkgPath = "./package.json";
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

// Pegar argumentos. Ex: node version-update.js --increment
const shouldIncrement = process.argv.includes("--increment");

if (shouldIncrement) {
  const parts = pkg.version.split(".");
  parts[2] = parseInt(parts[2]) + 1;
  pkg.version = parts.join(".");
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  console.log(`🔖 Versão incrementada no package.json para: ${pkg.version}`);
}

const { version } = pkg;
const versionTsPath = "./src/environments/version.ts";
const date = new Date();
const buildDate = date.toLocaleString("pt-BR");

const content = `
export const appVersion = '${version}';
export const buildDate = '${buildDate}';
`;

fs.writeFileSync(versionTsPath, content, { encoding: "utf8" });
console.log(`✔️ Arquivo ${versionTsPath} atualizado (v${version})`);

// Bonus: Sincronizar com o Android (build.gradle)
const gradlePath = "./android/app/build.gradle";
if (fs.existsSync(gradlePath)) {
  let gradleContent = fs.readFileSync(gradlePath, "utf8");

  // Atualizar versionName "X.X.X"
  gradleContent = gradleContent.replace(
    /versionName\s+".*"/,
    `versionName "${version}"`
  );

  // Atualizar versionCode (deve ser um inteiro)
  // Exemplo Simples: 2.5.4 -> 20504
  const [major, minor, patch] = version.split(".").map((v) => parseInt(v));
  const newCode = major * 10000 + minor * 100 + patch;

  gradleContent = gradleContent.replace(
    /versionCode\s+\d+/,
    `versionCode ${newCode}`
  );

  fs.writeFileSync(gradlePath, gradleContent);
  console.log(
    `🤖 Android sync: versionName "${version}", versionCode ${newCode}`
  );
}
