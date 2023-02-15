// import Script from 'next/script'

// export default function MessengerChat({ pageId }) {
//   return (
//     <div>
//       <div id='fb-root'></div>
//       <div id='fb-customer-chat' className='fb-customerchat'></div>
//       <Script strategy='lazyOnload'>
//         {`
//             var chatbox = document.getElementById('fb-customer-chat');
//             chatbox.setAttribute("page_id", "${pageId}");
//             chatbox.setAttribute("attribution", "biz_inbox");

//             window.fbAsyncInit = function() {
//               FB.init({
//                 xfbml            : true,
//                 version          : 'v14.0'
//               });
//             };

//             (function(d, s, id) {
//               var js, fjs = d.getElementsByTagName(s)[0];
//               if (d.getElementById(id)) return;
//               js = d.createElement(s); js.id = id;
//               js.src = 'https://connect.facebook.net/nb_NO/sdk/xfbml.customerchat.js';
//               fjs.parentNode.insertBefore(js, fjs);
//             }(document, 'script', 'facebook-jssdk'));
//         `}
//       </Script>
//     </div>
//   )
// }

import { useEffect } from 'react'

function init(pageId) {
  var chatbox = document.getElementById('fb-customer-chat')
  chatbox.setAttribute('page_id', pageId)
  chatbox.setAttribute('attribution', 'biz_inbox')

  window.fbAsyncInit = function () {
    FB.init({
      xfbml: true,
      version: 'v14.0',
    })
  }
  ;(function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0]
    if (d.getElementById(id)) return
    js = d.createElement(s)
    js.id = id
    js.src = 'https://connect.facebook.net/nb_NO/sdk/xfbml.customerchat.js'
    fjs.parentNode.insertBefore(js, fjs)
  })(document, 'script', 'facebook-jssdk')
}

function cleanup() {
  ;(function (d, id) {
    var target = d.getElementById(id)
    if (target) {
      target.parentNode.removeChild(target)
    }
  })(document, 'facebook-jssdk')

  delete window.FB
}

export default function MessengerChat({ pageId }) {
  useEffect(() => {
    init(pageId)
    return () => cleanup()
  }, [])

  return (
    <div>
      <div id='fb-root'></div>
      <div id='fb-customer-chat' className='fb-customerchat'></div>
    </div>
  )
}
