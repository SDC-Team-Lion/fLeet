const { getCount } = require('./Reviews.js');

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
  },
  newReview: (revObj, prod_id) => {

    let rev_id = null;
    let charQuery = '';
    let photoQuery = `
      INSERT INTO photos (id,review_id,url_str)
      VALUES (DEFAULT,`;
    // for (let i = 0; i < revObj.photos.length; i++) {
    //   photoQuery +=
    // }

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    today = `${mm}/${dd}/${yyyy}`;

    let query = `
    INSERT INTO reviews
    (id,product_id,rating,rev_date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness)
    VALUES (DEFAULT,${prod_id},${revObj.rating},${today},${revObj.summary},${revObj.body},${revObj.recommended},false,${revObj.name},${revObj.email},null,0);
    ${charQuery}
    ${photoQuery}`;

    

    return query;
  }
    // let submission = {
  //   rating: rating,
  //   summary: this.state.summaryEntry,
  //   body: this.state.bodyEntry,
  //   recommended: (this.state.rec === "yes") ? "true" : "false",
  //   name: this.state.nameEntry,
  //   email: this.state.emailEntry,
  //   photos: this.state.photos, array of URL strings
  //   characteristics: this.state.characteristics
}
