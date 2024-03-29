const { Schema, Types, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (date) => {
      if (date) return date.toISOString().split("T")[0];
    },
  },
});

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        if (date) return date.toISOString().split("T")[0];
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);
//  virtual property retrieves the length of the thought's reaction array
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
