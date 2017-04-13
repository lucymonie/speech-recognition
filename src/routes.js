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

// const submit = {
//   method: POST,
//   path: '/submit',
//   handler (req, reply) {
    // process form and get submitted text
    // send off text to NLP API
    // get back emotional meaning and reply with that
//   }
// }

module.exports = [home,
                  resources];
