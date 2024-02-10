import consumer from "channels/consumer";

consumer.subscriptions.create("TextChannel", {

  submitBtn: document.getElementById('submit'),

  connected() {
    this.addToHolder();
  },

  addToHolder() {
    this.clicker = document.getElementById('text-field');

    this.clicker.addEventListener('keyup', () => {
    });

    this.submitBtn.addEventListener('click', () => {
      this.sendMsg();
    });
  },

  sendMsg() {
    this.text = this.clicker.value;

    this.perform('broadcast', {
      value: this.text
    });
    console.log("Sending message:", this.text);

    this.clicker.value = '';
  },


  disconnected() { },

  received(data) {

    if (!data.value.trim()) {
      return;
    }

    const holder = document.getElementById('holder');

    const messageDiv = document.createElement('div');

    // for adding the timestamp
    const now = Date.now();

    const date = new Date(now);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const timeString = `${hours}:${minutes}`;

    const timestampDiv = document.createElement('div');
    timestampDiv.className = 'timestamp';
    timestampDiv.innerText = timeString;

    messageDiv.appendChild(timestampDiv);

    const msgDiv = document.createElement('div');
    msgDiv.innerText = data.value;

    messageDiv.appendChild(msgDiv);

    holder.appendChild(messageDiv);

  }
});