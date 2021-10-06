import nodeHtmlToImage from "node-html-to-image";
import chrome from "chrome-aws-lambda";

export default async function helloAPI(req, res) {
  const { text } = req.query;

  try {
    const image = await nodeHtmlToImage({
      puppeteerArgs: {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      },
      html: `
      <html>
      <head>
      <script src="https://cdn-tailwindcss.vercel.app/"></script>
      </head>
      <div class="flex items-center justify-center h-screen">
      ${text}
      </div>
      </html>
      `,
    });

    res.status(200).json({ source: image.toString("base64") });
  } catch (e) {
    console.log(e);
    res.status(500).send("An error occurred", e);
  }
}
