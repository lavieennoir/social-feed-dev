export default class LeaderboardRepository {
  getList(success, failure) {
    let promise = new Promise((resolve, reject) => {
      //Stub
      setTimeout(() => {
        const data = {
          name: "Jane Rose Doe",
          departament: "SDR",
          location: "Kiev",
          post: 5,
          points: 140
        };
        let res = [];
        for (let i = 0; i < 12; i++) {
          res.push({ id: i, ...data });
        }
        console.log(res);
        resolve({ items: res });
      }, 700);
    });
    promise.then(result => success(result), error => failure(error));
  }
}
