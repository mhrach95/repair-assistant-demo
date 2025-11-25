window.runRepairSnippet = async function () {
  const problemCodes = {
    "1": "F1A01",
    "2": "F1A02",
    "3": "F1D01",
    "4": "F1G11",
    "5": "F1F04",
    "6": "F1K06"
  };

  const selected = prompt("1 = no power, 2 = no video, 3 = lan fail, 4 = usb c fail, 5 = won't charge, 6 = damage", "1");
  const finalCode = problemCodes[selected] || selected;

  const location = prompt("Zadej lokaci součástky:")?.toUpperCase() || "";
  const commentBox = $("#txtREPACOMENT");
  const existingComment = commentBox.val();
  const isFirst = !existingComment;

  if ($("#txtPROBCD3").val() === "") {
    $("#txtPROBCD3").val(finalCode);
  }

  const description = `Popis ${finalCode}`;
  const newEntry = `${description} - changed ${location}`;
  if (isFirst) {
    commentBox.val(newEntry);
  } else {
    commentBox.val(`${existingComment}, ${newEntry}`);
  }

  $("#txtLocation").val(location);
  $("#txtDefectPN").val("ABC123");
  $("#txtReplacePN").val("ABC123");
};
