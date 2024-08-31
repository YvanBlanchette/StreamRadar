import { createSlice } from "@reduxjs/toolkit";

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState: {
    subscribers: [
      {
        name: "Camille Tremblay",
        email: "camille.tremblay@fakemail.com",
      },
      {
        name: "Sébastien Lavoie",
        email: "sebastien.lavoie@fakemail.com",
      },
      {
        name: "Marie Dupont",
        email: "marie.dupont@fakemail.com",
      },
      {
        name: "Jean-Luc Picard",
        email: "jeanluc.picard@fakemail.com",
      },
      {
        name: "Sophie Lefebvre",
        email: "sophie.lefebvre@fakemail.com",
      },
      {
        name: "Antoine Gagné",
        email: "antoine.gagne@fakemail.com",
      },
      {
        name: "Isabelle Moreau",
        email: "isabelle.moreau@fakemail.com",
      },
      {
        name: "Philippe Roy",
        email: "philippe.roy@fakemail.com",
      },
      {
        name: "Laurence Pelletier",
        email: "laurence.pelletier@fakemail.com",
      },
      {
        name: "Nicolas Bouchard",
        email: "nicolas.bouchard@fakemail.com",
      },
      {
        name: "Élise Tremblay",
        email: "elise.tremblay@fakemail.com",
      },
      {
        name: "Vincent Martel",
        email: "vincent.martel@fakemail.com",
      },
      {
        name: "Julie Girard",
        email: "julie.girard@fakemail.com",
      },
      {
        name: "Olivier Bergeron",
        email: "olivier.bergeron@fakemail.com",
      },
      {
        name: "Emmanuelle Denis",
        email: "emmanuelle.denis@fakemail.com",
      },
      {
        name: "Lucas Caron",
        email: "lucas.caron@fakemail.com",
      },
      {
        name: "Clara Fortin",
        email: "clara.fortin@fakemail.com",
      },
      {
        name: "Maxime Leblanc",
        email: "maxime.leblanc@fakemail.com",
      },
      {
        name: "Éric Côté",
        email: "eric.cote@fakemail.com",
      },
      {
        name: "Florence Richard",
        email: "florence.richard@fakemail.com",
      },

    ],
  },
  reducers: {
    addSubscriber: (state, action) => {
      state.subscribers.push(action.payload);
    },
    updateSubscriber: (state, action) => {
      const { email, updatedInfo } = action.payload;
      const subscriber = state.subscribers.find(
        (subscriber) => subscriber.email === email
      );
      if (subscriber) {
        subscriber.name = updatedInfo.name;
        subscriber.email = updatedInfo.email;
      }
    },
    deleteSubscriber: (state, action) => {
      state.subscribers.splice(action.payload, 1);
    },
  }
});

export const { addSubscriber, updateSubscriber, deleteSubscriber } = newsletterSlice.actions;
export default newsletterSlice.reducer