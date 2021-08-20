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
            title: '關於我',
            group: GROUP_TYPE.NONE,
            subTitle: '',
            description: '',
            path: '/',
            imageSrc: '',
            visible: true,
          },
          {
            title: 'Sdorica Tools',
            group: GROUP_TYPE.NONE,
            subTitle: '',
            description: '',
            path: '/external_projects/sdorica_tools/index.html',
            imageSrc: '',
            visible: true,
          },
          {
            title: 'Realtime Weather App',
            group: GROUP_TYPE.NONE,
            subTitle: '',
            description: '',
            path: '/external_projects/learn-react-from-hook-realtime-weather-app/',
            imageSrc: '',
            visible: true,
          },
          {
            title: 'Flutter Learn Repositories',
            group: GROUP_TYPE.NONE,
            subTitle: '',
            description: '',
            path: '/other_apps/my_flutter_notes/',
            imageSrc: '',
            visible: true,
          },
          {
            title: 'Github Repositories',
            group: GROUP_TYPE.NONE,
            subTitle: '',
            description: '',
            path: '/other_apps/my_github_repositories',
            imageSrc: '',
            visible: true,
          },
          {
            title: '測試區域',
            group: GROUP_TYPE.NONE,
            subTitle: '',
            description: '',
            path: '/other_apps/test_areas/',
            imageSrc: '',
            visible: true,
          },
          {
            title: 'Website Roadmap',
            group: GROUP_TYPE.NONE,
            subTitle: '',
            description: '',
            path: '/other_apps/website_roadmap',
            imageSrc: '',
            visible: false,
          },
          // EMPTY
          {
            title: '',
            group: GROUP_TYPE.NONE,
            subTitle: '',
            description: '',
            path: '/',
            imageSrc: '',
          },
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