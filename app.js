$(document).ready(function () {
  $("#btnRunSnippet").on("click", () => {
    if (typeof runRepairSnippet === "function") {
      runRepairSnippet();
    } else {
      alert("Snippet není dostupný.");
    }
  });

  $("#btnAddManual").on("click", () => {
    addCurrentPartToTable();
  });

  // Funkce pro přidání aktuální součástky do tabulky
  window.addCurrentPartToTable = function () {
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
  };
});
