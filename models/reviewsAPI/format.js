module.exports = {
  reviewsMain: (data) => {
    let tracker = {};
    let photoObj = {};
    let result = {};
    result['count'] = data.length;
    result['product'] = data[0]["product_id"];
    result['results'] = [];
    for (let i = 0; i < data.length; i++) {
      photoObj = {};
      tracker = {};
      tracker["photos"] = [];
      tracker["review_id"] = data[i]["id"];
      tracker["rating"] = data[i]["rating"];
      tracker["summary"] = data[i]["summary"];
      tracker["recommend"] = data[i]["recommend"] ? 1 : 0;
      tracker["response"] = data[i]["response"] !== 'null' ? data[i]["response"] : "";
      tracker["body"] = data[i]["body"];
      tracker["date"] = data[i]["rev_date"];
      tracker["reviewer_name"] = data[i]["reviewer_name"];
      tracker["helpfulness"] = data[i]["helpfulness"];
      if (data[i]["pid"]) {
        photoObj["id"] = data[i]["pid"];
        photoObj["url"] = data[i]["url_str"];
        tracker["photos"].push(photoObj);
      }
      result["results"].push(tracker);
    }

    return result;
  }
}