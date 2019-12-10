export default {
  setState({ request }, { attribute, value }) {
    request[attribute] = value;
  },

  addHeaders({ request }, value) {
    request.headers.push(value);
  },

  removeHeaders({ request }, index) {
    request.headers.splice(index, 1);
  },

  setKeyHeader({ request }, { index, value }) {
    request.headers[index].key = value;
  },

  setValueHeader({ request }, { index, value }) {
    request.headers[index].value = value;
  },

  addParams({ request }, value) {
    request.params.push(value);
  },

  removeParams({ request }, index) {
    request.params.splice(index, 1);
  },

  setKeyParams({ request }, { index, value }) {
    request.params[index].key = value;
  },

  setValueParams({ request }, { index, value }) {
    request.params[index].value = value;
  },

  addBodyParams({ request }, value) {
    request.bodyParams.push(value);
  },

  removeBodyParams({ request }, index) {
    request.bodyParams.splice(index, 1);
  },

  setKeyBodyParams({ request }, { index, value }) {
    request.bodyParams[index].key = value;
  },

  setValueBodyParams({ request }, { index, value }) {
    request.bodyParams[index].value = value;
  }
};
