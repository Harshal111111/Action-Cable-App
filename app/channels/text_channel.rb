class TextChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "text_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def broadcast(data)
    ActionCable.server.broadcast "text_channel", data
  end
end
