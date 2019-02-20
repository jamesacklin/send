<template>
  <div class="contest">
      <div id="contest-target"></div>
  </div>
</template>

<script>
// Import jQuery for DOM manipulation stuff (oof)
import jQuery from 'jquery'
let $ = jQuery

export default {
  props: [
    'platform',
    'embedCode'
  ],
  mounted () {
    // If the contest is a Surveymonkey form...
    if (this.platform === 'Surveymonkey'){
      // Test for script contents in the embedCode prop
      var re = /<script\b[^>]*>([\s\S]*?)<\/script>/gm
      var match
      while (match = re.exec(this.embedCode)) {
        // If we find a match in the embed code...
        // Create a script element
        let contestScript = document.createElement('script')
        // Set an ID so we can destroy it later
        contestScript.setAttribute('id', 'contest-script')
        // match[1] is the matched string itself, sans script tags
        // Set the innerHTML to the matched script string
        contestScript.innerHTML = match[1]
        // Appends the script to the head
        document.head.appendChild(contestScript)
        // Now, set up a MutationObserver to watch for the widget to mount
        var observer = new MutationObserver(callback);
        // Watch the body for childList, attribute, and subtree changes
        observer.observe(document.body, {
          childList: true,
          attributes: true,
          subtree: true
        })
        // Called when a mutation is observed
        function callback(mutationList, observer){
          // Examine each mutation 
          mutationList.forEach(function(mutation){
            // If the mutation target className is this string, the Surveymonkey widget has mounted,
            // probably not at all where we want the widget to actually display
            if (mutation.target.className === 'smcx-widget smcx-embed smcx-show smcx-widget-dark'){
              // Rip the widget out and put it where we want to on the page
              $('.smcx-widget').appendTo('#contest-target')
            }
          })
        }
      }
    } // ... or if the contest is a Rafflecopter giveaway
    else if (this.platform === 'Rafflecopter'){
      let contestScript = document.createElement('script')
      // Sets some attributes
      contestScript.setAttribute(
        'src',
        'https://widget-prime.rafflecopter.com/launch.js'
      )
      contestScript.setAttribute('id', 'contest-script')
      // Append the script to the head
      document.head.appendChild(contestScript)
      // Insert widget into target
      var widget = this.embedCode
      $(widget).appendTo('#contest-target')
    }
  },
  beforeDestroy() {
    // Find the contest-script in the head and destroy it
    $("#contest-script").remove()
    // Destroy the widget target
    $('#contest-target').remove()
    // Destroy some other Surveymonkey hooks
    $('#__smcx__').remove()
    // Destroy the Surveymonkey SDK script, which is also loaded for some reason
    $('#smcx-sdk').remove()
    // Remove all iframes while we're at it
    $('iframe').remove()
  }
}
</script>

