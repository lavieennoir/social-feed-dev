export default class FeedRepository {
  getList(success, failure) {
    let promise = new Promise((resolve, reject) => {
      //Stub
      setTimeout(() => {
        const res = [
          {
            id: 1,
            network: "LinkedIn",
            post:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
            link:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation",
            preview:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation"
          },
          {
            id: 2,
            network: "Twitter",
            post:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
            link:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation",
            preview:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation"
          },
          {
            id: 3,
            network: "Facebook",
            post:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
            link:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation",
            preview:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation"
          },
          {
            id: 4,
            network: "LinkedIn",
            post:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
            link:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation",
            preview:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation"
          },
          {
            id: 5,
            network: "Twitter",
            post:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
            link:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation",
            preview:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation"
          },
          {
            id: 6,
            network: "Facebook",
            post:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
            link:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation",
            preview:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation"
          },
          {
            id: 7,
            network: "LinkedIn",
            post:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
            link:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation",
            preview:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation"
          },
          {
            id: 8,
            network: "Twitter",
            post:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
            link:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation",
            preview:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation"
          },
          {
            id: 9,
            network: "Facebook",
            post:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
            link:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation",
            preview:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation"
          },
          {
            id: 10,
            network: "LinkedIn",
            post:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
            link:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation",
            preview:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation"
          },
          {
            id: 11,
            network: "Twitter",
            post:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
            link:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation",
            preview:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation"
          },
          {
            id: 12,
            network: "Facebook",
            post:
              "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
            link:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation",
            preview:
              "https://www.armatic.com/blog/why-you-should-invest-in-ar-automation"
          }
        ];
        resolve({ items: res });
      }, 700);
    });
    promise.then(result => success(result), error => failure(error));
  }
}
