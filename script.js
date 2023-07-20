// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

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

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

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

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
