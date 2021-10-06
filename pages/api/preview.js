import nodeHtmlToImage from "node-html-to-image";

export default async function helloAPI(req, res) {
  const { text } = req.query;

  try {
    const image = await nodeHtmlToImage({
      html: `
      <html>
      <head>
      <script src="https://cdn-tailwindcss.vercel.app/"></script>
      </head>
      <div class="flex items-center justify-center h-screen">
      <div class="${text}"></div>
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
