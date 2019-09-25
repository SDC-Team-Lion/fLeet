module.exports = {
  reviewsMain: (data) => {
    let tracker = {};
    let result = {};
    for (let i = 0; i < data.length; i++) {
      if (!tracker[data[i].id]) {
        tracker[data[i].id] = true;
      }
    }

    return result;
  }
}