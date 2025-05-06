$(document).ready(function () {
    // Replace the existing text
    $('#changeTextBtn').click(function () {
      $('#output').text('The text has been changed using jQuery!');
    });
  
    // Append new text to existing content
    $('#addTextBtn').click(function () {
      $('#output').append(' <br>Appended new content with jQuery.');
    });
  });
  