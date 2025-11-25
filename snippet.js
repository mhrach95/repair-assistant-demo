document.getElementById("btnRunSnippet").addEventListener("click", async () => {
  const problemCodes = {
    "1": "F1A01",
    "2": "F1A02",
    "3": "F1D01",
    "4": "F1G11",
    "5": "F1F04",
    "6": "F1K06"
  };

  let repeat = true;
  const commentBox = $("#txtREPACOMENT");

  while (repeat) {
    const selected = prompt("1 = no power, 2 = no video, 3 = lan fail, 4 = usb c fail, 5 = won't charge, 6 = damage", "1");
    const finalCode = problemCodes[selected] || selected;

    const location = prompt("Zadej lokaci součástky:")?.toUpperCase() || "";

    // Vyplnění polí
    if ($("#txtPROBCD3").val() === "") {
      $("#txtPROBCD3").val(finalCode);
    }

    const description = `Popis ${finalCode}`; // Simulace AJAX odpovědi
    const existingComment = commentBox.val();
    const newEntry = `${description} - changed ${location}`;
    const updatedComment = existingComment
      ? `${existingComment}, ${newEntry}`
      : newEntry;
    commentBox.val(updatedComment);

    // Simulace dalších polí
    $("#txtLocation").val(location);
    $("#txtDefectPN").val("ABC123");
    $("#txtReplacePN").val("ABC123");

    repeat = !confirm("OK pro hotovo, Cancel pro další součástku.");
    if (!repeat && commentBox.val()) {
      commentBox.val(commentBox.val() + ";");
    }
  }
});