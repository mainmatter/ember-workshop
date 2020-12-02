import Route from '@ember/routing/route';

export default class IndexRoute extends Route {
  model() {
    return [
      {
        id: '1',
        title: 'The Bodyguard',
        coverUrl:
          'https://i.scdn.co/image/7bcb439989b592287aeac1599aaa36be17672b73',
        songs: [
          {
            id: '1',
            title: 'I Will Always Love You',
            duration: 30000,
          },
          {
            id: '2',
            title: 'I Have Nothing',
            duration: 30000,
          },
          {
            id: '3',
            title: "I'm Every Woman",
            duration: 30000,
          },
          {
            id: '4',
            title: 'Run to You',
            duration: 30000,
          },
          {
            id: '5',
            title: 'Queen of the Night - Radio Edit',
            duration: 30000,
          },
          {
            id: '6',
            title: 'Jesus Loves Me',
            duration: 30000,
          },
          {
            id: '7',
            title: 'Even If My Heart Would Break',
            duration: 30000,
          },
          {
            id: '8',
            title: "Someday (I'm Coming Back)",
            duration: 30000,
          },
          {
            id: '9',
            title: "It's Gonna Be A Lovely Day",
            duration: 30000,
          },
          {
            id: '10',
            title: "What's So Funny 'Bout Peace, Love And Understanding",
            duration: 30000,
          },
          {
            id: '11',
            title: 'Theme From The Bodyguard',
            duration: 30000,
          },
        ],
      },
      {
        id: '2',
        title: 'Whitney Houston',
        coverUrl:
          'https://i.scdn.co/image/3c61cf6b053cea492f3962b0b005b4e170afa37a',
        songs: [
          {
            id: '12',
            title: 'You Give Good Love',
            duration: 30000,
          },
          {
            id: '13',
            title: 'Thinking About You',
            duration: 30000,
          },
          {
            id: '14',
            title: 'Someone For Me',
            duration: 30000,
          },
          {
            id: '15',
            title: 'Saving All My Love for You',
            duration: 30000,
          },
          {
            id: '16',
            title: 'Nobody Loves Me Like You Do',
            duration: 30000,
          },
          {
            id: '17',
            title: 'How Will I Know',
            duration: 30000,
          },
          {
            id: '18',
            title: 'All at Once',
            duration: 30000,
          },
          {
            id: '18',
            title: 'Take Good Care of My Heart',
            duration: 30000,
          },
          {
            id: '19',
            title: 'Greatest Love of All',
            duration: 30000,
          },
        ],
      },
    ];
  }
}
