import Route from '@ember/routing/route';

export default Route.extend({
  model() { this.get('store').findAll('tweet') }
});
    // this.get('store').push({
    //   data: [ {
    //     "id": 660355031674155008,
    //     type: 'tweet',
    //     attributes: {
    //       "created_at": "Sat Oct 31 07:18:03 +0000 2015",
    //       "id_str": "660355031674155008",
    //       "text": "RT @dave_gosh: The Only Place Hillary should be going is PRISON!!! #HillaryClinton #HillaryForPrison2016 #HillNo #prison #POTUS #tcot",
    //       "source": "<a href=\"http://twitter.com/#!/download/ipad\" rel=\"nofollow\">Twitter for iPad</a>",
    //       "truncated": false,
    //       "in_reply_to_status_id": null,
    //       "in_reply_to_status_id_str": null,
    //       "in_reply_to_user_id": null,
    //       "in_reply_to_user_id_str": null,
    //       "in_reply_to_screen_name": null,
    //       "user": {
    //         "id": 583122991,
    //         "id_str": "583122991",
    //         "name": "Drew Hanson",
    //         "screen_name": "johnnyreb1864",
    //         "location": null,
    //         "url": null,
    //         "description": "#CCOT #Born and Raised In America #ProIsrael\n#Photo: Bella",
    //         "protected": false,
    //         "verified": false,
    //         "followers_count": 6808,
    //         "friends_count": 6496,
    //         "listed_count": 225,
    //         "favourites_count": 6659,
    //         "statuses_count": 332233,
    //         "created_at": "Thu May 17 20:40:30 +0000 2012",
    //         "utc_offset": null,
    //         "time_zone": null,
    //         "geo_enabled": false,
    //         "lang": "en",
    //         "contributors_enabled": false,
    //         "is_translator": false,
    //         "profile_background_color": "C0DEED",
    //         "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
    //         "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
    //         "profile_background_tile": false,
    //         "profile_link_color": "0084B4",
    //         "profile_sidebar_border_color": "C0DEED",
    //         "profile_sidebar_fill_color": "DDEEF6",
    //         "profile_text_color": "333333",
    //         "profile_use_background_image": true,
    //         "profile_image_url": "http://pbs.twimg.com/profile_images/546957309235064832/5n2jDsLC_normal.jpeg",
    //         "profile_image_url_https": "https://pbs.twimg.com/profile_images/546957309235064832/5n2jDsLC_normal.jpeg",
    //         "profile_banner_url": "https://pbs.twimg.com/profile_banners/583122991/1445331435",
    //         "default_profile": true,
    //         "default_profile_image": false,
    //         "following": null,
    //         "follow_request_sent": null,
    //         "notifications": null
    //       },
    //       "geo": null,
    //       "coordinates": null,
    //       "place": null,
    //       "contributors": null,
    //       "retweeted_status": {
    //         "created_at": "Tue Oct 27 16:24:19 +0000 2015",
    //         "id": 659042955336904704,
    //         "id_str": "659042955336904704",
    //         "text": "The Only Place Hillary should be going is PRISON!!! #HillaryClinton #HillaryForPrison2016 #HillNo #prison #POTUS #tcot",
    //         "source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
    //         "truncated": false,
    //         "in_reply_to_status_id": null,
    //         "in_reply_to_status_id_str": null,
    //         "in_reply_to_user_id": null,
    //         "in_reply_to_user_id_str": null,
    //         "in_reply_to_screen_name": null,
    //         "user": {
    //           "id": 582109728,
    //           "id_str": "582109728",
    //           "name": "Dave Gosh",
    //           "screen_name": "dave_gosh",
    //           "location": null,
    //           "url": null,
    //           "description": "Im a Conservative limited Govt, Pro life, Liberty, Freedom, and Guns",
    //           "protected": false,
    //           "verified": false,
    //           "followers_count": 10412,
    //           "friends_count": 8442,
    //           "listed_count": 132,
    //           "favourites_count": 6053,
    //           "statuses_count": 3023,
    //           "created_at": "Wed May 16 17:47:46 +0000 2012",
    //           "utc_offset": null,
    //           "time_zone": null,
    //           "geo_enabled": true,
    //           "lang": "en",
    //           "contributors_enabled": false,
    //           "is_translator": false,
    //           "profile_background_color": "C0DEED",
    //           "profile_background_image_url": "http://abs.twimg.com/images/themes/theme1/bg.png",
    //           "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme1/bg.png",
    //           "profile_background_tile": false,
    //           "profile_link_color": "0084B4",
    //           "profile_sidebar_border_color": "C0DEED",
    //           "profile_sidebar_fill_color": "DDEEF6",
    //           "profile_text_color": "333333",
    //           "profile_use_background_image": true,
    //           "profile_image_url": "http://pbs.twimg.com/profile_images/515367799066083328/HYrjlNPY_normal.jpeg",
    //           "profile_image_url_https": "https://pbs.twimg.com/profile_images/515367799066083328/HYrjlNPY_normal.jpeg",
    //           "profile_banner_url": "https://pbs.twimg.com/profile_banners/582109728/1404796028",
    //           "default_profile": true,
    //           "default_profile_image": false,
    //           "following": null,
    //           "follow_request_sent": null,
    //           "notifications": null
    //         },
    //         "geo": null,
    //         "coordinates": null,
    //         "place": null,
    //         "contributors": null,
    //         "is_quote_status": false,
    //         "retweet_count": 40,
    //         "favorite_count": 35,
    //         "entities": {
    //           "hashtags": [
    //             {
    //               "text": "HillaryClinton",
    //               "indices": [
    //                 52,
    //                 67
    //               ]
    //             },
    //             {
    //               "text": "HillaryForPrison2016",
    //               "indices": [
    //                 68,
    //                 89
    //               ]
    //             },
    //             {
    //               "text": "HillNo",
    //               "indices": [
    //                 90,
    //                 97
    //               ]
    //             },
    //             {
    //               "text": "prison",
    //               "indices": [
    //                 98,
    //                 105
    //               ]
    //             },
    //             {
    //               "text": "POTUS",
    //               "indices": [
    //                 106,
    //                 112
    //               ]
    //             },
    //             {
    //               "text": "tcot",
    //               "indices": [
    //                 113,
    //                 118
    //               ]
    //             }
    //           ],
    //           "urls": [
    //
    //           ],
    //           "user_mentions": [
    //
    //           ],
    //           "symbols": [
    //
    //           ]
    //         },
    //         "favorited": false,
    //         "retweeted": false,
    //         "filter_level": "low",
    //         "lang": "en"
    //       },
    //       "is_quote_status": false,
    //       "retweet_count": 0,
    //       "favorite_count": 0,
    //       "entities": {
    //         "hashtags": [
    //           {
    //             "text": "HillaryClinton",
    //             "indices": [
    //               67,
    //               82
    //             ]
    //           },
    //           {
    //             "text": "HillaryForPrison2016",
    //             "indices": [
    //               83,
    //               104
    //             ]
    //           },
    //           {
    //             "text": "HillNo",
    //             "indices": [
    //               105,
    //               112
    //             ]
    //           },
    //           {
    //             "text": "prison",
    //             "indices": [
    //               113,
    //               120
    //             ]
    //           },
    //           {
    //             "text": "POTUS",
    //             "indices": [
    //               121,
    //               127
    //             ]
    //           },
    //           {
    //             "text": "tcot",
    //             "indices": [
    //               128,
    //               133
    //             ]
    //           }
    //         ],
    //         "urls": [
    //
    //         ],
    //         "user_mentions": [
    //           {
    //             "screen_name": "dave_gosh",
    //             "name": "Dave Gosh",
    //             "id": 582109728,
    //             "id_str": "582109728",
    //             "indices": [
    //               3,
    //               13
    //             ]
    //           }
    //         ],
    //         "symbols": [
    //
    //         ]
    //       },
    //       "favorited": false,
    //       "retweeted": false,
    //       "filter_level": "low",
    //       "lang": "en",
    //       "timestamp_ms": "1446275883011",
    //       "url": "https://twitter.com/johnnyreb1864/status/660355031674155008"
    //     }
    //   }]
    // })
