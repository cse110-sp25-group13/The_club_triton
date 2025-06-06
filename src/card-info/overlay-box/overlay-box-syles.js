export const styles= `
/* CSS for the content */
  .box{
    margin: 100px auto;
    padding: 20px;
    background: #fff;
    border: 1px solid #666;
    width: 13em;
    border-radius: 10px;
    box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    position: relative;
  }


  /* Default State: 
   as well as give the contrasting background of the overlay */
  .overlay{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    transition: opacity 200ms;
    visibility: hidden; /*hidden when not turn on*/
    opacity: 0;
  }

  /* Let the overlay take 100 % of the screen */
  .overlay .cancel{
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: default; /*cursor shows default appearance when hovering*/
  }

  /* Make the overlay is targetable by href
    when click <a href> all targetd element set the following attributes
    Mozilla for more detail : https://developer.mozilla.org/en-US/docs/Web/CSS/:target
  */
//  Not work in shadow dom
  // .overlay:target {
  //   visibility: visible;
  //   opacity: 1;
  // }
`