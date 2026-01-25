import { Link, ListItem } from '@mui/material';
import MyList from 'src/components/List';
import { FullSwingContentSmash, FullSwingContentSmash123 } from './details';
import { channels } from './channels.js';

export const allTodoItems = [
  {
    name: 'チャイナステップ',
    tags: ['step-training'],
    items: [
      {
        channelId: '',
        rate: 5,
        isDone: false,
        link: 'https://badminton.item-land.net/training-load/china-step/',
        linkText: 'バドミントンのチャイナステップについて'
      },
      {
        channelId: '',
        isDone: false,
        link: 'https://www.youtube.com/watch?v=pQ7nichtudU',
        linkText: '【福山市】#55【トレーニング】おうちで簡単 バドミントン 4分間チャイナステップ',
        date: '2020/10/16',
        content: `- 流程: 基本步（休息）10 秒 → 步伐 20 秒，共 30 秒，有 8 種步伐，共計 4 分鐘`
      }
    ]
  },
  {
    channelId: 'full-swing',
    tags: ['stroke-smash'],
    isDone: false,
    link: 'https://www.youtube.com/watch?v=KMuOohdLB4U',
    linkText: '羽毛球 |粉碎 |跟我來，一二三..',
    title: '',
    date: '2022/11/12',
    content: () => {
      return <FullSwingContentSmash123 />
    },
  },
  {
    channelId: 'full-swing',
    tags: ['stroke-smash'],
    isDone: true,
    link: 'https://www.youtube.com/watch?v=DWsHRZFTqtk',
    linkText: '怎麼破？ - 關於羽毛球扣殺',
    title: '',
    rate: 5,
    date: '2022/07/06',
    content: () => {
      return <FullSwingContentSmash />;
    }
  },
  {
    label: '',
    tags: ['equipment-socks'],
    isDone: false,
    link: '',
    linkText: '',
    title: '襪子',
    titleBuilder: () => {
      return <p>
        有人推薦：yonex 19122 ($360 up) 厚襪或 1855
        ([ptt]: https://www.ptt.cc/bbs/Badminton/M.1688988968.A.C6A.html)
      </p>;
    },
    date: ''
  },
  {
    channelId: 'ag-yeoh',
    tags: ['step-advanced'],
    isDone: false,
    link: 'https://www.youtube.com/watch?v=Oo9sPVXJguo',
    linkText: '李矛步',
    title: '',
    date: '2019/09/20'
    // 這好像是修復版? https://www.youtube.com/watch?v=OQSdMD-Q3iY
  },
];
