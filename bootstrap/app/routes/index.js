import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [{
      title: 'The Bodyguard',
      'cover-url': 'https://i.scdn.co/image/7bcb439989b592287aeac1599aaa36be17672b73',
      songs: [
        { title: 'I Will Always Love You' },
        { title: 'I Have Nothing' },
        { title: "I'm Every Woman" },
        { title: 'Run to You' },
        { title: 'Queen of the Night - Radio Edit' },
        { title: 'Jesus Loves Me' },
        { title: 'Even If My Heart Would Break' },
        { title: "Someday (I'm Coming Back)" },
        { title: "It's Gonna Be A Lovely Day" },
        { title: "What's So Funny 'Bout Peace, Love And Understanding" },
        { title: 'Theme From The Bodyguard' }
      ]
    },
    {
      title: 'Whitney Houston',
      'cover-url': 'https://i.scdn.co/image/7bcb439989b592287aeac1599aaa36be17672b73',
      songs: [
        { title: 'You Give Good Love' },
        { title: 'Thinking About You' },
        { title: 'Someone For Me' },
        { title: 'Saving All My Love for You' },
        { title: 'Nobody Loves Me Like You Do' },
        { title: 'How Will I Know' },
        { title: 'All at Once' },
        { title: 'Take Good Care of My Heart' },
        { title: 'Greatest Love of All' }
      ]
    }];
  }
});
