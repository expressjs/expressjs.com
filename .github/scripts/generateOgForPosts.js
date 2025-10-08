import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import satori from "satori";
import sharp from "sharp";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your posts folder
const postsDir = path.resolve("./_posts");

// Output folder for OG images
const outputDir = path.resolve("_site/images/og-images");

// font
const FONT_FILE_PATH = path.join(__dirname, '../../fonts/noto-sans-latin-700-normal.woff');

let font = await fs.readFile(FONT_FILE_PATH);

async function generateOgImage(title, date, outFile) {
    const eleObj = {
        type: 'div',
        props: {
            style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: 1200,
                height: 630,
                background: "radial-gradient(circle at center, #222222 0%, #000000 100%)",
                color: "white",
                fontFamily: "Noto Sans",
                padding: "50px",
                textAlign: "center",
            },
            children: [
                {
                    type: 'h1',
                    props: {
                        style: { fontSize: 64, margin: 0 },
                        children: title,
                    },
                },
                {
                    type: 'p',
                    props: {
                        style: { fontSize: 32, opacity: 0.7 },
                        children: date,
                    },
                },
            ],
        },
    };

    const svg = await satori(eleObj, { width: 1200, height: 630, fonts: [{ name: 'Noto Sans', data: font }] });

    const png = await sharp(Buffer.from(svg)).png({ quality: 100 }).toBuffer();

    await fs.mkdir(path.dirname(outFile), { recursive: true });
    await fs.writeFile(outFile, png);
    console.log(`✅ Generated OG image for: ${title}`);
}

async function run() {
    const files = await fs.readdir(postsDir);
    for (const file of files) {
        if (!file.endsWith(".md")) continue;

        const content = await fs.readFile(path.join(postsDir, file), "utf-8");
        const { data } = matter(content);

        const title = data.title || file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(".md", "").replace(/-/g, " ");
        const date = data.date || file.slice(0, 10);

        const outFile = path.join(outputDir, file.replace(".md", ".webp"));
        console.log(outFile)
        await generateOgImage(title, date, outFile);
    }
}

run().catch(console.error);
