import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
let historyArray = [];
const initialState = {
  places: [],
  isLoading: false,
  error: null,
};

export const fetchContent = createAsyncThunk("content/fetchContent", () => {
  const data = JSON.parse(localStorage.getItem("placesHistory"));
  return data;
});

const placesSlice = createSlice({
  name: "places",
  initialState,

  reducers: {
    addToPlaces: (state, action) => {
      historyArray.push({ place: action.payload.place });
      localStorage.setItem("placesHistory", JSON.stringify(historyArray));
      state?.places?.push({
        place: action?.payload?.place,
      });
    },

    removeItem: (state, action) => {
      const removeItem = state?.places?.filter(
        (item) => item.place !== action.payload
      );
      state.places = removeItem;
    },
    clearHistory: (state, action) => {
      state.places = [];
      historyArray = [];
      localStorage.setItem("placesHistory", []);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false;
      /*  state.places = action.payload; */
    });
  },
});

export const placeReducer = placesSlice.reducer;
export const { addToPlaces, removeItem, clearHistory } = placesSlice.actions;
