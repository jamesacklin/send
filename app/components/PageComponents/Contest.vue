<template>
  <div class="contest">
      <div id="target"></div>
  </div>
</template>

<script>
import jQuery from 'jquery'
let $ = jQuery

export default {

  props: [
    'platform',
    'embedCode'
  ],
  mounted () {
    var re = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
    var match;
    while (match = re.exec(this.embedCode)) {
      let monkeyScript = document.createElement('script')
      // Sets some attributes      
      monkeyScript.setAttribute('id', 'contest-script')
      monkeyScript.innerHTML = match[1]
      // Appends the script to the head
      console.log('adding script to head')
      document.head.appendChild(monkeyScript)
      var targetNode = document.body
      var observerOptions = {
        childList: true,
        attributes: true,
        subtree: true
      }
      var observer = new MutationObserver(callback);

      observer.observe(targetNode, observerOptions);

      function callback(mutationList, observer){ 
        mutationList.forEach(function(mutation){
          console.log(mutation)
          if (mutation.target.className === 'smcx-widget smcx-embed smcx-show smcx-widget-dark'){
            $('.smcx-widget').appendTo('#target');
          }
        })
      }
    }
  },
  beforeDestroy() {
    let contestScript = document.getElementById('contest-script')
    console.log('removing contest script')
    $("#contest-script").remove();
    $('#__smcx__').remove();
    $('iframe').remove();
  },
  beforeMount() {




    // if (this.platform === 'Surveymonkey'){
    
    // } else if (this.platform === 'Rafflecopter'){
    //   // TODO: Put this behind some conditional
    //   let raffleScript = document.createElement('script')
    //   // Sets some attributes
    //   raffleScript.setAttribute(
    //     'src',
    //     'https://widget-prime.rafflecopter.com/launch.js'
    //   )
    //   raffleScript.setAttribute('id', 'contest-script')
    //   // Appends the script to the head
    //   document.head.appendChild(raffleScript)
    // }
  }
}
</script>

