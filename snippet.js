window.runRepairSnippet = async function () {
  const problemCodes = {
    "1": "F1A01",
    "2": "F1A02",
    "3": "F1D01",
    "4": "F1G11",
    "5": "F1F04",
    "6": "F1K06"
  };

  let repeat = true;

  while (repeat) {
    const selected = prompt("1 = no power, 2 = no video, 3 = lan fail, 4 = usb c fail, 5 = won't charge, 6 = damage", "1");
    const finalCode = problemCodes[selected] || selected;
    $("#txtPROBCD").val(finalCode);

    // Simulace volání backendu pro získání popisu problému
    const description = await getProblemDescription(finalCode);
    $("#txtREPACOMENT").val(description);

    const location = prompt("Zadej lokaci součástky:")?.toUpperCase() || "";
    $("#txtLocation").val(location);

    // Alert po zadání lokace
    const continueInput = confirm("Chceš zadat další součástku?");
    repeat = continueInput;

    // Automatické vyplnění PN
    $("#txtDefectPN").val("ABC123");
    $("#txtReplacePN").val("ABC123");

    // Přidání do tabulky
    addToTable();
  }

  // Simulace backendového volání
  async function getProblemDescription(code) {
    // Zde by normálně proběhl AJAX request na backend
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

  // Přidání do tabulky
  function addToTable() {
    const table = $("#repairTable tbody");
    const row = $("<tr></tr>");

    const fields = [
      "#txtLocation",
      "#txtDefectPN",
      "#txtPROBCD"
    ];

    fields.forEach(selector => {
      const cell = $("<td></td>").text($(selector).val());
      row.append(cell);
    });

    table.append(row);
  }
};
