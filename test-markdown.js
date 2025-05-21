const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Testovací skript pro načtení markdown souborů
async function testMarkdownLoading() {
  const filePath = path.join(process.cwd(), "public/locales/legal/terms.cs.md");
  console.log("Načítám soubor:", filePath);
  
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    console.log("Soubor načten, délka:", content.length);
    console.log("Obsah (prvních 100 znaků):", content.substring(0, 100));

    // Zkusíme zpracovat frontmatter
    console.log("Zpracování frontmatteru...");
    const { content: mdContent, data } = matter(content);
    console.log("Frontmatter data:", data);
    console.log("Markdown obsah (prvních 100 znaků):", mdContent.substring(0, 100));
    
    return { success: true, message: "Soubor úspěšně načten a zpracován" };
  } catch (error) {
    console.error("Chyba při načítání souboru:", error);
    return { success: false, message: error.message };
  }
}

// Spustíme test
testMarkdownLoading().then(result => {
  console.log("Výsledek testu:", result);
});
