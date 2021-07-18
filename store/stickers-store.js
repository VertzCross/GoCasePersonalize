const getDefaultState = () => {
  return {
    caseBackground: null,
    backgroundColor: "#d2d2d2",
    stickers: []
  };
};

const state = getDefaultState();

const mutations = {
  addBackgroundColor(state, color) {
    state.backgroundColor = color;
  },
  addBackground(state, path) {
    state.caseBackground = path;
  },
  removeBackground(state) {
    state.caseBackground = null;
  },
  addSticker(state, path) {
    state.stickers.push({
      path,
      x: 200,
      y: 500,
      w: 100,
      h: 100,
      angle: 0
    });
  },

  addMessage(state) {
    state.stickers.push({
      message: "",
      style: {
        color: "#000000",
        fontSize: "12px",
        fontFamily: "Roboto",
        textDecoration: "",
        fontStyle: ""
      },
      x: 200,
      y: 500,
      w: 100,
      h: 100,
      angle: 0
    });
  },
  updateStickers(state, { value, index }) {
    const newList = [...state.stickers];
    const updatedItem = { ...newList[index], ...value };
    newList[index] = updatedItem;
    state.stickers = [...newList];
  },
  removeSticker(state, index) {
    state.stickers.splice(index, 1);
  }
};

const actions = {
  addImage: async ({ commit }, { image, isBackground = false }) => {
    const result = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

    const path = result.toString();

    if (!isBackground) commit("addSticker", path);
    else commit("addBackground", path);
  }
};

const getters = {
  getBackgroundInfo: state => ({
    color: state.backgroundColor,
    image: state.caseBackground
  }),
  getStickers: state => state.stickers,
  getMessages: state => {
    const messageSequence = state.stickers.map((file, index) => {
      if (file.style) return { ...file, sequence: index };
      return file;
    });

    return messageSequence.filter(item => item.style);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
