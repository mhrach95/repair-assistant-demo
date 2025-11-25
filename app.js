$(document).ready(function () {
  $("#btnRunSnippet").on("click", () => {
    if (typeof runRepairSnippet === "function") {
      runRepairSnippet();
    } else {
      alert("Snippet není dostupný.");
    }
  });

  $("#btnAddRecord").on("click", () => {
    const table = $("#repairTable tbody");
    const row = $("<tr></tr>");

    const fields = [
      "#txtPROBCD3",
      "#txtLocation",
      "#txtDefectPN",
      "#txtReplacePN",
      "#txtREPACOMENT"
    ];

    fields.forEach(selector => {
      const cell = $("<td></td>").text($(selector).val());
      row.append(cell);
    });

    table.append(row);

    // Reset polí
    fields.forEach(selector => $(selector).val(""));
  });
});
