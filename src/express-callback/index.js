'use strict';

module.exports = controller => (req, res) => {
  const request = {
    body: req.body,
    query: req.query,
    params: req.params,
    method: req.method,
  };
  controller(request)
    .then(({ headers, statusCode, body }) => {
      headers ? res.set(headers) : null;
      res.type('json');
      res.status(statusCode).send(body);
    })
    .catch(error => res.status(500).send({ error }));
};
