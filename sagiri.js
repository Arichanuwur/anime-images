const axios = require("axios");
const fs = require("node:fs");

const jsons = fs.readdirSync("json");
async function main() {

for (const json of jsons) {
  const arr = require(`./json/${json}`);
  const folder_name = json.split(".")[0];
  let i = 0;
  
for (const url of arr) {
  const req = await axios({
    responseType: "arraybuffer",
    method: "get",
    url
  }).then(function (res) { return res }).catch(function (err) {
    console.error(err.message);
    return false
  });

if (!req) continue;
if (!fs.existsSync(`./${folder_name}`)) fs.mkdirSync(`./${folder_name}`);

fs.writeFileSync(`./${folder_name}/${i}.png`, Buffer.from(req.data, "binary"));
console.log(`${folder_name} | ${i}.png written`);
i++;
}
}
}

main();