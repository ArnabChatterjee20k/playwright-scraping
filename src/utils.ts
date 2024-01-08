interface Output {
  title: string;
  body: string;
  code: string;
}
import fs from "fs/promises";
export async function generateOutput(out: Output) {
  const output = await fs.readFile("output.json",{encoding:"utf-8"})
  const data:Output[] = output?JSON.parse(output):[]
  data.push(out)
  return fs.writeFile("output.json", JSON.stringify(data));
}
