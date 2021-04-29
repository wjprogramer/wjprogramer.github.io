const {
  renderScrollPercentBars
} = window.modules.scrollPercentBars;

window.onload = (event) => {
  let app = Vue.createApp({
    name: "app",
    data() {
      return {
        rawHtml: '<span style="color: red">This should be red.</span>',
        experiencesList,
        universityLifeList,
      }
    },
    created: () => {
      var pageLoaderElem = document.getElementById('page-loader');
      pageLoaderElem.style.opacity = 0;

      setTimeout(() => {
        var appElem = document.getElementById('app');
        appElem.style.opacity = 1;
      }, 300);

      setTimeout(() => {
        pageLoaderElem.style.display = 'none';
      }, 2000);
    },
    components: {
      // 'sample': {
      //   template: `<div style="color: {{color}}">{{text}}</div>`,
      //   data(){
      //     return {
      //      text:'我是局部註冊',
      //      color: "red"
      //     }
      //   }
      // },
      'label-angular': {
        template: `<div style="display: inline-block;">
          <div class="tech-label tech-label-angular">
            <div class="tech-label-head">
              <img src="images/angular.png" alt="">
            </div>
            <div class="tech-label-name">
              AngularJS
            </div>
          </div>
        </div>`,
      },
      'label-flask': {
        template: `<div style="display: inline-block;">
          <div class="tech-label tech-label-flask">
            <div class="tech-label-head">
              <img src="images/flask.png" alt="">
            </div>
            <div class="tech-label-name">
              Flask
            </div>
          </div>
        </div>`,
      },
      'label-flutter': {
        template: `<div style="display: inline-block;">
          <div class="tech-label tech-label-flutter">
            <div class="tech-label-head">
              <img src="images/flutter.png" alt="">
            </div>
            <div class="tech-label-name">
              Flutter
            </div>
          </div>
        </div>`,
      },
      'label-react-js': {
        template: `<div style="display: inline-block;">
          <div class="tech-label">
            <div class="tech-label-head">
              <img src="images/react.png" alt="">
            </div>
            <div class="tech-label-name">
              React JS
            </div>
          </div>
        </div>`,
      },
      'label-react-native': {
        template: `<div style="display: inline-block;">
          <div class="tech-label">
            <div class="tech-label-head">
              <img src="images/react.png" alt="">
            </div>
            <div class="tech-label-name">
              React Native
            </div>
          </div>
        </div>`,
      },
      'label-spring': {
        template: `<div style="display: inline-block;">
          <div class="tech-label tech-label-spring">
            <div class="tech-label-head">
              <img src="images/spring.png" alt="">
            </div>
            <div class="tech-label-name">
              Spring
            </div>
          </div>
        </div>`,
      },
      'label-asp-net-mvc': {
        template: `<div style="display: inline-block;">
          <div class="tech-label tech-label-asp-net">
            <div class="tech-label-head">
              <img src="images/asp_net.png" alt="">
            </div>
            <div class="tech-label-name">
              ASP .NET MVC
            </div>
          </div>
        </div>`,
      },
    },
  });

  app.mount('#app');
};

render = (timestamp) => {
  renderScrollPercentBars();
  
  window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);