let currDropDown = null;

document
  .querySelector(".menu-btn")
  .addEventListener("click", () =>
    document.querySelector(".middle-nav").classList.toggle("show")
  );

$(function () {
  $(".drop-down").on("click", handleDropDown);
});

function handleDropDown() {
  const dropdown = $(this).attr("id");

  if (dropdown !== currDropDown) {
    $("#" + dropdown)
      .children(".sub-menu-box")
      .addClass("showDropDown");

    $("#" + currDropDown)
      .children(".sub-menu-box")
      .removeClass("showDropDown");

    currDropDown = dropdown;
  } else {
    $("#" + currDropDown)
      .children(".sub-menu-box")
      .removeClass("showDropDown");

    currDropDown = null;
  }
}
