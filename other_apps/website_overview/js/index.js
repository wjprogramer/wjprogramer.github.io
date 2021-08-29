const GROUP_TYPE = {
  NONE: 0,
};

window.onload = (event) => {
  let app = Vue.createApp({
    name: 'app',
    data() {
      return {
        webLinks: [
          {
            title: 'Portfolio',
            group: GROUP_TYPE.NONE,
            subTitle: '',
            description: '關於我、經歷、技能',
            path: '/',
            imageSrc: '/favicons/android-chrome-512x512.png',
            visible: true,
          },
          {
            title: 'Sdorica Tools',
            group: GROUP_TYPE.NONE,
            subTitle: '',
            description: '遊戲工具',
            path: '/external_projects/sdorica_tools/index.html',
            imageSrc: '/external_projects/sdorica_tools/favicons/android-chrome-512x512.png',
            visible: true,
          },
          {
            title: 'Realtime Weather App',
            group: GROUP_TYPE.NONE,
            subTitle: '',
            description: '學習 React Hook 的小小作品',
            path: '/external_projects/learn-react-from-hook-realtime-weather-app/',
            imageSrc: '/external_projects/learn-react-from-hook-realtime-weather-app/icon@512.png',
            visible: true,
          },
          {
            title: 'Flutter Learn Repositories',
            group: GROUP_TYPE.NONE,
            subTitle: '',
            description: '整合 Flutter 學習專案',
            path: '/other_apps/my_flutter_notes/',
            imageSrc: 'https://raw.githubusercontent.com/wjprogramer/public_resources/master/flutter_app_icons/output/widgets3.png',
            visible: true,
          },
          {
            title: 'Github Repositories',
            group: GROUP_TYPE.NONE,
            subTitle: '',
            description: '整合 Github 專案',
            path: '/other_apps/my_github_repositories',
            imageSrc: 'https://raw.githubusercontent.com/wjprogramer/public_resources/master/flutter_app_icons/output/widgets3.png',
            visible: true,
          },
          {
            title: 'Test Area',
            group: GROUP_TYPE.NONE,
            subTitle: '',
            description: '測試區域',
            path: '/other_apps/test_areas/',
            imageSrc: 'https://raw.githubusercontent.com/wjprogramer/public_resources/master/flutter_app_icons/output/widgets3.png',
            visible: true,
          },
          // TODO: 
          {
            title: 'Website Roadmap',
            group: GROUP_TYPE.NONE,
            subTitle: '',
            description: '',
            path: '/other_apps/website_roadmap',
            imageSrc: '',
            visible: false,
          },
          // --- EMPTY ---
          // {
          //   title: '',
          //   group: GROUP_TYPE.NONE,
          //   subTitle: '',
          //   description: '',
          //   path: '/',
          //   imageSrc: '',
          // },
        ],
      }
    },
    created: () => {
    },
    components: {
      
    },
  });

  app.mount('#app');
};

render = () => {
  window.requestAnimationFrame(render);
}

window.requestAnimationFrame(render);