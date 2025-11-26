window.runRepairSnippet = async function () {
  const problemCodes = {
    "1": "F1A01",
    "2": "F1A02",
    "3": "F1D01",
    "4": "F1G11",
    "5": "F1F04",
    "6": "F1K06"
  };

  // Přidání checkboxu do stránky (pokud ještě není)
  if (!document.getElementById("biosCheckbox")) {
    const box = document.createElement("div");
    box.style.cssText = `
      position:fixed; bottom:20px; left:20px;
      background:#fff; padding:10px; border:1px solid #ccc;
      font-family:sans-serif; z-index:9999;
    `;
    box.innerHTML = `
      <label><input type="checkbox" id="biosCheckbox"> Přidat "BIOS reflashed" do komentáře</label>
    `;
    document.body.appendChild(box);

    document.getElementById("biosCheckbox").addEventListener("change", (e) => {
      const commentBox = $("#txtREPACOMENT");
      let text = commentBox.val();
      const phrase = "BIOS reflashed";

      if (e.target.checked) {
        if (!text.includes(phrase)) {
          commentBox.val(text.trim() + (text.trim() ? ", " : "") + phrase);
        }
      } else {
        const updated = text.replace(/\s*,?\s*BIOS reflashed/, "").trim();
        commentBox.val(updated);
      }
    });
  }

  const commentMap = {}; // { "No Power": [PU8200, PU8700], "No Video": [PQ3000] }
  let repeat = true;

  while (repeat) {
    const selected = prompt("1 = no power, 2 = no video, 3 = lan fail, 4 = usb c fail, 5 = won't charge, 6 = damage", "1");
    const rawCode = problemCodes[selected] || selected;
    const finalCode = rawCode.toUpperCase();
    $("#txtPROBCD").val(finalCode);

    const location = prompt("Zadej lokaci součástky:")?.toUpperCase() || "";
    $("#txtLocation").val(location);

    const problemName = await getProblemDescription(finalCode);

    // Uložení lokace do mapy podle názvu problému
    if (!commentMap[problemName]) {
      commentMap[problemName] = [];
    }
    commentMap[problemName].push(location);

    // Vygenerování komentáře
    const commentParts = [];
    for (const [name, locations] of Object.entries(commentMap)) {
      commentParts.push(`${name} - changed ${locations.join(", ")}`);
    }
    $("#txtREPACOMENT").val(commentParts.join(", "));

    // Automatické vyplnění PN
    $("#txtDefectPN").val("ABC123");
    $("#txtReplacePN").val("ABC123");

    // Zavolání funkce ze stránky pro uložení do tabulky
    if (typeof window.addCurrentPartToTable === "function") {
      window.addCurrentPartToTable();
    }

    // Dotaz na pokračování
    repeat = confirm("Chceš zadat další součástku?");
  }

  // Volání popisu z externího JSON souboru
  async function getProblemDescription(code) {
    try {
      const response = await fetch("problems.json");
      const data = await response.json();
      return data[code.toUpperCase()] || code;
    } catch (err) {
      console.error("Chyba při načítání problems.json:", err);
      return code;
    }
  }
};

