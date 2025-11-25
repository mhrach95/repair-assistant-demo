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
      <label><input type="checkbox" id="biosCheckbox"> Přidat "reflashed bios" do komentáře</label>
    `;
    document.body.appendChild(box);

    document.getElementById("biosCheckbox").addEventListener("change", (e) => {
      const commentBox = $("#txtREPACOMENT");
      let text = commentBox.val();
      const phrase = "reflashed bios";

      if (e.target.checked) {
        if (!text.includes(phrase)) {
          commentBox.val(text.trim() + (text.trim() ? ", " : "") + phrase);
        }
      } else {
        const updated = text.replace(/\s*,?\s*reflashed bios/, "").trim();
        commentBox.val(updated);
      }
    });
  }

  let repeat = true;

  while (repeat) {
    const selected = prompt("1 = no power, 2 = no video, 3 = lan fail, 4 = usb c fail, 5 = won't charge, 6 = damage", "1");
    const finalCode = problemCodes[selected] || selected;
    $("#txtPROBCD").val(finalCode);

    // Simulace backendového volání pro popis
    const description = await getProblemDescription(finalCode);
    $("#txtREPACOMENT").val(description);

    const location = prompt("Zadej lokaci součástky:")?.toUpperCase() || "";
    $("#txtLocation").val(location);

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

  async function getProblemDescription(code) {
    const descriptions = {
      "F1A01": "No Power",
      "F1A02": "No Video",
      "F1D01": "LAN Fail",
      "F1G11": "USB-C Fail",
      "F1F04": "Won't Charge",
      "F1K06": "Physical Damage"
    };
    return new Promise(resolve => {
      setTimeout(() => resolve(descriptions[code.toUpperCase()] || "Neznámý problém"), 300);
    });
  }
};
