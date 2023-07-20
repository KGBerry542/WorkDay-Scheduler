// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Function to save user input in local storage
  function saveUserInput() {
    $(".saveBtn").on("click", function () {
      // Get the description value from the corresponding textarea
      const userInput = $(this).siblings(".description").val();

      // Get the id of the containing time-block (e.g., "hour-9")
      const timeBlockId = $(this).parent().attr("id");

      // Save the user input in local storage using the time block id as the key
      localStorage.setItem(timeBlockId, userInput);
    });
  }

  // Call the function to add the click event listener on the save button
  saveUserInput();

  // Function to update the time-block classes based on current time
  function updateTimeBlocks() {
    // Get the current hour and minutes using Day.js in 24-hour format
    const currentTime = dayjs();
    const currentHour = currentTime.hour();
    const currentMinutes = currentTime.minute();

    // Loop through each time-block
    $(".time-block").each(function () {
      // Get the hour from the id attribute of the time-block (e.g., "hour-6" -> 6)
      const timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

      // Remove all classes and then add the appropriate class based on the comparison
      $(this).removeClass("past present future");
      if (timeBlockHour < currentHour) {
        $(this).addClass("past");
      } else if (timeBlockHour === currentHour) {
        $(this).addClass(currentMinutes >= 0 ? "present" : "future");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // Call the function to update the time-block classes
  updateTimeBlocks();

  // Function to get saved user input from localStorage
  function loadSavedInput() {
    // Loop through each time-block
    $(".time-block").each(function () {
      // Get the id of the time-block (e.g., "hour-6")
      const timeBlockId = $(this).attr("id");

      // Get the saved user input from localStorage using the time block id as the key
      const savedInput = localStorage.getItem(timeBlockId);

      // Set the value of the textarea to the saved user input, if it exists
      if (savedInput) {
        $(this).find(".description").val(savedInput);
      }
    });
  }

  // Call the function to load saved user input
  loadSavedInput();

  const currentDate = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDate);
});
