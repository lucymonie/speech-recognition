const request = require('request');
const env = require('env2')('./config.env');

const home = {
  method: 'GET',
  path: '/',
  handler (req, reply) {
    reply.view('index');
  }
};

const resources = {
  method:'GET',
  path:'/public/{file*}',
  handler: {
    directory: {
      path: 'public'
    }
  }
};

const music = {
  method: 'GET',
  path: '/player',
  handler (req, reply) {
    let title = req.query.songId;
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${title}&key=${process.env.YOUTUBE_KEY}`;
    request(url, (err, response, body) => {
      if (err || response.statusCode !== 200) {
        console.log("Couldn't retrieve youtube results, because: ", err);
        reply.view('index');
      } else {
        let result = JSON.parse(body);
        let song = result.items[0].id.videoId;
        let songLink = `http://www.youtube.com/embed/${song}?enablejsapi=1&autoplay=1`
        reply.view('player', { songLink: songLink });
      }
    });

  }
}

module.exports = [home,
                  resources,
                  music
                 ];
