chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);


      function checkForEditBar() {
        var cS = document.querySelector('.clone_story'),
        btn = document.createElement('button'),
        ed = document.querySelector('.edit .controls'),
        generateStory;

        if (!ed) { return; }
        if ($(ed).find('.story_template').length) { return; }

        ed.style.width = '311px';
        btn.className = 'left_endcap hoverable story_template';
        btn.title = "Apply description template to this story";
        btn.innerHTML = '<img src="//i.imgur.com/qvQ83UA.png">';
        cS.className = cS.className + ' capped';
        cS.insertAdjacentElement('beforebegin', btn);

        btn.querySelector('img').style.marginLeft = '-2px';
        btn.querySelector('img').style.marginTop = '1px';
        btn.addEventListener('click', generateStory, true);

        function generateStory(e) {
          var nextSection = $(btn).parents('.model_details').eq(0).next(),
              textArea = nextSection.find('.editor.tracker_markup.description'),
              existingData = textArea.val(),
              ev = new jQuery.Event('keyup'),
              markdown = "### Context\n---\n\n*Include background details for this story here*\n\n### How To Demo\n---\n\n1. *Start your demo here*\n\n### Implementation Details\n---\n\n*Include technical details or considerations here*\n\n### Design/UX Details\n---\n\n*Include design details or considerations here*\n\n";
          ev.which = 13;
          ev.keyCode = 13;
          nextSection.find('.rendered_description').trigger('click');
          if (textArea.val()) {
            if (textArea.val() === markdown) {
              alert("The description for this story already matches the current template.");
            } else if (confirm('Existing description content will be placed at the bottom. Would you like to continue?')) {
              markdown += "\n\n### Original Content\n---\n\n";
              textArea.val(markdown + existingData)
            }
          } else {
            textArea.val(markdown);
          }

          nextSection.find('button[id^="story_description_done_"]').trigger('click');

          e.preventDefault();
        }

      }

      $('body').on('DOMSubtreeModified', function(e) {
        checkForEditBar();
      });

    }
  }, 10);
});
