//for task:
//wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin,dogecoin

const Socket = new WebSocket(
  "wss://ws.coincap.io/prices?assets=ALL"
);

Socket.onopen = () => {
  console.log("Connected");
};

export default Socket;
