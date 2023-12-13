import * as p from "@clack/prompts";
import { writeFile } from "fs/promises";
import * as jsonSchemaToTypescript from "json-schema-to-typescript";
import * as tsToZod from "ts-to-zod";
import prettier from "prettier";

async function main() {
  p.intro("Welcome the tauri config extractor!");

  const configFilePath: string | symbol = await p.select({
    message: "Which version do you want?",
    options: [
      {
        value:
          "https://raw.githubusercontent.com/tauri-apps/tauri/dev/core/tauri-config-schema/schema.json",
        label: "dev",
      },
    ],
  });

  if (typeof configFilePath === "symbol") {
    throw new Error("Unexpected error");
  }

  const jsonSchema = await fetch(configFilePath).then((res) => res.json());

  const typescriptInterfaces = await jsonSchemaToTypescript.compile(
    jsonSchema,
    "config",
    { bannerComment: "" }
  );

  const zodSchemas = await tsToZod
    .generate({
      sourceText: typescriptInterfaces,
      keepComments: true,
    })
    .getZodSchemasFile("tauri-config")
    .split("\n")
    .slice(1)
    .join("\n");

  await writeFile(
    `./tauri.schemas.ts`,
    await prettier.format(zodSchemas, { parser: "typescript" })
  );

  p.outro("Et voilà! 🥳");
}

main().catch(console.error);
