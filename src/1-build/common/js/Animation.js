import { Styles, Markup, Align, Effects } from "ad-view";

const INIT_ZOOM_START = 1;
const INIT_ZOOM_SCALE = 1.5;
const KEYART_HOLD_START = INIT_ZOOM_START + 0.5;

export class Animation {
  static start() {
    console.log("Animation.start()");
    // show the main container
    global.removePreloader();
    Styles.setCss(View.main, { opacity: 1 });

    if (adData.useSupercut) {
      View.endFrame.show();
      // have Netflix logo already fully in
      View.endFrame.netflixLogo.progress(1);

      TweenLite.to(View.endFrame, 1, {
        scale: INIT_ZOOM_SCALE,
        delay: INIT_ZOOM_START
      });

      TweenLite.delayedCall(KEYART_HOLD_START, () => {
        View.ribbon.play();
      });
    } else {
      Animation.playIntro();
    }
  }

  // IMPORTANT!!! Call this function when your animation is complete!
  static complete() {
    console.log("Animation.complete()");
  }

  static playIntro() {
    if (View.intro) {
      Styles.setCss(View.intro.netflixLogo, { opacity: 1 });
      View.intro.introVideoPlayer.play();

      TweenLite.delayedCall(2.5, function() {
        View.intro.netflixLogo.reverse();
      });
      TweenLite.delayedCall(6, function() {
        View.intro.netflixLogo.play();
      });
      TweenLite.to(View.intro.netflixLogo, 0.25, { delay: 8, alpha: 0 });
    } else {
      Animation.showEndFrame();
    }
  }

  static showEndFrame() {
    console.log("Animation.showEndFrame()");

    if (adData.useSupercut) {
      // reset endframe after ribbon and supercut
      View.endFrame.netflixLogo.progress(0);
      TweenLite.set(View.endFrame, { scale: 1 });
    }

    if (View.intro) View.intro.hide();
    View.endFrame.show();

    const creative = new Creative();
    creative.play();
  }
}
